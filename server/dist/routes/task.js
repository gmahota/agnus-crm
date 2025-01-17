"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
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
    notes: zod_1.z.string().optional(),
    json: zod_1.z.string().optional()
});
const router = (0, express_1.Router)();
// Get all tasks
router.get("/", async (_, res) => {
    const items = await prisma_1.prisma.task.findMany({
        include: { project: true, record: true, customer: true },
    });
    res.json(items);
});
router.post("/", async (req, res) => {
    const validation = taskSchema.safeParse(req.body);
    if (!validation.success)
        return res.status(400).json({ errors: validation.error.errors });
    // Extrai o customerId e outros dados do payload
    const _a = validation.data, { customerId, recordId, projectId } = _a, taskData = __rest(_a, ["customerId", "recordId", "projectId"]);
    const task = await prisma_1.prisma.task.create({
        data: Object.assign(Object.assign({}, taskData), { customer: customerId ? {
                connect: { id: customerId }, // Conecta o cliente ao task
            } : undefined, record: recordId ? {
                connect: { id: recordId }, // Conecta o cliente ao task
            } : undefined, project: projectId ? {
                connect: { id: projectId }, // Conecta o cliente ao task
            } : undefined })
    });
    res.json(task);
});
router.put("/:id", async (req, res) => {
    const validation = taskSchema.safeParse(req.body);
    if (!validation.success)
        return res.status(400).json({ errors: validation.error.errors });
    // Extrai o customerId e outros dados do payload
    const _a = validation.data, { customerId, recordId, projectId } = _a, taskData = __rest(_a, ["customerId", "recordId", "projectId"]);
    const task = await prisma_1.prisma.task.update({
        where: { id: Number(req.params.id) },
        data: Object.assign(Object.assign({}, taskData), { customer: customerId ? {
                connect: { id: customerId }, // Conecta o cliente ao task
            } : undefined, record: recordId ? {
                connect: { id: recordId }, // Conecta o cliente ao task
            } : undefined, project: projectId ? {
                connect: { id: projectId }, // Conecta o cliente ao task
            } : undefined }),
        include: { project: true, record: true, customer: true }
    });
    res.json(task);
});
exports.default = router;
