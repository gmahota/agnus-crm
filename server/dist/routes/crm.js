"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = require("../lib/prisma");
const zod_1 = require("zod");
const crmrouter = (0, express_1.Router)();
crmrouter.get("/accountexecutives", async (request, response) => {
    const items = await prisma_1.prisma.accountExecutive.findMany();
    return response.status(200).json({ items });
});
crmrouter.get("/accountexecutives/:id", async (request, response) => {
    const getItemBody = zod_1.z.object({
        id: zod_1.z.string()
    });
    const { id } = getItemBody.parse(request.params);
    const item = await prisma_1.prisma.accountExecutive.findUnique({
        where: {
            id
        }
    });
    return response.status(200).json({ item });
});
crmrouter.post("/accountexecutives/", async (request, response) => {
    const itemSchema = zod_1.z.object({
        id: zod_1.z.string(),
        name: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        phone: zod_1.z.string().optional(),
        email: zod_1.z.string().optional(),
        street1: zod_1.z.string().optional(),
        street2: zod_1.z.string().optional(),
        city: zod_1.z.string().optional(),
        province: zod_1.z.string().optional(),
        country: zod_1.z.string().optional(),
        systemUserID: zod_1.z.string().optional(),
        createdAt: zod_1.z.string().optional(), // Assuming createdAt is a string representing a date
        leads: zod_1.z.array(zod_1.z.string()).optional(), // Assuming Lead IDs are stored as strings
        //opportunities: z.array(z.string()).optional(), // Assuming Opportunity IDs are stored as strings
    });
    const _item = itemSchema.parse(request.body);
    const _channel = await prisma_1.prisma.activity.create({
        data: _item
    });
    return response.status(200).json({ _channel });
});
crmrouter.get("/activities", async (request, response) => {
    const items = await prisma_1.prisma.activity.findMany();
    return response.status(200).json({ items });
});
crmrouter.get("/activities/:id", async (request, response) => {
    const getItemBody = zod_1.z.object({
        id: zod_1.z.string()
    });
    const { id } = getItemBody.parse(request.params);
    const item = await prisma_1.prisma.activity.findUnique({
        where: {
            id
        }
    });
    return response.status(200).json({ item });
});
crmrouter.post("/activities/", async (request, response) => {
    const itemSchema = zod_1.z.object({
        id: zod_1.z.string(),
        name: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        colorHex: zod_1.z.string().optional(),
        createdAt: zod_1.z.string().optional(), // Assuming createdAt is a string representing a date
        //leadlines: z.array(z.string()).optional(), // Assuming Opportunity IDs are stored as strings
    });
    const _item = itemSchema.parse(request.body);
    const _channel = await prisma_1.prisma.activity.create({
        data: _item
    });
    return response.status(200).json({ _channel });
});
crmrouter.get("/channels", async (request, response) => {
    const items = await prisma_1.prisma.channel.findMany();
    return response.status(200).json({ items });
});
crmrouter.get("/channels/:id", async (request, response) => {
    const getPoolBody = zod_1.z.object({
        id: zod_1.z.string()
    });
    const { id } = getPoolBody.parse(request.params);
    const item = await prisma_1.prisma.channel.findUnique({
        where: {
            id
        }
    });
    return response.status(200).json({ item });
});
crmrouter.post("/channels/", async (request, response) => {
    const itemSchema = zod_1.z.object({
        id: zod_1.z.string(),
        name: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        colorHex: zod_1.z.string().optional(),
        createdAt: zod_1.z.string().optional(), // Assuming createdAt is a string representing a date
        //opportunities: z.array(z.string()).optional(), // Assuming Opportunity IDs are stored as strings
    });
    const _item = itemSchema.parse(request.body);
    const _channel = await prisma_1.prisma.channel.create({
        data: _item
    });
    return response.status(200).json({ _channel });
});
crmrouter.get("/leads", async (request, response) => {
    const items = await prisma_1.prisma.lead.findMany();
    return response.status(200).json({ items });
});
crmrouter.get("/leads/:id", async (request, response) => {
    const getItemBody = zod_1.z.object({
        id: zod_1.z.string()
    });
    const { id } = getItemBody.parse(request.params);
    const customer = await prisma_1.prisma.lead.findUnique({
        where: {
            id
        }
    });
    return response.status(200).json({ customer });
});
crmrouter.post("/leads/", async (request, response) => {
    const itemSchema = zod_1.z.object({
        id: zod_1.z.string(),
        name: zod_1.z.string(),
        description: zod_1.z.string().optional(),
        street1: zod_1.z.string().optional(),
        street2: zod_1.z.string().optional(),
        city: zod_1.z.string().optional(),
        province: zod_1.z.string().optional(),
        country: zod_1.z.string().optional(),
        isQualified: zod_1.z.boolean().optional(),
        isConverted: zod_1.z.boolean().optional(),
        channelId: zod_1.z.string().optional(),
        customerId: zod_1.z.number().optional(),
        accountExecutiveId: zod_1.z.string().optional(),
        //leadlines: z.array(z.string()).optional(), // Assuming LeadLine IDs are stored as strings
        createdAt: zod_1.z.string().optional(), // Assuming createdAt is a string representing a date
    });
    const _item = itemSchema.parse(request.body);
    const _product = await prisma_1.prisma.lead.create({
        data: _item
    });
    return response.status(200).json({ _product });
});
crmrouter.get("/opportunities", async (request, response) => {
    const items = await prisma_1.prisma.opportunity.findMany();
    return response.status(200).json({ items });
});
crmrouter.get("/opportunities/:id", async (request, response) => {
    const getItemBody = zod_1.z.object({
        id: zod_1.z.string()
    });
    const { id } = getItemBody.parse(request.params);
    const item = await prisma_1.prisma.opportunity.findUnique({
        where: {
            id
        }
    });
    return response.status(200).json({ item });
});
crmrouter.post("/opportunities/", async (request, response) => {
    const itemSchema = zod_1.z.object({
        id: zod_1.z.string(),
        opportunityId: zod_1.z.string(),
        activityId: zod_1.z.string(),
        startDate: zod_1.z.string(), // Assuming startDate is a string representing a date
        endDate: zod_1.z.string(), // Assuming endDate is a string representing a date
        description: zod_1.z.string(),
        createdAt: zod_1.z.string().optional(), // Assuming createdAt is a string representing a date
    });
    const _item = itemSchema.parse(request.body);
    const _project = await prisma_1.prisma.opportunity.create({
        data: _item
    });
    return response.status(200).json({ _project });
});
crmrouter.get("/ratings", async (request, response) => {
    const items = await prisma_1.prisma.rating.findMany();
    return response.status(200).json({ items });
});
crmrouter.get("/ratings/:id", async (request, response) => {
    const getItemBody = zod_1.z.object({
        id: zod_1.z.string()
    });
    const { id } = getItemBody.parse(request.params);
    const item = await prisma_1.prisma.rating.findUnique({
        where: {
            id
        }
    });
    return response.status(200).json({ item });
});
crmrouter.post("/ratings/", async (request, response) => {
    const itemSchema = zod_1.z.object({
        id: zod_1.z.string(),
        name: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        colorHex: zod_1.z.string().optional(),
        createdAt: zod_1.z.string().optional(), // Assuming createdAt is a string representing a date
        //opportunities: z.array(z.string()).optional(), // Assuming Opportunity IDs are stored as strings
    });
    const _item = itemSchema.parse(request.body);
    const _project = await prisma_1.prisma.rating.create({
        data: _item
    });
    return response.status(200).json({ _project });
});
crmrouter.get("/stages", async (request, response) => {
    const items = await prisma_1.prisma.stage.findMany();
    return response.status(200).json({ items });
});
crmrouter.get("/stages/:id", async (request, response) => {
    const getItemBody = zod_1.z.object({
        id: zod_1.z.string()
    });
    const { id } = getItemBody.parse(request.params);
    const item = await prisma_1.prisma.stage.findUnique({
        where: {
            id
        }
    });
    return response.status(200).json({ item });
});
crmrouter.post("/stages/", async (request, response) => {
    const itemSchema = zod_1.z.object({
        id: zod_1.z.string(),
        name: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        colorHex: zod_1.z.string().optional(),
        createdAt: zod_1.z.string().optional(), // Assuming createdAt is a string representing a date
        //opportunities: z.array(z.string()).optional(), // Assuming Opportunity IDs are stored as strings
    });
    const _item = itemSchema.parse(request.body);
    const _project = await prisma_1.prisma.stage.create({
        data: _item
    });
    return response.status(200).json({ _project });
});
exports.default = crmrouter;
