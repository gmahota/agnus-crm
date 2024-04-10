"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LeadRepository_1 = __importDefault(require("../../repository/crm/LeadRepository"));
const getById = (id) => LeadRepository_1.default.findById(id);
const getAll = () => LeadRepository_1.default.findAll();
const create = (Lead) => LeadRepository_1.default.create(Lead);
const getByName = (name) => LeadRepository_1.default.findByName(name);
exports.default = {
    getAll,
    getById,
    create,
    getByName
};
