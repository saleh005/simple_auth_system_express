import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../utils/jwt";
import authService from "../services/auth.service";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  
  // Check if token is blacklisted
  if (authService.isTokenBlacklisted(token)) {
    return res.status(401).json({ error: "Token has been revoked. Please login again." });
  }
  
  const decoded = verifyJwt(token);

  if (!decoded) {
    return res.status(401).json({ error: "Invalid token" });
  }

  (req as any).user = decoded;

  next();
};
