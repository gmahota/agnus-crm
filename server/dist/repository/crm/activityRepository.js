"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const activity_1 = __importDefault(require("../../models/crm/activity"));
const typeorm_1 = require("typeorm");
const findById = async function findById(id) {
    const ActivityRepository = typeorm_1.getRepository(activity_1.default);
    const item = await ActivityRepository.findOneOrFail({ id: id });
    return item;
};
const findAll = async function findAll() {
    const ActivityRepository = typeorm_1.getRepository(activity_1.default);
    const Activitys = await ActivityRepository.find({
        order: {
            name: "ASC",
            id: "DESC",
        },
    });
    return Activitys;
};
const findByName = async function findByName(name) {
    const ActivityRepository = typeorm_1.getRepository(activity_1.default);
    const item = await ActivityRepository.findOneOrFail({ name: name });
    return item;
};
const create = async function create(item) {
    const ActivityRepository = typeorm_1.getRepository(activity_1.default);
    await ActivityRepository.save(item);
    return item;
};
exports.default = {
    create,
    findById,
    findAll,
    findByName,
};
