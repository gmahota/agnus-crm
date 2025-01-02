import { Router, Request, Response } from "express";

import { prisma } from '../lib/prisma'

import { z } from 'zod'

const adminRouter = Router();


  adminRouter.get("/users", async (request: Request, response: Response) => {
    const items = await prisma.user.findMany();
    
    return response.status(200).json({ items })
  });

  adminRouter.get("/users/:id", async (request: Request, response: Response) => {
    const getUserBody = z.object({
      id: z.string()
    })
  
    const { id } = getUserBody.parse(request.params)
  
    const user = await prisma.user.findUnique({
      where: {
        id
      }
  
    })
  
    return response.status(200).json({ user }) 
  });
  adminRouter.post("/users", async (request: Request, response: Response) => {

    const createUserSchema = z.object({
      id: z.number(),
      email: z.string().email(),
      name: z.string().optional(),
      username: z.string().optional(),
      firstName: z.string().optional(),
      lastName: z.string().optional(),
      phoneNumber: z.string(),
      password: z.string().optional(),
      confirmPassword: z.boolean().optional(),
      inactive: z.boolean().default(false).optional(),
      country: z.string().default('Moz').optional(),
      //profile: z.object().nullable().optional(), // Assuming Profile is another model/schema
    });
  
    const validatedUserData = createUserSchema.parse(request.body)
  
    const _user = await prisma.customer.create({
      data: validatedUserData
    })
  
    return response.status(200)
  });

  adminRouter.delete("/users/:id", async (request: Request, response: Response) => {
    const getUserBody = z.object({
      id: z.string()
    })
  
    const { id } = getUserBody.parse(request.params)
  
    const user = await prisma.user.delete({
      where: {
        id
      }  
    })
  
    return response.status(200)
  });


export default adminRouter