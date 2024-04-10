"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customer_1 = __importDefault(require("../../models/base/customer"));
const typeorm_1 = require("typeorm");
const findById = async function findById(id) {
    const CustomerRepository = typeorm_1.getRepository(customer_1.default);
    const customer = await CustomerRepository.findOneOrFail({
        where: { id: id }
    });
    return customer;
};
const findAll = async function findAll() {
    const CustomerRepository = typeorm_1.getRepository(customer_1.default);
    const customers = await CustomerRepository.find({
        order: {
            phoneNumber: "ASC",
            id: "DESC",
        },
    });
    return customers;
};
const findByPhoneNumber = async function findByPhoneNumber(phoneNumber) {
    const CustomerRepository = typeorm_1.getRepository(customer_1.default);
    const customer = await CustomerRepository.findOneOrFail({
        where: { phoneNumber: phoneNumber }
    });
    return customer;
};
const create = async function create(customer) {
    const customerRepository = typeorm_1.getRepository(customer_1.default);
    await customerRepository.save(customer);
    return customer;
};
exports.default = {
    create,
    findAll,
    findById,
    findByPhoneNumber
};
