"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stage_1 = __importDefault(require("../../models/crm/stage"));
const typeorm_1 = require("typeorm");
const findById = async function findById(id) {
    const StageRepository = typeorm_1.getRepository(stage_1.default);
    const item = await StageRepository.findOneOrFail({ id: id });
    return item;
};
const findAll = async function findAll() {
    const StageRepository = typeorm_1.getRepository(stage_1.default);
    const Stages = await StageRepository.find({
        order: {
            name: "ASC",
            id: "DESC",
        },
    });
    return Stages;
};
const findByName = async function findByName(name) {
    const StageRepository = typeorm_1.getRepository(stage_1.default);
    const item = await StageRepository.findOneOrFail({ name: name });
    return item;
};
const create = async function create(item) {
    const StageRepository = typeorm_1.getRepository(stage_1.default);
    await StageRepository.save(item);
    return item;
};
exports.default = {
    create,
    findById,
    findAll,
    findByName,
};
