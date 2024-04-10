"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = __importDefault(require("../../models/base/product"));
const typeorm_1 = require("typeorm");
const findById = async function findById(id) {
    const ProductRepository = typeorm_1.getRepository(product_1.default);
    const data = await ProductRepository.findOneOrFail({
        where: { id: id }
    });
    return data;
};
const findAll = async function findAll() {
    const ProductRepository = typeorm_1.getRepository(product_1.default);
    const data = await ProductRepository.find({
        order: {
            description: "ASC",
            id: "DESC",
        },
    });
    return data;
};
const create = async function create(data) {
    const ProductRepository = typeorm_1.getRepository(product_1.default);
    await ProductRepository.save(data);
    return data;
};
exports.default = {
    create,
    findAll,
    findById
};
