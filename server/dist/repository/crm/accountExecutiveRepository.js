"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const accountExecutive_1 = __importDefault(require("../../models/crm/accountExecutive"));
const typeorm_1 = require("typeorm");
const findById = async function findById(id) {
    const AccountExecutiveRepository = typeorm_1.getRepository(accountExecutive_1.default);
    const item = await AccountExecutiveRepository.findOneOrFail({ id: id });
    return item;
};
const findAll = async function findAll() {
    const AccountExecutiveRepository = typeorm_1.getRepository(accountExecutive_1.default);
    const AccountExecutives = await AccountExecutiveRepository.find({
        order: {
            name: "ASC",
            id: "DESC",
        },
    });
    return AccountExecutives;
};
const findByName = async function findByName(name) {
    const AccountExecutiveRepository = typeorm_1.getRepository(accountExecutive_1.default);
    const item = await AccountExecutiveRepository.findOneOrFail({ name: name });
    return item;
};
const create = async function create(item) {
    const AccountExecutiveRepository = typeorm_1.getRepository(accountExecutive_1.default);
    await AccountExecutiveRepository.save(item);
    return item;
};
exports.default = {
    create,
    findById,
    findAll,
    findByName,
};
