import { Router, Request, Response } from "express";

// System Routers
import adminRouter from "./admin";
import baseRouter from "./base";
import crmRouter from "./crm";

const routes = Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Home Page
 *     description: Can be used to testing an API.
*/
routes.get("/", async (request: Request, response: Response) => {
  response.send("Wellcome!");
});

routes.get('/ping', (_req: Request, res: Response) => {
  return res.send('pong 🏓')
})


routes.use('/api/admin',adminRouter);
routes.use('/api/base',baseRouter);
routes.use('/api/crm',crmRouter);

export default routes;