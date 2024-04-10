"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.delete_channel = exports.create_channel = exports.get_channel = exports.get_all_channels = void 0;
const channel_1 = __importDefault(require("../../services/crm/channel"));
const get_all_channels = async (request, response) => {
    const channel = await channel_1.default.getAll();
    return response.status(200).json(channel);
};
exports.get_all_channels = get_all_channels;
const get_channel = async (request, response) => {
    const { id } = request.params;
    const channel = await channel_1.default.getById(id);
    if (channel) {
        return response.status(200).json(channel);
    }
    return response.status(404).json({ msg: "no channel with that phoneNumber" });
};
exports.get_channel = get_channel;
const create_channel = async (request, response) => {
    const { id, name, createdAt, description, colorHex, leads } = await request.body;
    try {
        let channel = {
            id,
            name,
            createdAt,
            description,
            colorHex,
            leads
        };
        channel = await channel_1.default.create(channel);
        return response.status(200).json(channel);
    }
    catch (e) {
        return response.status(404).json({ msg: "error to create a channel with that i", error: e });
    }
};
exports.create_channel = create_channel;
const delete_channel = async (request, response) => {
    return response.status(500).json({ msg: "not Implemented" });
    const { id } = request.body;
    try {
        //await channelervice.remove(id);
        return response.send(200).json({ id: id });
    }
    catch (e) {
        return response.send(404).json({ msg: "error to create a order with that i" });
    }
};
exports.delete_channel = delete_channel;
