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
const routes = (0, express_1.Router)();
routes.get("/", async (request, response) => {
    response.send("Wellcome!");
});
routes.get('/ping', (_req, res) => {
    return res.send('pong 🏓');
});
routes.use('/api/admin', admin_1.default);
routes.use('/api/base', base_1.default);
routes.use("/api/base/projects", project_1.default);
routes.use('/api/crm', crm_1.default);
routes.use("/api/crm/tasks", task_1.default);
routes.use("/api/crm/records", record_1.default);
routes.use('/api/auth', auth_1.default);
exports.default = routes;
