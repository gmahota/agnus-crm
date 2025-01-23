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
const BASE_DIRECTORY = process.env.BASE_DIRECTORY_TASKS || "/crm/tasks";
const API_ROUTE = "crm/tasks";
// Função para formatar o nome da pasta
function formatFolderName(task) {
    // Trata `begin` para garantir que apenas a data seja usada
    const datePart = task.begin.includes("T")
        ? task.begin.split("T")[0]
        : task.begin;
    const formattedDate = datePart.replace(/-/g, ".");
    return `${formattedDate}. ${task.title}`;
}
// Função para criar as pastas para as tarefas
async function createTaskFolders(taskFolders) {
    if (!fs_1.default.existsSync(BASE_DIRECTORY)) {
        fs_1.default.mkdirSync(BASE_DIRECTORY, { recursive: true });
    }
    taskFolders.forEach((folder) => {
        const folderPath = path_1.default.join(BASE_DIRECTORY, folder);
        if (!fs_1.default.existsSync(folderPath)) {
            fs_1.default.mkdirSync(folderPath, { recursive: true });
            console.log(`Pasta criada: ${folder}`);
        }
        else {
            console.log(`Pasta já existe: ${folder}`);
        }
    });
}
// Função para buscar as tarefas na API
async function fetchTasks() {
    try {
        const response = await axios_1.default.get(API_URL + API_ROUTE);
        if (response.status === 200 && Array.isArray(response.data)) {
            // Formata cada tarefa no formato de pasta
            return response.data.map((task) => formatFolderName(task));
        }
        throw new Error("Resposta inválida da API");
    }
    catch (error) {
        console.error("Erro ao buscar tarefas da API:", error.message);
        return [];
    }
}
// Função para iniciar o serviço
function startService() {
    node_cron_1.default.schedule("*/15 * * * *", async () => {
        console.log("Iniciando tarefa para criar pastas de tarefas...");
        try {
            const taskFolders = await fetchTasks();
            if (taskFolders.length > 0) {
                await createTaskFolders(taskFolders);
                console.log("Tarefa concluída.");
            }
            else {
                console.log("Nenhuma tarefa foi retornada.");
            }
        }
        catch (error) {
            console.error("Erro ao executar a tarefa:", error.message);
        }
    });
    console.log("Serviço de criação de pastas de tarefas agendado.");
}
