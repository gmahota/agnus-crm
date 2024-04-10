import { Router, Request, Response } from "express";

import { prisma } from '../lib/prisma'

import { z } from 'zod'

const adminRouter = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The user ID.
 *           example: 0
 *         name:
 *           type: string
 *           description: The user's name.
 *           example: Leanne Graham
 */

/**
 * @swagger
 * /Admin/Users:
 *   get:
 *     summary: Get User's List JSONPlaceholder 
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to testing an API.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The user ID.
 *                         example: 0
 *                       name:
 *                         type: string
 *                         description: The user's name.
 *                         example: Leanne Graham
 */
  adminRouter.get("/users", async (request: Request, response: Response) => {
    const items = await prisma.user.findMany();
    
    return response.status(200).json({ items })
  });
 /**
 * @swagger
 * /Admin/users/{id}:
 *   get:
 *     summary: Retrieve a single JSONPlaceholder user.
 *     description: Retrieve a single JSONPlaceholder user. Can be used to populate a user profile when prototyping or testing an API.
  *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: The user ID.
 *                       example: 0
 *                     name:
 *                       type: string
 *                       description: The user's name.
 *                       example: Leanne Graham
*/
  adminRouter.get("/users/:id", async (request: Request, response: Response) => {
    const getUserBody = z.object({
      id: z.number()
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
      id: z.number()
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