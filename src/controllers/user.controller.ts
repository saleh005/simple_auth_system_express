import { Request, Response } from "express";
import {
  getAllUsersService,
  getUserByIdService,
  updateUserService,
  deleteUserService,
} from "../services/user.services";

type AuthRequest = Request & {
  user?: {
    id: number;
    role: string;
    email: string;
  };
};

export const getAllUsers = async (req: AuthRequest, res: Response) => {
  try {
    if (req.user?.role !== "admin") {
      return res.status(403).json({ error: "Access denied (admin only)" });
    }

    const users = await getAllUsersService();
    res.json(users);

  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserById = async (req: AuthRequest, res: Response) => {
  try {
    const user = await getUserByIdService(Number(req.params.id));
    if (!user) return res.status(404).json({ error: "User not found" });

    return res.json(user);
  } catch {
    return res.status(500).json({ error: "Server error" });
  }
};

export const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const user = await getUserByIdService(req.user.id);
    res.json(user);

  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req: AuthRequest, res: Response) => {
  try {
    const id = req.params.id;

    if (!req.user || (req.user.id !== parseInt(id) && req.user.role !== "admin")) {
    return res.status(403).json({ error: "Access denied" });
    }

    const updated = await updateUserService(parseInt(id), req.body);

    if (!updated) return res.status(404).json({ error: "User not found" });

    return res.json({ message: "User updated successfully" });
  } catch {
    return res.status(500).json({ error: "Server error" });
  }
};

export const deleteUser = async (req: AuthRequest, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (!req.user || (req.user.id !== id && req.user.role !== "admin")) {
      return res.status(403).json({ error: "Access denied" });
    }

    const deleted = await deleteUserService(id);
    if (!deleted) return res.status(404).json({ error: "User not found" });

    return res.json({ message: "User deleted successfully" });
  } catch {
    return res.status(500).json({ error: "Server error" });
  }
};


