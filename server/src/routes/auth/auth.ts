import { Router, Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { prisma } from "../../lib/prisma";
import { z } from "zod";
import bcrypt from "bcrypt";
import {
  createUserByEmailAndPassword,
  findUserByEmail,
} from "../../services/auth/users";
import { generateTokens, verifyToken } from "../../lib/auth/jwt";
import { addRefreshTokenToWhitelist } from "../../services/auth/auth";
import { verifyGoogleToken, findOrCreateUser } from "../../lib/auth/googleAuth";

const authRouter = Router();

// Registro de novo usuário
authRouter.post(
  "/register",
  async (req: Request, res: Response, next: NextFunction) => {
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
        createdAt: z.date().default(() => new Date()),
        updatedAt: z.date().default(() => new Date()),
      });

      const { email, password } = createUserSchema.parse(req.body);

      if (!email || !password) {
        res.status(400);
        throw new Error("You must provide an email and a password.");
      }

      const existingUser = await findUserByEmail(email);
      if (existingUser) {
        res.status(400);
        throw new Error("Email already in use.");
      }

      const _user = createUserSchema.parse(req.body);
      const user = await createUserByEmailAndPassword(_user);

      const jti = uuidv4();
      const { accessToken, refreshToken } = generateTokens(user, jti);

      await addRefreshTokenToWhitelist(jti, refreshToken, user.id);

      res.json({ accessToken, refreshToken });
    } catch (err) {
      next(err);
    }
  }
);

// Login com email e senha
authRouter.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .send("You must provide an email and a password.");
      }

      const existingUser = await findUserByEmail(email);
      if (!existingUser) {
        return res.status(403).send("Invalid login credentials.");
      }

      const validPassword = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (!validPassword) {
        return res.status(403).send("Invalid login credentials.");
      }

      const jti = uuidv4();
      const { accessToken, refreshToken } = generateTokens(existingUser, jti);

      await addRefreshTokenToWhitelist(jti, refreshToken, existingUser.id);

      res.json({ accessToken, refreshToken });
    } catch (err) {
      next(err);
    }
  }
);

// Login com Google
authRouter.post(
  "/google",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { token } = req.body;

      if (!token) {
        return res.status(400).send("Google token is required.");
      }

      const googleUser = await verifyGoogleToken(token);

      if (!googleUser || !googleUser.email) {
        return res.status(401).send("Invalid Google authentication.");
      }

      const user = await findOrCreateUser(googleUser);

      const jti = uuidv4();
      const { accessToken, refreshToken } = generateTokens(user, jti);

      await addRefreshTokenToWhitelist(jti, refreshToken, user.id);

      res.json({ accessToken, refreshToken, user });
    } catch (err) {
      next(err);
    }
  }
);

// Rota protegida (exemplo)
authRouter.get(
  "/protected",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader?.split(" ")[1];

      if (!token) {
        return res.status(401).send("Token is required.");
      }

      const decoded = verifyToken(token);

      if (!decoded) {
        return res.status(401).send("Invalid token.");
      }

      res.json({ message: "Protected route accessed.", user: decoded });
    } catch (err) {
      next(err);
    }
  }
);

export default authRouter;
