import fs from "fs/promises";
import path from "path";
import cron from "node-cron";
import axios from "axios";

const API_URL = process.env.API_URL || "http://localhost:5000/api/";
const BASE_DIRECTORY = process.env.BASE_DIRECTORY_TASKS || "/crm/tasks";
const API_ROUTE = "crm/tasks";
const AUTH_ROUTE = "auth/login";

// Credenciais de login
const credentials = {
  email: process.env.API_USERNAME || "admin",
  password: process.env.API_PASSWORD || "password123",
};

interface Task {
  begin: string; // Data no formato datetime ou date
  title: string; // Título da tarefa
}

// Função para obter o token de autenticação
async function getAuthToken(): Promise<string | null> {
  try {
    const response = await axios.post<{ accessToken: string }>(
      `${API_URL}${AUTH_ROUTE}`,
      credentials
    );

    if (response.status === 200 && response.data.accessToken) {
      return response.data.accessToken;
    } else {
      throw new Error("Resposta de login inválida.");
    }
  } catch (error: any) {
    console.error("Erro ao fazer login:", error.message);
    return null;
  }
}

// Função para formatar o nome da pasta
function formatFolderName(task: Task): string {
  const datePart = task.begin.split("T")[0]; // Apenas a data
  return `${datePart.replace(/-/g, ".")}. ${task.title}`;
}

// Função para criar as pastas das tarefas
async function createTaskFolders(taskFolders: string[]): Promise<void> {
  try {
    await fs.mkdir(BASE_DIRECTORY, { recursive: true });

    await Promise.all(
      taskFolders.map(async (folder) => {
        const folderPath = path.join(BASE_DIRECTORY, folder);
        try {
          await fs.mkdir(folderPath, { recursive: true });
          console.log(`Pasta criada: ${folder}`);
        } catch (error: any) {
          if (error.code !== "EEXIST") {
            console.error(`Erro ao criar pasta ${folder}:`, error.message);
          }
        }
      })
    );
  } catch (error: any) {
    console.error("Erro ao criar diretório base:", error.message);
  }
}

// Função para buscar tarefas autenticadas
async function fetchTasks(): Promise<string[]> {
  const token = await getAuthToken();
  if (!token) {
    console.error("Falha na autenticação. Token não recebido.");
    return [];
  }

  try {
    const response = await axios.get<Task[]>(`${API_URL}${API_ROUTE}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200 && Array.isArray(response.data)) {
      return response.data.map(formatFolderName);
    }
    throw new Error("Resposta inválida da API");
  } catch (error: any) {
    console.error("Erro ao buscar tarefas da API:", error.message);
    return [];
  }
}

// Serviço agendado
export function startService(): void {
  cron.schedule("*/15 * * * *", async () => {
    console.log("Iniciando verificação de tarefas...");
    try {
      const taskFolders = await fetchTasks();
      if (taskFolders.length > 0) {
        await createTaskFolders(taskFolders);
        console.log("Pastas criadas com sucesso.");
      } else {
        console.log("Nenhuma nova tarefa encontrada.");
      }
    } catch (error: any) {
      console.error("Erro ao executar o serviço:", error.message);
    }
  });

  console.log("Serviço de criação de pastas agendado.");
}
