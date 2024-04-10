"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const opportunity_1 = __importDefault(require("../../models/crm/opportunity"));
const typeorm_1 = require("typeorm");
const findById = async function findById(id) {
    const OpportunityRepository = typeorm_1.getRepository(opportunity_1.default);
    const item = await OpportunityRepository.findOneOrFail({ id: id });
    return item;
};
const findAll = async function findAll() {
    const OpportunityRepository = typeorm_1.getRepository(opportunity_1.default);
    const Opportunitys = await OpportunityRepository.find({
        order: {
            name: "ASC",
            id: "DESC",
        },
    });
    return Opportunitys;
};
const findByName = async function findByName(name) {
    const OpportunityRepository = typeorm_1.getRepository(opportunity_1.default);
    const item = await OpportunityRepository.findOneOrFail({ name: name });
    return item;
};
const create = async function create(item) {
    const OpportunityRepository = typeorm_1.getRepository(opportunity_1.default);
    await OpportunityRepository.save(item);
    return item;
};
exports.default = {
    create,
    findById,
    findAll,
    findByName,
};
