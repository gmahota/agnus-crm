"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// System Routers
const admin_1 = __importDefault(require("./admin"));
const base_1 = __importDefault(require("./base"));
const crm_1 = __importDefault(require("./crm"));
const auth_1 = __importDefault(require("./auth"));
const task_1 = __importDefault(require("./task"));
const record_1 = __importDefault(require("./record"));
const project_1 = __importDefault(require("./project"));
// Middleware
const authMiddleware_1 = require("../middleware/authMiddleware");
const routes = (0, express_1.Router)();
// Rotas públicas
routes.get("/", async (request, response) => {
    response.send("Welcome!");
});
routes.get("/ping", (_req, res) => {
    return res.send("pong 🏓");
});
// Rotas públicas de autenticação
routes.use("/api/auth", auth_1.default);
// Rotas protegidas
routes.use("/api/admin", authMiddleware_1.authenticateToken, admin_1.default);
routes.use("/api/base", authMiddleware_1.authenticateToken, base_1.default);
routes.use("/api/base/projects", authMiddleware_1.authenticateToken, project_1.default);
routes.use("/api/crm", authMiddleware_1.authenticateToken, crm_1.default);
routes.use("/api/crm/tasks", authMiddleware_1.authenticateToken, task_1.default);
routes.use("/api/crm/records", authMiddleware_1.authenticateToken, record_1.default);
exports.default = routes;
