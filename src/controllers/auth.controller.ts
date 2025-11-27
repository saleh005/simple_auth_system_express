import { Request, Response } from "express";
import authService from "../services/auth.service";

class AuthController {
  async register(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      const { user, token } = await authService.register(name, email, password);

      return res.status(201).json({ message: "User created", user, token });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const { user, token } = await authService.login(email, password);

      return res.status(200).json({ message: "Login successful", user, token });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async logout(req: Request, res: Response) {
    try {
      const userId = (req as any).user?.id;
      if (!userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }
      
      // Get token from Authorization header
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(400).json({ error: "Token not provided" });
      }
      
      await authService.logout(userId, token);

      return res.status(200).json({ message: "Logout successful" });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    } 
  }
}

export default new AuthController();
