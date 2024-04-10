import { Router, Request, Response } from "express";

import { prisma } from '../lib/prisma'

import { z } from 'zod'

const crmrouter = Router();

crmrouter.get("/accountexecutives", async (request: Request, response: Response) => {
    const items = await prisma.accountExecutive.findMany();

    return response.status(200).json({ items })
});
crmrouter.get("/accountexecutives/:id", async (request: Request, response: Response) => {
    const getItemBody = z.object({
        id: z.string()
    })

    const { id } = getItemBody.parse(request.params)

    const item = await prisma.accountExecutive.findUnique({
        where: {
            id
        }

    })

    return response.status(200).json({ item })
});
crmrouter.post("/accountexecutives/", async (request: Request, response: Response) => {

    const itemSchema =  z.object({
        id: z.string(),
        name: z.string().optional(),
        description: z.string().optional(),
        phone: z.string().optional(),
        email: z.string().optional(),
        street1: z.string().optional(),
        street2: z.string().optional(),
        city: z.string().optional(),
        province: z.string().optional(),
        country: z.string().optional(),
        systemUserID: z.string().optional(),
        createdAt: z.string().optional(), // Assuming createdAt is a string representing a date
        leads: z.array(z.string()).optional(), // Assuming Lead IDs are stored as strings
        //opportunities: z.array(z.string()).optional(), // Assuming Opportunity IDs are stored as strings
      });
  
    const _item = itemSchema.parse(request.body)
  
    const _channel = await prisma.activity.create({
      data: _item
    })
  
    return response.status(200).json({ _channel }) 
  });

crmrouter.get("/activities", async (request: Request, response: Response) => {
        const items = await prisma.activity.findMany();

        return response.status(200).json({ items })
    });
crmrouter.get("/activities/:id", async (request: Request, response: Response) => {
    const getItemBody = z.object({
        id: z.string()
    })

    const { id } = getItemBody.parse(request.params)

    const item = await prisma.activity.findUnique({
        where: {
            id
        }

    })

    return response.status(200).json({ item })
});
crmrouter.post("/activities/", async (request: Request, response: Response) => {

    const itemSchema =  z.object({
        id: z.string(),
        name: z.string().optional(),
        description: z.string().optional(),
        colorHex: z.string().optional(),
        createdAt: z.string().optional(), // Assuming createdAt is a string representing a date
        //leadlines: z.array(z.string()).optional(), // Assuming Opportunity IDs are stored as strings
      });
  
    const _item = itemSchema.parse(request.body)
  
    const _channel = await prisma.activity.create({
      data: _item
    })
  
    return response.status(200).json({ _channel }) 
  });

crmrouter.get("/channels", async (request: Request, response: Response) => {
        const items = await prisma.channel.findMany();

        return response.status(200).json({ items })
    });
crmrouter.get("/channels/:id", async (request: Request, response: Response) => {
    const getPoolBody = z.object({
        id: z.string()
    })

    const { id } = getPoolBody.parse(request.params)

    const item = await prisma.channel.findUnique({
        where: {
            id
        }
    })

    return response.status(200).json({ item })
});
crmrouter.post("/channels/", async (request: Request, response: Response) => {

    const itemSchema =  z.object({
        id: z.string(),
        name: z.string().optional(),
        description: z.string().optional(),
        colorHex: z.string().optional(),
        createdAt: z.string().optional(), // Assuming createdAt is a string representing a date
        //opportunities: z.array(z.string()).optional(), // Assuming Opportunity IDs are stored as strings
      });
  
    const _item = itemSchema.parse(request.body)
  
    const _channel = await prisma.channel.create({
      data: _item
    })
  
    return response.status(200).json({ _channel }) 
  });

crmrouter.get("/leads", async (request: Request, response: Response) => {
        const items = await prisma.lead.findMany();

        return response.status(200).json({ items })
    });
