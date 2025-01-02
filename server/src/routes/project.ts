import { Router } from "express";
import { prisma } from "../lib/prisma";

import { z } from "zod";

const router = Router();

export const projectSchema = z.object({
  code: z.string(),
  description: z
    .string()
    .min(3, "Project name must be at least 3 characters long"),

  status: z.string().optional(),
});

// Create a new project
router.post("/", async (req, res) => {
  const validation = projectSchema.safeParse(req.body);
  if (!validation.success)
    return res.status(400).json({ errors: validation.error.errors });

  const project = await prisma.project.create({
    data: validation.data,
  });
  res.json(project);
});

// Get all projects
router.get("/", async (_, res) => {
  const projects = await prisma.project.findMany({
    include: { records: true, tasks: true },
  });
  res.json(projects);
});

// Get a single project by ID
router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const project = await prisma.project.findUnique({
    where: { id },
    include: { records: true, tasks: true },
  });
  if (!project) return res.status(404).json({ message: "Project not found" });
  res.json(project);
});

// Update a project
router.put("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const validation = projectSchema.safeParse(req.body);
  if (!validation.success)
    return res.status(400).json({ errors: validation.error.errors });

  const updatedProject = await prisma.project.update({
    where: { id },
    data: validation.data,
  });
  res.json(updatedProject);
});

// Delete a project
router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  await prisma.project.delete({ where: { id } });
  res.json({ message: "Project deleted successfully" });
});

export default router;
