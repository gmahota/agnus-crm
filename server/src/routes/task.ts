import { Router, Request, Response } from "express";

import { prisma } from "../lib/prisma";

import { z } from "zod";
import { json } from "stream/consumers";

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
  notes: z.string().optional(),
  json:z.string().optional()
});

const router = Router();

// Get all tasks
router.get("/", async (_, res) => {
  const items = await prisma.task.findMany({
    include: { project:true, record:true, customer:true },
  });
  res.json(items);
});

router.post("/", async (req, res) => {
  const validation = taskSchema.safeParse(req.body);
  if (!validation.success)
    return res.status(400).json({ errors: validation.error.errors });

   // Extrai o customerId e outros dados do payload
   const { customerId,recordId,projectId, ...taskData } = validation.data;

  const task = await prisma.task.create(
    { 
      data: {
        ...taskData,
        customer: customerId? {
          connect: { id: customerId }, // Conecta o cliente ao task
        }:undefined,        
        record: recordId? {
          connect: { id: recordId }, // Conecta o cliente ao task
        }:undefined,
        project:projectId? {
          connect: { id: projectId }, // Conecta o cliente ao task
        }:undefined,
      }      
      
    });
  res.json(task);
});

router.put("/:id", async (req, res) => {
  const validation = taskSchema.safeParse(req.body);
  if (!validation.success)
    return res.status(400).json({ errors: validation.error.errors });

  // Extrai o customerId e outros dados do payload
  const { customerId,recordId,projectId, ...taskData } = validation.data;

  const task = await prisma.task.update({
    where: { id: Number(req.params.id) },
    data: {
        ...taskData,
        customer: customerId? {
          connect: { id: customerId }, // Conecta o cliente ao task
        }:undefined,        
        record: recordId? {
          connect: { id: recordId }, // Conecta o cliente ao task
        }:undefined,
        project:projectId? {
          connect: { id: projectId }, // Conecta o cliente ao task
        }:undefined,
      },
      include: { project:true, record:true, customer:true }  
  });
  res.json(task);
});


export default router;
