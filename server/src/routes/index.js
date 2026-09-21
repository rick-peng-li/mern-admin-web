import { Router } from "express";

import { requireAuth } from "../middleware/authMiddleware.js";
import { adminRoutes } from "./adminRoutes.js";
import { authRoutes } from "./authRoutes.js";
import { customerRoutes } from "./customerRoutes.js";
import { dashboardRoutes } from "./dashboardRoutes.js";
import { leadRoutes } from "./leadRoutes.js";
import { productRoutes } from "./productRoutes.js";

const router = Router();

router.get("/health", (_req, res) => {
  res.json({
    success: true,
    message: "server is running",
  });
});

router.use("/auth", authRoutes);
router.use("/dashboard", requireAuth, dashboardRoutes);
router.use("/admins", requireAuth, adminRoutes);
router.use("/customers", requireAuth, customerRoutes);
router.use("/leads", requireAuth, leadRoutes);
router.use("/products", requireAuth, productRoutes);

export const apiRoutes = router;
