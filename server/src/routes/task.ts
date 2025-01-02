import { Router, Request, Response } from "express";

import { prisma } from "../lib/prisma";

import { z } from "zod";

const taskSchema = z.object({
  title: z
    .string()
    .min(3, "Title is required and must be at least 3 characters"),
  status: z.enum(["pending", "in_progress", "completed"]).default("pending"),
  recordId: z.coerce.number().int().optional(),
  customerId: z.coerce.number().int().optional(),
  projectId: z.coerce.number().int().optional(),
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

router.post("/", async (req, res) => {
  const validation = taskSchema.safeParse(req.body);
  if (!validation.success)
    return res.status(400).json({ errors: validation.error.errors });

  const task = await prisma.task.create({ data: validation.data });
  res.json(task);
});

router.put("/:id", async (req, res) => {
  const validation = taskSchema.safeParse(req.body);
  if (!validation.success)
    return res.status(400).json({ errors: validation.error.errors });

  const task = await prisma.task.update({
    where: { id: Number(req.params.id) },
    data: validation.data,
  });
  res.json(task);
});


export default router;
