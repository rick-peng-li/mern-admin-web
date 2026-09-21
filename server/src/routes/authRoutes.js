import { Router } from "express";

import {
  getCurrentUser,
  login,
  logout,
} from "../controllers/authController.js";
import { requireAuth } from "../middleware/authMiddleware.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { loginSchema } from "../validators/authValidators.js";

const router = Router();

router.post("/login", validateRequest(loginSchema), login);
router.get("/me", requireAuth, getCurrentUser);
router.post("/logout", requireAuth, logout);

export const authRoutes = router;
