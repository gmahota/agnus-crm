"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const accountExecutiveRepository_1 = __importDefault(require("../../repository/crm/accountExecutiveRepository"));
const getById = (id) => accountExecutiveRepository_1.default.findById(id);
const getAll = () => accountExecutiveRepository_1.default.findAll();
const create = (AccountExecutive) => accountExecutiveRepository_1.default.create(AccountExecutive);
const getByName = (name) => accountExecutiveRepository_1.default.findByName(name);
exports.default = {
    getAll,
    getById,
    create,
    getByName
};
