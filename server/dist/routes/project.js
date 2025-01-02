"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectSchema = void 0;
const express_1 = require("express");
const prisma_1 = require("../lib/prisma");
const zod_1 = require("zod");
const router = (0, express_1.Router)();
exports.projectSchema = zod_1.z.object({
    code: zod_1.z.string(),
    description: zod_1.z
        .string()
        .min(3, "Project name must be at least 3 characters long"),
    status: zod_1.z.string().optional(),
});
// Create a new project
router.post("/", async (req, res) => {
    const validation = exports.projectSchema.safeParse(req.body);
    if (!validation.success)
        return res.status(400).json({ errors: validation.error.errors });
    const project = await prisma_1.prisma.project.create({
        data: validation.data,
    });
    res.json(project);
});
// Get all projects
router.get("/", async (_, res) => {
    const projects = await prisma_1.prisma.project.findMany({
        include: { records: true, tasks: true },
    });
    res.json(projects);
});
// Get a single project by ID
router.get("/:id", async (req, res) => {
    const id = Number(req.params.id);
    const project = await prisma_1.prisma.project.findUnique({
        where: { id },
        include: { records: true, tasks: true },
    });
    if (!project)
        return res.status(404).json({ message: "Project not found" });
    res.json(project);
});
// Update a project
router.put("/:id", async (req, res) => {
    const id = Number(req.params.id);
    const validation = exports.projectSchema.safeParse(req.body);
    if (!validation.success)
        return res.status(400).json({ errors: validation.error.errors });
    const updatedProject = await prisma_1.prisma.project.update({
        where: { id },
        data: validation.data,
    });
    res.json(updatedProject);
});
// Delete a project
router.delete("/:id", async (req, res) => {
    const id = Number(req.params.id);
    await prisma_1.prisma.project.delete({ where: { id } });
    res.json({ message: "Project deleted successfully" });
});
exports.default = router;
