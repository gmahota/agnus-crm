import { Router, Request, Response } from "express";

import { prisma } from "../lib/prisma";

import { z } from "zod";

const recordSchema = z.object({
  name: z.string().min(3, "Name is required and must be at least 3 characters"),
  description: z.string().optional(),
  customerId: z.coerce.number().int().positive(),
  projectId: z.coerce.number().int().optional(),
  type: z.string().min(1, "Type is required"), // Novo campo obrigatório
  classification: z.string().optional(), // Novo campo opcional
  nature: z.string().optional(), // Novo campo opcional
  status: z.string().optional(), // Novo campo opcional
  begin: z.coerce.date().optional(),
  previewStart: z.coerce.date().optional(),
  previewEnd: z.coerce.date().optional(),
  end: z.coerce.date().optional(),
  assigned: z.string().optional(),
  dueDate: z.coerce.date().optional(),
  timeBegin: z.coerce.date().optional(),
  timeEnd: z.coerce.date().optional(),
  time: z.string().optional(),
});

const router = Router();

// Get all Records
router.get("/", async (req, res) => {
  const { project } = req.query;
  const filter: any = {};

  console.log(req.query)
  if (project) {
    filter.projectId = Number(project);
  }

  const items = await prisma.record.findMany({
    where: filter,
    include: { project: true, tasks: true, customer: true },
  });
  res.json(items);
});

router.post("/", async (req, res) => {
  const validation = recordSchema.safeParse(req.body);
  if (!validation.success)
    return res.status(400).json({ errors: validation.error.errors });

  const record = await prisma.record.create({ data: validation.data });
  res.json(record);
});

router.put("/:id", async (req, res) => {
  const validation = recordSchema.safeParse(req.body);
  if (!validation.success)
    return res.status(400).json({ errors: validation.error.errors });

  const record = await prisma.record.update({
    where: { id: Number(req.params.id) },
    data: validation.data,
  });
  
  res.json(record);
});
export default router;
