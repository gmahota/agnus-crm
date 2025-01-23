import { Router, Request, Response } from "express";

// System Routers
import adminRouter from "./admin";
import baseRouter from "./base";
import crmRouter from "./crm";
import authRouter from "./auth";
import taskRouter from "./task";
import recordRouter from "./record";
import projectRouter from "./project";

// Middleware
import { authenticateToken } from "../middleware/authMiddleware";

const routes = Router();

// Rotas públicas
routes.get("/", async (request: Request, response: Response) => {
  response.send("Welcome!");
});

routes.get("/ping", (_req: Request, res: Response) => {
  return res.send("pong 🏓");
});

// Rotas públicas de autenticação
routes.use("/api/auth", authRouter);

// Rotas protegidas
routes.use("/api/admin", authenticateToken, adminRouter);
routes.use("/api/base",authenticateToken, baseRouter);
routes.use("/api/base/projects", authenticateToken,projectRouter);
routes.use("/api/crm", authenticateToken,crmRouter);
routes.use("/api/crm/tasks", authenticateToken,taskRouter);
routes.use("/api/crm/records",authenticateToken, recordRouter);

export default routes;
