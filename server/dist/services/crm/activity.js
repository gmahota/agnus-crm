"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const activityRepository_1 = __importDefault(require("../../repository/crm/activityRepository"));
const getById = (id) => activityRepository_1.default.findById(id);
const getAll = () => activityRepository_1.default.findAll();
const create = (Activity) => activityRepository_1.default.create(Activity);
const getByName = (name) => activityRepository_1.default.findByName(name);
exports.default = {
    getAll,
    getById,
    create,
    getByName
};
