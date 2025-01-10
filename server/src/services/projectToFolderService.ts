import fs from "fs";
import path from "path";
import cron from "node-cron";
import axios from "axios";

const API_URL = process.env.API_URL ||"http://localhost:5000/api/";
const BASE_DIRECTORY =process.env.BASE_DIRECTORY || "/base/projects";

async function fetchProjectCodes(): Promise<string[]> {
  try {
    const response = await axios.get<{ code: string; description:string }[]>(
      API_URL + "base/projects"
    );
    if (response.status === 200 && Array.isArray(response.data)) {
      return response.data.map((project) => `${project.code}. ${project.description}`);
    }
    throw new Error("Formato de resposta inválido");
  } catch (error: any) {
    console.error("Erro ao buscar os códigos de projetos:", error.message);
    return [];
  }
}

async function createProjectFolders(projectCodes: string[]): Promise<void> {
  if (!fs.existsSync(BASE_DIRECTORY)) {
    fs.mkdirSync(BASE_DIRECTORY, { recursive: true });
  }

  projectCodes.forEach((code) => {
    const projectPath = path.join(BASE_DIRECTORY, code);
    if (!fs.existsSync(projectPath)) {
      fs.mkdirSync(projectPath, { recursive: true });
      console.log(`Pasta criada para o projeto: ${code}`);
    } else {
      console.log(`Pasta já existe para o projeto: ${code}`);
    }
  });
}

export function startService(): void {
  cron.schedule("*/30 * * * *", async () => {
    console.log("Iniciando tarefa para criar pastas de projetos...");
    try {
      const projectCodes = await fetchProjectCodes();
      if (projectCodes.length > 0) {
        await createProjectFolders(projectCodes);
        console.log("Tarefa concluída.");
      } else {
        console.log("Nenhum código de projeto foi retornado.");
      }
    } catch (error: any) {
      console.error("Erro ao executar a tarefa:", error.message);
    }
  });

  console.log("Serviço de criação de pastas agendado.");
}
