import { Router, Request, Response } from "express";

// System Routers
import adminRouter from "./admin";
import baseRouter from "./base";
import crmRouter from "./crm";
import authRouter from "./auth";

import taskRouter from "./task";
import recordRouter from "./record";

import projectRouter from "./project";
const routes = Router();

routes.get("/", async (request: Request, response: Response) => {
  response.send("Wellcome!");
});

routes.get('/ping', (_req: Request, res: Response) => {
  return res.send('pong 🏓')
})


routes.use('/api/admin',adminRouter);

routes.use('/api/base',baseRouter);
routes.use("/api/base/projects", projectRouter);

routes.use('/api/crm',crmRouter);

routes.use("/api/crm/tasks", taskRouter);
routes.use("/api/crm/records", recordRouter);

routes.use('/api/auth',authRouter);

export default routes;