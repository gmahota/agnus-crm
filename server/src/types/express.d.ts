import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload | string; // Adjust type to match your JWT payload
    }
  }
}
