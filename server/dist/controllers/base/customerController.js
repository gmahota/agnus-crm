"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.delete_customer = exports.create_customer = exports.get_customer = exports.get_all_customers = void 0;
const customer_1 = __importDefault(require("../../services/base/customer"));
const get_all_customers = async (request, response) => {
    const Customer = await customer_1.default.getAll();
    return response.status(200).json(Customer);
};
exports.get_all_customers = get_all_customers;
const get_customer = async (request, response) => {
    const { id } = request.params;
    const Customer = await customer_1.default.getById(id);
    if (Customer) {
        return response.status(200).json(Customer);
    }
    return response.status(404).json({ msg: "no Customer with that phoneNumber" });
};
exports.get_customer = get_customer;
const create_customer = async (request, response) => {
    const { name, address, vat, province, phoneNumber, } = await request.body;
    try {
        let Customer = {
            id: 0,
            name,
            address,
            vat,
            province,
            phoneNumber
        };
        Customer = await customer_1.default.create(Customer);
        return response.status(200).json(Customer);
    }
    catch (e) {
        return response.status(404).json({ msg: "error to create a Customer with that i", error: e });
    }
};
exports.create_customer = create_customer;
const delete_customer = async (request, response) => {
    return response.status(500).json({ msg: "not Implemented" });
    const { id } = request.body;
    try {
        //await Customerervice.remove(id);
        return response.send(200).json({ id: id });
    }
    catch (e) {
        return response.send(404).json({ msg: "error to create a order with that i" });
    }
};
exports.delete_customer = delete_customer;
