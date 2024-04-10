"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.delete_rating = exports.create_rating = exports.get_rating = exports.get_all_ratings = void 0;
const rating_1 = __importDefault(require("../../services/crm/rating"));
const get_all_ratings = async (request, response) => {
    const rating = await rating_1.default.getAll();
    return response.status(200).json(rating);
};
exports.get_all_ratings = get_all_ratings;
const get_rating = async (request, response) => {
    const { id } = request.params;
    const rating = await rating_1.default.getById(id);
    if (rating) {
        return response.status(200).json(rating);
    }
    return response.status(404).json({ msg: "no rating with that phoneNumber" });
};
exports.get_rating = get_rating;
const create_rating = async (request, response) => {
    const { id, name, description, colorHex, createdAt } = await request.body;
    try {
        let rating = {
            id,
            name,
            description,
            colorHex,
            createdAt
        };
        rating = await rating_1.default.create(rating);
        return response.status(200).json(rating);
    }
    catch (e) {
        return response.status(404).json({ msg: "error to create a rating with that i", error: e });
    }
};
exports.create_rating = create_rating;
const delete_rating = async (request, response) => {
    return response.status(500).json({ msg: "not Implemented" });
    const { id } = request.body;
    try {
        //await ratingervice.remove(id);
        return response.send(200).json({ id: id });
    }
    catch (e) {
        return response.send(404).json({ msg: "error to create a order with that i" });
    }
};
exports.delete_rating = delete_rating;
