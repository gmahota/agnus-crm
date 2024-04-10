"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rating_1 = __importDefault(require("../../models/crm/rating"));
const typeorm_1 = require("typeorm");
const findById = async function findById(id) {
    const RatingRepository = typeorm_1.getRepository(rating_1.default);
    const item = await RatingRepository.findOneOrFail({ id: id });
    return item;
};
const findAll = async function findAll() {
    const RatingRepository = typeorm_1.getRepository(rating_1.default);
    const Ratings = await RatingRepository.find({
        order: {
            name: "ASC",
            id: "DESC",
        },
    });
    return Ratings;
};
const findByName = async function findByName(name) {
    const RatingRepository = typeorm_1.getRepository(rating_1.default);
    const item = await RatingRepository.findOneOrFail({ name: name });
    return item;
};
const create = async function create(item) {
    const RatingRepository = typeorm_1.getRepository(rating_1.default);
    await RatingRepository.save(item);
    return item;
};
exports.default = {
    create,
    findById,
    findAll,
    findByName,
};
