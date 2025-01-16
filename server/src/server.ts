import express, { response } from "express";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import "express-async-errors";

import routes from "./routes/routes";

import errorHandler from "./errors/handler";

import * as projectsServ from "./services/projectsToFolderServices"; // Importa o serviço
import * as tasksSrv from './services/tasksToFolderServices'; // Importa o serviço

dotenv.config();

const app = express();

// Constants
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(routes);
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));
app.use(errorHandler);

projectsServ.startService();
tasksSrv.startService();

app.listen(port);