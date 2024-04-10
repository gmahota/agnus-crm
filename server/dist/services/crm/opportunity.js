"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const opportunityRepository_1 = __importDefault(require("../../repository/crm/opportunityRepository"));
const getById = (id) => opportunityRepository_1.default.findById(id);
const getAll = () => opportunityRepository_1.default.findAll();
const create = (Opportunity) => opportunityRepository_1.default.create(Opportunity);
const getByName = (name) => opportunityRepository_1.default.findByName(name);
exports.default = {
    getAll,
    getById,
    create,
    getByName
};
