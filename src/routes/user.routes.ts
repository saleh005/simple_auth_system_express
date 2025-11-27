import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth";
import { adminOnly } from "../middlewares/admin";

const router = Router();

router.use(authMiddleware);

router.get("/", adminOnly, getAllUsers);
router.get("/:id", getUserById);
router.patch("/:id", updateUser);
router.delete("/:id", adminOnly, deleteUser);

export default router;
