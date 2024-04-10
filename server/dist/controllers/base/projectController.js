"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.delete_Project = exports.create_project = exports.get_project = exports.get_all_projects = void 0;
const project_1 = __importDefault(require("../../services/base/project"));
const get_all_projects = async (request, response) => {
    const Project = await project_1.default.getAll();
    return response.status(200).json(Project);
};
exports.get_all_projects = get_all_projects;
const get_project = async (request, response) => {
    const { id } = request.params;
    const Project = await project_1.default.getById(id);
    if (Project) {
        return response.status(200).json(Project);
    }
    return response.status(404).json({ msg: "no Project with that phoneNumber" });
};
exports.get_project = get_project;
const create_project = async (request, response) => {
    const { code, description, status, } = await request.body;
    try {
        let Project = {
            id: 0,
            code,
            description,
            status,
        };
        Project = await project_1.default.create(Project);
        return response.status(200).json(Project);
    }
    catch (e) {
        return response.status(404).json({ msg: "error to create a Project with that i", error: e });
    }
};
exports.create_project = create_project;
const delete_Project = async (request, response) => {
    return response.status(500).json({ msg: "not Implemented" });
    const { id } = request.body;
    try {
        //await Projectervice.remove(id);
        return response.send(200).json({ id: id });
    }
    catch (e) {
        return response.send(404).json({ msg: "error to create a order with that i" });
    }
};
exports.delete_Project = delete_Project;
