"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.delete_accountExecutive = exports.create_accountExecutive = exports.get_accountExecutive = exports.get_all_accountExecutives = void 0;
const accountExecutive_1 = __importDefault(require("../../services/crm/accountExecutive"));
const get_all_accountExecutives = async (request, response) => {
    const accountExecutive = await accountExecutive_1.default.getAll();
    return response.status(200).json(accountExecutive);
};
exports.get_all_accountExecutives = get_all_accountExecutives;
const get_accountExecutive = async (request, response) => {
    const { id } = request.params;
    const accountExecutive = await accountExecutive_1.default.getById(id);
    if (accountExecutive) {
        return response.status(200).json(accountExecutive);
    }
    return response.status(404).json({ msg: "no accountExecutive with that phoneNumber" });
};
exports.get_accountExecutive = get_accountExecutive;
const create_accountExecutive = async (request, response) => {
    const { id, name, description, phone, email, street1, street2, city, province, country, systemUserID, createdAt } = await request.body;
    try {
        let accountExecutive = {
            id,
            name,
            description,
            phone,
            email,
            street1,
            street2,
            city,
            province,
            country,
            systemUserID,
            createdAt
        };
        accountExecutive = await accountExecutive_1.default.create(accountExecutive);
        return response.status(200).json(accountExecutive);
    }
    catch (e) {
        return response.status(404).json({ msg: "error to create a accountExecutive with that i", error: e });
    }
};
exports.create_accountExecutive = create_accountExecutive;
const delete_accountExecutive = async (request, response) => {
    return response.status(500).json({ msg: "not Implemented" });
    const { id } = request.body;
    try {
        //await accountExecutiveervice.remove(id);
        return response.send(200).json({ id: id });
    }
    catch (e) {
        return response.send(404).json({ msg: "error to create a order with that i" });
    }
};
exports.delete_accountExecutive = delete_accountExecutive;
