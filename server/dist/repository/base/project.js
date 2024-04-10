"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const project_1 = __importDefault(require("../../models/base/project"));
const typeorm_1 = require("typeorm");
const findById = async function findById(id) {
    const ProjectRepository = typeorm_1.getRepository(project_1.default);
    const data = await ProjectRepository.findOneOrFail({
        where: { id: id }
    });
    return data;
};
const findAll = async function findAll() {
    const ProjectRepository = typeorm_1.getRepository(project_1.default);
    const data = await ProjectRepository.find({
        order: {
            description: "ASC",
            id: "DESC",
        },
    });
    return data;
};
const create = async function create(data) {
    const ProjectRepository = typeorm_1.getRepository(project_1.default);
    await ProjectRepository.save(data);
    return data;
};
exports.default = {
    create,
    findAll,
    findById
};
