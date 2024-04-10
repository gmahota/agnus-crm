"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const channelRepository_1 = __importDefault(require("../../repository/crm/channelRepository"));
const getById = (id) => channelRepository_1.default.findById(id);
const getAll = () => channelRepository_1.default.findAll();
const create = (Channel) => channelRepository_1.default.create(Channel);
const getByName = (name) => channelRepository_1.default.findByName(name);
exports.default = {
    getAll,
    getById,
    create,
    getByName
};
