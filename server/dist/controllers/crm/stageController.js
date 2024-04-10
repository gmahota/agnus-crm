"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.delete_stage = exports.create_stage = exports.get_stage = exports.get_all_stages = void 0;
const stage_1 = __importDefault(require("../../services/crm/stage"));
const get_all_stages = async (request, response) => {
    const stage = await stage_1.default.getAll();
    return response.status(200).json(stage);
};
exports.get_all_stages = get_all_stages;
const get_stage = async (request, response) => {
    const { id } = request.params;
    const stage = await stage_1.default.getById(id);
    if (stage) {
        return response.status(200).json(stage);
    }
    return response.status(404).json({ msg: "no stage with that phoneNumber" });
};
exports.get_stage = get_stage;
const create_stage = async (request, response) => {
    const { id, name, description, colorHex, createdAt } = await request.body;
    try {
        let stage = {
            id,
            name,
            description,
            colorHex,
            createdAt
        };
        stage = await stage_1.default.create(stage);
        return response.status(200).json(stage);
    }
    catch (e) {
        return response.status(404).json({ msg: "error to create a stage with that i", error: e });
    }
};
exports.create_stage = create_stage;
const delete_stage = async (request, response) => {
    return response.status(500).json({ msg: "not Implemented" });
    const { id } = request.body;
    try {
        //await stageervice.remove(id);
        return response.send(200).json({ id: id });
    }
    catch (e) {
        return response.send(404).json({ msg: "error to create a order with that i" });
    }
};
exports.delete_stage = delete_stage;
