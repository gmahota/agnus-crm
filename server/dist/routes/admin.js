"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = require("../lib/prisma");
const zod_1 = require("zod");
const adminRouter = (0, express_1.Router)();
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
adminRouter.get("/users", async (request, response) => {
    const items = await prisma_1.prisma.user.findMany();
    return response.status(200).json({ items });
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
adminRouter.get("/users/:id", async (request, response) => {
    const getUserBody = zod_1.z.object({
        id: zod_1.z.number()
    });
    const { id } = getUserBody.parse(request.params);
    const user = await prisma_1.prisma.user.findUnique({
        where: {
            id
        }
    });
    return response.status(200).json({ user });
});
adminRouter.post("/users", async (request, response) => {
    const createUserSchema = zod_1.z.object({
        id: zod_1.z.number(),
        email: zod_1.z.string().email(),
        name: zod_1.z.string().optional(),
        username: zod_1.z.string().optional(),
        firstName: zod_1.z.string().optional(),
        lastName: zod_1.z.string().optional(),
        phoneNumber: zod_1.z.string(),
        password: zod_1.z.string().optional(),
        confirmPassword: zod_1.z.boolean().optional(),
        inactive: zod_1.z.boolean().default(false).optional(),
        country: zod_1.z.string().default('Moz').optional(),
        //profile: z.object().nullable().optional(), // Assuming Profile is another model/schema
    });
    const validatedUserData = createUserSchema.parse(request.body);
    const _user = await prisma_1.prisma.customer.create({
        data: validatedUserData
    });
    return response.status(200);
});
adminRouter.delete("/users/:id", async (request, response) => {
    const getUserBody = zod_1.z.object({
        id: zod_1.z.number()
    });
    const { id } = getUserBody.parse(request.params);
    const user = await prisma_1.prisma.user.delete({
        where: {
            id
        }
    });
    return response.status(200);
});
exports.default = adminRouter;
