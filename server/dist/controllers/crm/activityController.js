"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.delete_activity = exports.create_activity = exports.get_activity = exports.get_all_activities = void 0;
const activity_1 = __importDefault(require("../../services/crm/activity"));
const get_all_activities = async (request, response) => {
    const activity = await activity_1.default.getAll();
    return response.status(200).json(activity);
};
exports.get_all_activities = get_all_activities;
const get_activity = async (request, response) => {
    const { id } = request.params;
    const activity = await activity_1.default.getById(id);
    if (activity) {
        return response.status(200).json(activity);
    }
    return response.status(404).json({ msg: "no activity with that phoneNumber" });
};
exports.get_activity = get_activity;
const create_activity = async (request, response) => {
    const { id, name, createdAt, description, colorHex, leadlines } = await request.body;
    try {
        let activity = {
            id,
            name,
            createdAt,
            description,
            colorHex,
            leadlines
        };
        activity = await activity_1.default.create(activity);
        return response.status(200).json(activity);
    }
    catch (e) {
        return response.status(404).json({ msg: "error to create a activity with that i", error: e });
    }
};
exports.create_activity = create_activity;
const delete_activity = async (request, response) => {
    return response.status(500).json({ msg: "not Implemented" });
    const { id } = request.body;
    try {
        //await activityervice.remove(id);
        return response.send(200).json({ id: id });
    }
    catch (e) {
        return response.send(404).json({ msg: "error to create a order with that i" });
    }
};
exports.delete_activity = delete_activity;
