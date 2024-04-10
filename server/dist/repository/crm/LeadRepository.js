"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lead_1 = __importDefault(require("../../models/crm/lead"));
const typeorm_1 = require("typeorm");
const findById = async function findById(id) {
    const LeadRepository = typeorm_1.getRepository(lead_1.default);
    const item = await LeadRepository.findOneOrFail({ id: id });
    return item;
};
const findAll = async function findAll() {
    const LeadRepository = typeorm_1.getRepository(lead_1.default);
    const Leads = await LeadRepository.find({
        order: {
            name: "ASC",
            id: "DESC",
        },
    });
    return Leads;
};
const findByName = async function findByName(name) {
    const LeadRepository = typeorm_1.getRepository(lead_1.default);
    const item = await LeadRepository.findOneOrFail({ name: name });
    return item;
};
const create = async function create(item) {
    const LeadRepository = typeorm_1.getRepository(lead_1.default);
    await LeadRepository.save(item);
    return item;
};
exports.default = {
    create,
    findById,
    findAll,
    findByName,
};
