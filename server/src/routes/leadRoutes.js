import { Router } from "express";

import {
  createLead,
  deleteLead,
  getLead,
  listLeads,
  updateLead,
} from "../controllers/leadController.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { createLeadSchema, updateLeadSchema } from "../validators/leadValidators.js";

const router = Router();

router.get("/", listLeads);
router.post("/", validateRequest(createLeadSchema), createLead);
router.get("/:id", getLead);
router.patch("/:id", validateRequest(updateLeadSchema), updateLead);
router.delete("/:id", deleteLead);

export const leadRoutes = router;
