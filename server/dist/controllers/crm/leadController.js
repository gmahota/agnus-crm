"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.delete_lead = exports.create_lead = exports.get_lead = exports.get_all_leads = void 0;
const lead_1 = __importDefault(require("../../services/crm/lead"));
const get_all_leads = async (request, response) => {
    const lead = await lead_1.default.getAll();
    return response.status(200).json(lead);
};
exports.get_all_leads = get_all_leads;
const get_lead = async (request, response) => {
    const { id } = request.params;
    const lead = await lead_1.default.getById(id);
    if (lead) {
        return response.status(200).json(lead);
    }
    return response.status(404).json({ msg: "no lead with that phoneNumber" });
};
exports.get_lead = get_lead;
const create_lead = async (request, response) => {
    const { id, name, description, street1, street2, city, province, country, isQualified, isConverted, channel, customer, accountExecutive, leadlines, createdAt } = await request.body;
    try {
        let lead = {
            id,
            name,
            description,
            street1,
            street2,
            city,
            province,
            country,
            isQualified,
            isConverted,
            channel,
            customer,
            accountExecutive,
            leadlines,
            createdAt
        };
        lead = await lead_1.default.create(lead);
        return response.status(200).json(lead);
    }
    catch (e) {
        return response.status(404).json({ msg: "error to create a lead with that i", error: e });
    }
};
exports.create_lead = create_lead;
const delete_lead = async (request, response) => {
    return response.status(500).json({ msg: "not Implemented" });
    const { id } = request.body;
    try {
        //await leadervice.remove(id);
        return response.send(200).json({ id: id });
    }
    catch (e) {
        return response.send(404).json({ msg: "error to create a order with that i" });
    }
};
exports.delete_lead = delete_lead;
