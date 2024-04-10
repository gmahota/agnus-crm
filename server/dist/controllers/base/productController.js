"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.delete_product = exports.create_product = exports.get_product = exports.get_all_products = void 0;
const product_1 = __importDefault(require("../../services/base/product"));
const get_all_products = async (request, response) => {
    const product = await product_1.default.getAll();
    return response.status(200).json(product);
};
exports.get_all_products = get_all_products;
const get_product = async (request, response) => {
    const { id } = request.params;
    const product = await product_1.default.getById(id);
    if (product) {
        return response.status(200).json(product);
    }
    return response.status(404).json({ msg: "no product with that phoneNumber" });
};
exports.get_product = get_product;
const create_product = async (request, response) => {
    const { code, description, price, } = await request.body;
    try {
        let product = {
            id: 0,
            code,
            description,
            price,
        };
        product = await product_1.default.create(product);
        return response.status(200).json(product);
    }
    catch (e) {
        return response.status(404).json({ msg: "error to create a product with that i", error: e });
    }
};
exports.create_product = create_product;
const delete_product = async (request, response) => {
    return response.status(500).json({ msg: "not Implemented" });
    const { id } = request.body;
    try {
        //await productervice.remove(id);
        return response.send(200).json({ id: id });
    }
    catch (e) {
        return response.send(404).json({ msg: "error to create a order with that i" });
    }
};
exports.delete_product = delete_product;
