"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const channel_1 = __importDefault(require("../../models/crm/channel"));
const typeorm_1 = require("typeorm");
const findById = async function findById(id) {
    const ChannelRepository = typeorm_1.getRepository(channel_1.default);
    const item = await ChannelRepository.findOneOrFail({ id: id });
    return item;
};
const findAll = async function findAll() {
    const ChannelRepository = typeorm_1.getRepository(channel_1.default);
    const Channels = await ChannelRepository.find({
        order: {
            name: "ASC",
            id: "DESC",
        },
    });
    return Channels;
};
const findByName = async function findByName(name) {
    const ChannelRepository = typeorm_1.getRepository(channel_1.default);
    const item = await ChannelRepository.findOneOrFail({ name: name });
    return item;
};
const create = async function create(item) {
    const ChannelRepository = typeorm_1.getRepository(channel_1.default);
    await ChannelRepository.save(item);
    return item;
};
exports.default = {
    create,
    findById,
    findAll,
    findByName,
};
