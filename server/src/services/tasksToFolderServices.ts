import fs from "fs";
import path from "path";
import cron from "node-cron";
import axios from "axios";

const API_URL = process.env.API_URL || "http://localhost:5000/api/";
const BASE_DIRECTORY = process.env.BASE_DIRECTORY_TASKS || "/crm/tasks";
const API_ROUTE = "crm/tasks";

// Interface para os dados das tarefas
interface Task {
  begin: string; // Data no formato datetime ou date
  title: string; // Título da tarefa
}

// Função para formatar o nome da pasta
function formatFolderName(task: Task): string {
  // Trata `begin` para garantir que apenas a data seja usada
  const datePart = task.begin.includes("T")
    ? task.begin.split("T")[0]
    : task.begin;
  const formattedDate = datePart.replace(/-/g, ".");
  return `${formattedDate}. ${task.title}`;
}

// Função para criar as pastas para as tarefas
async function createTaskFolders(taskFolders: string[]): Promise<void> {
  if (!fs.existsSync(BASE_DIRECTORY)) {
    fs.mkdirSync(BASE_DIRECTORY, { recursive: true });
  }

  taskFolders.forEach((folder) => {
    const folderPath = path.join(BASE_DIRECTORY, folder);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
      console.log(`Pasta criada: ${folder}`);
    } else {
      console.log(`Pasta já existe: ${folder}`);
    }
  });
}

// Função para buscar as tarefas na API
async function fetchTasks(): Promise<string[]> {
  try {
    const response = await axios.get<Task[]>(API_URL + API_ROUTE);
    if (response.status === 200 && Array.isArray(response.data)) {
      // Formata cada tarefa no formato de pasta
      return response.data.map((task) => formatFolderName(task));
    }
    throw new Error("Resposta inválida da API");
  } catch (error: any) {
    console.error("Erro ao buscar tarefas da API:", error.message);
    return [];
  }
}

// Função para iniciar o serviço
export function startService(): void {
  cron.schedule("*/15 * * * *", async () => {
    console.log("Iniciando tarefa para criar pastas de tarefas...");
    try {
      const taskFolders = await fetchTasks();
      if (taskFolders.length > 0) {
        await createTaskFolders(taskFolders);
        console.log("Tarefa concluída.");
      } else {
        console.log("Nenhuma tarefa foi retornada.");
      }
    } catch (error: any) {
      console.error("Erro ao executar a tarefa:", error.message);
    }
  });

  console.log("Serviço de criação de pastas de tarefas agendado.");
}
