import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../lib/auth/jwt";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ error: "Authentication token is missing or invalid." });
  }

  const token = authHeader.split(" ")[1]; // Extrai o token após "Bearer "

  try {
    const decoded = verifyToken(token);

    if (!decoded) {
      return res.status(401).json({ error: "Invalid or expired token." });
    }

    req.user = decoded; // Anexa o usuário decodificado ao request
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token." });
  }
};
