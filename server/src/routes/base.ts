import { Router, Request, Response } from "express";

import { prisma } from '../lib/prisma'

import { z } from 'zod'

const baseRouter = Router();

baseRouter.get("/customers", async (request: Request, response: Response) => {
  const items = await prisma.customer.findMany();
  
  return response.status(200).json({ items })
});
baseRouter.get("/customers/:id", async (request: Request, response: Response) => {
  const getPoolBody = z.object({
    id: z.number()
  })

  const { id } = getPoolBody.parse(request.params)

  const customer = await prisma.customer.findUnique({
    where: {
      id
    }

  })

  return response.status(200).json({ customer }) 
});

baseRouter.post("/customers/", async (request: Request, response: Response) => {

  const customerSchema = z.object({
    id: z.number(),
    code: z.string().optional(),
    name: z.string().max(50).optional(),
    address: z.string().max(50).optional(),
    vat: z.string().max(20).optional(),
    province: z.string().max(50).optional(),
    phoneNumber: z.string().max(20),
    cellphone: z.string().optional(),
    email: z.string().optional(),
    status: z.string().max(255).optional(),
    json: z.string().optional(),
    //leads: z.array(z.number()).optional(), // Assuming Lead IDs are stored as numbers
    //opportunities: z.array(z.number()).optional(), // Assuming Opportunity IDs are stored as numbers
  });

  const _customerData = customerSchema.parse(request.body)

  const _customer = await prisma.customer.create({
    data: _customerData
  })

  return response.status(200).json({ _customer }) 
});

baseRouter.delete("/customers/:id", async (request: Request, response: Response) => {
  const getCustomerBody = z.object({
    id: z.number()
  })

  const { id } = getCustomerBody.parse(request.params)

  const _customer = await prisma.customer.delete({
    where: {
      id
    }  
  })

  return response.status(200)
});
  
baseRouter.get("/products", async (request: Request, response: Response) => {
  const items = await prisma.product.findMany();
  
  return response.status(200).json({ items })
});
baseRouter.get("/products/:id", async (request: Request, response: Response) => {
  const getItemBody = z.object({
    id: z.number()
  })

  const { id } = getItemBody.parse(request.params)

  const item = await prisma.product.findUnique({
    where: {
      id
    }

  })

  return response.status(200).json({ item }) 
});
baseRouter.post("/products/", async (request: Request, response: Response) => {

  const itemSchema = z.object({
    id: z.number(),
    code: z.string().max(50),
    description: z.string().max(50),
    price: z.number().positive(),
  });

  const _item = itemSchema.parse(request.body)

  const _product = await prisma.product.create({
    data: _item
  })

  return response.status(200).json({ _product }) 
});

baseRouter.get("/projects", async (request: Request, response: Response) => {
  const items = await prisma.project.findMany();
  
  return response.status(200).json({ items })
});
baseRouter.get("/projects/:id", async (request: Request, response: Response) => {
  const getItemBody = z.object({
    id: z.number()
  })

  const { id } = getItemBody.parse(request.params)

  const item = await prisma.project.findUnique({
    where: {
      id
    }
  })

  return response.status(200).json({ item }) 
});
baseRouter.post("/projects/", async (request: Request, response: Response) => {

  const itemSchema =  z.object({
    id: z.number(),
    code: z.string().max(50).optional(),
    description: z.string().max(50),
    status: z.string().max(20),
  });

  const _item = itemSchema.parse(request.body)

  const _project = await prisma.project.create({
    data: _item
  })

  return response.status(200).json({ _project }) 
});


//Change my password
//router.post("/change-password", [checkJwt], AuthController.changePassword);

export default baseRouter;