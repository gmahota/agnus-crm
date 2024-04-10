"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.delete_opportunity = exports.create_opportunity = exports.get_opportunity = exports.get_all_opportunities = void 0;
const opportunity_1 = __importDefault(require("../../services/crm/opportunity"));
const get_all_opportunities = async (request, response) => {
    const opportunity = await opportunity_1.default.getAll();
    return response.status(200).json(opportunity);
};
exports.get_all_opportunities = get_all_opportunities;
const get_opportunity = async (request, response) => {
    const { id } = request.params;
    const opportunity = await opportunity_1.default.getById(id);
    if (opportunity) {
        return response.status(200).json(opportunity);
    }
    return response.status(404).json({ msg: "no opportunity with that phoneNumber" });
};
exports.get_opportunity = get_opportunity;
const create_opportunity = async (request, response) => {
    const { id, name, description, stage, accountExecutive, customer, estimatedRevenue, estimatedClosingDate, probability, ratingID, createdAt } = await request.body;
    try {
        let opportunity = {
            id,
            name,
            description,
            stage,
            accountExecutive,
            customer,
            estimatedRevenue,
            estimatedClosingDate,
            probability,
            ratingID,
            createdAt
        };
        opportunity = await opportunity_1.default.create(opportunity);
        return response.status(200).json(opportunity);
    }
    catch (e) {
        return response.status(404).json({ msg: "error to create a opportunity with that i", error: e });
    }
};
exports.create_opportunity = create_opportunity;
const delete_opportunity = async (request, response) => {
    return response.status(500).json({ msg: "not Implemented" });
    const { id } = request.body;
    try {
        //await opportunityervice.remove(id);
        return response.send(200).json({ id: id });
    }
    catch (e) {
        return response.send(404).json({ msg: "error to create a order with that i" });
    }
};
exports.delete_opportunity = delete_opportunity;
