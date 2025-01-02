"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = require("../lib/prisma");
const zod_1 = require("zod");
const taskSchema = zod_1.z.object({
    title: zod_1.z
        .string()
        .min(3, "Title is required and must be at least 3 characters"),
    status: zod_1.z.enum(["pending", "in_progress", "completed"]).default("pending"),
    recordId: zod_1.z.coerce.number().int().optional(),
    customerId: zod_1.z.coerce.number().int().optional(),
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
router.post("/", async (req, res) => {
    const validation = taskSchema.safeParse(req.body);
    if (!validation.success)
        return res.status(400).json({ errors: validation.error.errors });
    const task = await prisma_1.prisma.task.create({ data: validation.data });
    res.json(task);
});
router.put("/:id", async (req, res) => {
    const validation = taskSchema.safeParse(req.body);
    if (!validation.success)
        return res.status(400).json({ errors: validation.error.errors });
    const task = await prisma_1.prisma.task.update({
        where: { id: Number(req.params.id) },
        data: validation.data,
    });
    res.json(task);
});
exports.default = router;
