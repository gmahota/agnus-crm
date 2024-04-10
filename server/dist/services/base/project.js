"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const project_1 = __importDefault(require("../../repository/base/project"));
const getById = (id) => project_1.default.findById(id);
const getAll = () => project_1.default.findAll();
const create = (Project) => project_1.default.create(Project);
exports.default = {
    getAll,
    getById,
    create
};
