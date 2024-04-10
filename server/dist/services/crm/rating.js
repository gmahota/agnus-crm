"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ratingRepository_1 = __importDefault(require("../../repository/crm/ratingRepository"));
const getById = (id) => ratingRepository_1.default.findById(id);
const getAll = () => ratingRepository_1.default.findAll();
const create = (item) => ratingRepository_1.default.create(item);
const getByName = (name) => ratingRepository_1.default.findByName(name);
exports.default = {
    getAll,
    getById,
    create,
    getByName
};
