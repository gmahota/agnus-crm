"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startService = startService;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const node_cron_1 = __importDefault(require("node-cron"));
const axios_1 = __importDefault(require("axios"));
const API_URL = process.env.API_URL || "http://localhost:5000/api/";
const BASE_DIRECTORY = process.env.BASE_DIRECTORY || "/base/projects";
async function fetchProjectCodes() {
    try {
        const response = await axios_1.default.get(API_URL + "base/projects");
        if (response.status === 200 && Array.isArray(response.data)) {
            return response.data.map((project) => `${project.code}. ${project.description}`);
        }
        throw new Error("Formato de resposta inválido");
    }
    catch (error) {
        console.error("Erro ao buscar os códigos de projetos:", error.message);
        return [];
    }
}
async function createProjectFolders(projectCodes) {
    if (!fs_1.default.existsSync(BASE_DIRECTORY)) {
        fs_1.default.mkdirSync(BASE_DIRECTORY, { recursive: true });
    }
    projectCodes.forEach((code) => {
        const projectPath = path_1.default.join(BASE_DIRECTORY, code);
        if (!fs_1.default.existsSync(projectPath)) {
            fs_1.default.mkdirSync(projectPath, { recursive: true });
            console.log(`Pasta criada para o projeto: ${code}`);
        }
        else {
            console.log(`Pasta já existe para o projeto: ${code}`);
        }
    });
}
function startService() {
    node_cron_1.default.schedule("*/30 * * * *", async () => {
        console.log("Iniciando tarefa para criar pastas de projetos...");
        try {
            const projectCodes = await fetchProjectCodes();
            if (projectCodes.length > 0) {
                await createProjectFolders(projectCodes);
                console.log("Tarefa concluída.");
            }
            else {
                console.log("Nenhum código de projeto foi retornado.");
            }
        }
        catch (error) {
            console.error("Erro ao executar a tarefa:", error.message);
        }
    });
    console.log("Serviço de criação de pastas agendado.");
}
