import { Router, Request, Response,NextFunction } from "express";

import { v4 as uuidv4 } from 'uuid';

import { prisma } from '../lib/prisma';

import { z } from 'zod';

import bcrypt from 'bcrypt';

import { createUserByEmailAndPassword, findUserByEmail } from "../services/auth/users";
import { generateTokens } from "../lib/jwt";
import { addRefreshTokenToWhitelist } from "../services/auth/auth";

const authRouter = Router();

authRouter.post('/register', async (request: Request, res: Response, next: NextFunction) => {
    try {
        const createUserSchema = z.object({
            id: z.string().uuid().default(uuidv4()),
            email: z.string().email(),
            name: z.string().optional().default(""),
            username: z.string().optional().default(""),
            firstName: z.string().optional().default(""),
            lastName: z.string().optional().default(""),
            phoneNumber: z.string().optional().default(""),
            password: z.string(),
            confirmPassword: z.boolean().optional().default(false),
            inactive: z.boolean().default(false),
            country: z.string().default("Moz"),
            //refreshTokens: z.array(z.string()).default([]),
            createdAt: z.date().default(() => new Date()),
            updatedAt: z.date().default(() => new Date()),
          });
        
          const {email,password} = createUserSchema.parse(request.body)

      if (!email || !password) {
        res.status(400);
        throw new Error('You must provide an email and a password.');
      }
  
      const existingUser = await findUserByEmail(email);
  
      if (existingUser) {
        res.status(400);
        throw new Error('Email already in use.');
      }
  
      const _user = createUserSchema.parse(request.body)

      const user = await createUserByEmailAndPassword(_user);

      const jti= uuidv4();
      
      const { accessToken, refreshToken } = generateTokens(user, jti);
      
      await addRefreshTokenToWhitelist(jti ,  refreshToken,user.id );
  
      res.json({
        accessToken,
        refreshToken,
      });
    } catch (err) {
      next(err);
    }
  });

authRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send('You must provide an email and a password.');
    }

    const existingUser = await findUserByEmail(email);
    if (!existingUser) {
      return res.status(403).send('Invalid login credentials.');
    }

    const validPassword = await bcrypt.compare(password, existingUser.password);
    if (!validPassword) {
      return res.status(403).send('Invalid login credentials.');
    }

    const jti = uuidv4();
    
    const { accessToken, refreshToken } = generateTokens(existingUser, jti);

    await addRefreshTokenToWhitelist(jti, refreshToken, existingUser.id );

    res.json({
      accessToken,
      refreshToken
    });
  } catch (err) {
    next(err);
  }
});

  export default authRouter;