crmrouter.get("/leads/:id", async (request: Request, response: Response) => {
    const getItemBody = z.object({
        id: z.string()
    })

    const { id } = getItemBody.parse(request.params)

    const customer = await prisma.lead.findUnique({
        where: {
            id
        }
    })

    return response.status(200).json({ customer })
});
crmrouter.post("/leads/", async (request: Request, response: Response) => {

    const itemSchema = z.object({
        id: z.string(),
        name: z.string(),
        description: z.string().optional(),
        street1: z.string().optional(),
        street2: z.string().optional(),
        city: z.string().optional(),
        province: z.string().optional(),
        country: z.string().optional(),
        isQualified: z.boolean().optional(),
        isConverted: z.boolean().optional(),
        channelId: z.string().optional(),
        customerId: z.number().optional(),
        accountExecutiveId: z.string().optional(),
        //leadlines: z.array(z.string()).optional(), // Assuming LeadLine IDs are stored as strings
        createdAt: z.string().optional(), // Assuming createdAt is a string representing a date
      });
  
    const _item = itemSchema.parse(request.body)
  
    const _product = await prisma.lead.create({
      data: _item
    })
  
    return response.status(200).json({ _product }) 
  });

crmrouter.get("/opportunities", async (request: Request, response: Response) => {
        const items = await prisma.opportunity.findMany();

        return response.status(200).json({ items })
    });
crmrouter.get("/opportunities/:id", async (request: Request, response: Response) => {
    const getItemBody = z.object({
        id: z.string()
    })

    const { id } = getItemBody.parse(request.params)

    const item = await prisma.opportunity.findUnique({
        where: {
            id
        }

    })

    return response.status(200).json({ item })
});
crmrouter.post("/opportunities/", async (request: Request, response: Response) => {

    const itemSchema = z.object({
        id: z.string(),
        opportunityId: z.string(),
        activityId: z.string(),
        startDate: z.string(), // Assuming startDate is a string representing a date
        endDate: z.string(), // Assuming endDate is a string representing a date
        description: z.string(),
        createdAt: z.string().optional(), // Assuming createdAt is a string representing a date
      });
  
    const _item = itemSchema.parse(request.body)
  
    const _project = await prisma.opportunity.create({
      data: _item
    })
  
    return response.status(200).json({ _project }) 
  });

crmrouter.get("/ratings", async (request: Request, response: Response) => {
    const items = await prisma.rating.findMany();

    return response.status(200).json({ items })
});
crmrouter.get("/ratings/:id", async (request: Request, response: Response) => {
    const getItemBody = z.object({
        id: z.string()
    })

    const { id } = getItemBody.parse(request.params)

    const item = await prisma.rating.findUnique({
        where: {
            id
        }

    })

    return response.status(200).json({ item })
});
crmrouter.post("/ratings/", async (request: Request, response: Response) => {

    const itemSchema =  z.object({
        id: z.string(),
        name: z.string().optional(),
        description: z.string().optional(),
        colorHex: z.string().optional(),
        createdAt: z.string().optional(), // Assuming createdAt is a string representing a date
        //opportunities: z.array(z.string()).optional(), // Assuming Opportunity IDs are stored as strings
      });
  
    const _item = itemSchema.parse(request.body)
  
    const _project = await prisma.rating.create({
      data: _item
    })
  
    return response.status(200).json({ _project }) 
  });

crmrouter.get("/stages", async (request: Request, response: Response) => {
    const items = await prisma.stage.findMany();

    return response.status(200).json({ items })
});
crmrouter.get("/stages/:id", async (request: Request, response: Response) => {
    const getItemBody = z.object({
        id: z.string()
    })

    const { id } = getItemBody.parse(request.params)

    const item = await prisma.stage.findUnique({
        where: {
            id
        }

    })

    return response.status(200).json({ item })
});
crmrouter.post("/stages/", async (request: Request, response: Response) => {

    const itemSchema =  z.object({
        id: z.string(),
        name: z.string().optional(),
        description: z.string().optional(),
        colorHex: z.string().optional(),
        createdAt: z.string().optional(), // Assuming createdAt is a string representing a date
        //opportunities: z.array(z.string()).optional(), // Assuming Opportunity IDs are stored as strings
      });
  
    const _item = itemSchema.parse(request.body)
  
    const _project = await prisma.stage.create({
      data: _item
    })
  
    return response.status(200).json({ _project }) 
  });

export default crmrouter;