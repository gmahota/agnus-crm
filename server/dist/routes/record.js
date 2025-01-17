"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = require("../lib/prisma");
const zod_1 = require("zod");
const recordSchema = zod_1.z.object({
    name: zod_1.z.string().min(3, "Name is required and must be at least 3 characters"),
    description: zod_1.z.string().optional(),
    customerId: zod_1.z.coerce.number().int().positive(),
    projectId: zod_1.z.coerce.number().int().optional(),
    begin: zod_1.z.coerce.date().optional(),
    previewStart: zod_1.z.coerce.date().optional(),
    previewEnd: zod_1.z.coerce.date().optional(),
    end: zod_1.z.coerce.date().optional(),
    assigned: zod_1.z.string().optional(),
    dueDate: zod_1.z.coerce.date().optional(),
    timeBegin: zod_1.z.coerce.date().optional(),
    timeEnd: zod_1.z.coerce.date().optional(),
    time: zod_1.z.string().optional(),
});
const router = (0, express_1.Router)();
// Get all Records
router.get("/", async (_, res) => {
    const items = await prisma_1.prisma.record.findMany({
        include: { project: true, tasks: true, customer: true },
    });
    res.json(items);
});
router.post("/", async (req, res) => {
    const validation = recordSchema.safeParse(req.body);
    if (!validation.success)
        return res.status(400).json({ errors: validation.error.errors });
    const record = await prisma_1.prisma.record.create({ data: validation.data });
    res.json(record);
});
router.put("/:id", async (req, res) => {
    const validation = recordSchema.safeParse(req.body);
    if (!validation.success)
        return res.status(400).json({ errors: validation.error.errors });
    const record = await prisma_1.prisma.record.update({
        where: { id: Number(req.params.id) },
        data: validation.data,
    });
    res.json(record);
});
exports.default = router;
