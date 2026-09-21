import { Router } from "express";

import {
  createAdmin,
  deleteAdmin,
  getAdmin,
  listAdmins,
  updateAdmin,
  updateAdminPassword,
} from "../controllers/adminController.js";
import { validateRequest } from "../middleware/validateRequest.js";
import {
  createAdminSchema,
  updateAdminSchema,
  updatePasswordSchema,
} from "../validators/adminValidators.js";

const router = Router();

router.get("/", listAdmins);
router.post("/", validateRequest(createAdminSchema), createAdmin);
router.get("/:id", getAdmin);
router.patch("/:id", validateRequest(updateAdminSchema), updateAdmin);
router.patch(
  "/:id/password",
  validateRequest(updatePasswordSchema),
  updateAdminPassword
);
router.delete("/:id", deleteAdmin);

export const adminRoutes = router;
