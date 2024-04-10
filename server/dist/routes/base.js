"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = require("../lib/prisma");
const zod_1 = require("zod");
const baseRouter = (0, express_1.Router)();
baseRouter.get("/customers", async (request, response) => {
    const items = await prisma_1.prisma.customer.findMany();
    return response.status(200).json({ items });
});
baseRouter.get("/customers/:id", async (request, response) => {
    const getPoolBody = zod_1.z.object({
        id: zod_1.z.number()
    });
    const { id } = getPoolBody.parse(request.params);
    const customer = await prisma_1.prisma.customer.findUnique({
        where: {
            id
        }
    });
    return response.status(200).json({ customer });
});
baseRouter.post("/customers/", async (request, response) => {
    const customerSchema = zod_1.z.object({
        id: zod_1.z.number(),
        code: zod_1.z.string().optional(),
        name: zod_1.z.string().max(50).optional(),
        address: zod_1.z.string().max(50).optional(),
        vat: zod_1.z.string().max(20).optional(),
        province: zod_1.z.string().max(50).optional(),
        phoneNumber: zod_1.z.string().max(20),
        cellphone: zod_1.z.string().optional(),
        email: zod_1.z.string().optional(),
        status: zod_1.z.string().max(255).optional(),
        json: zod_1.z.string().optional(),
        //leads: z.array(z.number()).optional(), // Assuming Lead IDs are stored as numbers
        //opportunities: z.array(z.number()).optional(), // Assuming Opportunity IDs are stored as numbers
    });
    const _customerData = customerSchema.parse(request.body);
    const _customer = await prisma_1.prisma.customer.create({
        data: _customerData
    });
    return response.status(200).json({ _customer });
});
baseRouter.delete("/customers/:id", async (request, response) => {
    const getCustomerBody = zod_1.z.object({
        id: zod_1.z.number()
    });
    const { id } = getCustomerBody.parse(request.params);
    const _customer = await prisma_1.prisma.customer.delete({
        where: {
            id
        }
    });
    return response.status(200);
});
baseRouter.get("/products", async (request, response) => {
    const items = await prisma_1.prisma.product.findMany();
    return response.status(200).json({ items });
});
baseRouter.get("/products/:id", async (request, response) => {
    const getItemBody = zod_1.z.object({
        id: zod_1.z.number()
    });
    const { id } = getItemBody.parse(request.params);
    const item = await prisma_1.prisma.product.findUnique({
        where: {
            id
        }
    });
    return response.status(200).json({ item });
});
baseRouter.post("/products/", async (request, response) => {
    const itemSchema = zod_1.z.object({
        id: zod_1.z.number(),
        code: zod_1.z.string().max(50),
        description: zod_1.z.string().max(50),
        price: zod_1.z.number().positive(),
    });
    const _item = itemSchema.parse(request.body);
    const _product = await prisma_1.prisma.product.create({
        data: _item
    });
    return response.status(200).json({ _product });
});
baseRouter.get("/projects", async (request, response) => {
    const items = await prisma_1.prisma.project.findMany();
    return response.status(200).json({ items });
});
baseRouter.get("/projects/:id", async (request, response) => {
    const getItemBody = zod_1.z.object({
        id: zod_1.z.number()
    });
    const { id } = getItemBody.parse(request.params);
    const item = await prisma_1.prisma.project.findUnique({
        where: {
            id
        }
    });
    return response.status(200).json({ item });
});
baseRouter.post("/projects/", async (request, response) => {
    const itemSchema = zod_1.z.object({
        id: zod_1.z.number(),
        code: zod_1.z.string().max(50).optional(),
        description: zod_1.z.string().max(50),
        status: zod_1.z.string().max(20),
    });
    const _item = itemSchema.parse(request.body);
    const _project = await prisma_1.prisma.project.create({
        data: _item
    });
    return response.status(200).json({ _project });
});
//Change my password
//router.post("/change-password", [checkJwt], AuthController.changePassword);
exports.default = baseRouter;
