"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customer_1 = __importDefault(require("../../repository/base/customer"));
const getById = (id) => customer_1.default.findById(id);
const getAll = () => customer_1.default.findAll();
const create = (Customer) => customer_1.default.create(Customer);
const getByPhoneNumber = (phoneNumber) => customer_1.default.findByPhoneNumber(phoneNumber);
exports.default = {
    getAll,
    getById,
    create,
    getByPhoneNumber
};
