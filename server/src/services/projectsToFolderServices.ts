import fs from "fs/promises";
import path from "path";
import cron from "node-cron";
import axios from "axios";

const API_URL = process.env.API_URL || "http://localhost:5000/api/";
const BASE_DIRECTORY = process.env.BASE_DIRECTORY || "/base/projects";
const AUTH_ROUTE = "auth/login"; // Rota de autenticação (se necessário)
const PROJECTS_ROUTE = "base/projects";

// Credenciais de login (caso a API exija autenticação)
const credentials = {
  username: process.env.API_USERNAME || "admin",
  password: process.env.API_PASSWORD || "password123",
};

interface Project {
  code: string;
  description: string;
}

// **Função para autenticação e obtenção do token**
async function getAuthToken(): Promise<string | null> {
  try {
    const response = await axios.post<{ api_token: string }>(
      `${API_URL}${AUTH_ROUTE}`,
      credentials
    );

    if (response.status === 200 && response.data.api_token) {
      return response.data.api_token;
    } else {
      throw new Error("Resposta de login inválida.");
    }
  } catch (error: any) {
    console.error("Erro ao fazer login:", error.message);
    return null;
  }
}

// **Busca os códigos dos projetos na API**
async function fetchProjectCodes(): Promise<string[]> {
  const token = await getAuthToken();
  if (!token) {
    console.error("Falha na autenticação. Token não recebido.");
    return [];
  }

  try {
    const response = await axios.get<Project[]>(`${API_URL}${PROJECTS_ROUTE}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200 && Array.isArray(response.data)) {
      return response.data.map(
        (project) => `${project.code}. ${project.description}`
      );
    }

    throw new Error("Formato de resposta inválido");
  } catch (error: any) {
    console.error("Erro ao buscar os códigos de projetos:", error.message);
    return [];
  }
}

// **Cria pastas para os projetos**
async function createProjectFolders(projectCodes: string[]): Promise<void> {
  try {
    await fs.mkdir(BASE_DIRECTORY, { recursive: true });

    await Promise.all(
      projectCodes.map(async (code) => {
        const projectPath = path.join(BASE_DIRECTORY, code);
        try {
          await fs.mkdir(projectPath, { recursive: true });
          console.log(`📁 Pasta criada: ${code}`);
        } catch (error: any) {
          if (error.code !== "EEXIST") {
            console.error(`Erro ao criar pasta ${code}:`, error.message);
          }
        }
      })
    );
  } catch (error:any) {
    console.error("Erro ao criar diretório base:", error.message);
  }
}

// **Agendamento da Tarefa**
export function startService(): void {
  cron.schedule("*/30 * * * *", async () => {
    console.log("🔄 Iniciando verificação de projetos...");
    try {
      const projectCodes = await fetchProjectCodes();
      if (projectCodes.length > 0) {
        await createProjectFolders(projectCodes);
        console.log("✅ Pastas criadas com sucesso.");
      } else {
        console.log("⚠️ Nenhum novo projeto encontrado.");
      }
    } catch (error: any) {
      console.error("Erro ao executar o serviço:", error.message);
    }
  });

  console.log("⏳ Serviço de criação de pastas de projetos agendado.");
}
