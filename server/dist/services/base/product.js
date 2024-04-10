"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = __importDefault(require("../../repository/base/product"));
const getById = (id) => product_1.default.findById(id);
const getAll = () => product_1.default.findAll();
const create = (Product) => product_1.default.create(Product);
exports.default = {
    getAll,
    getById,
    create
};
