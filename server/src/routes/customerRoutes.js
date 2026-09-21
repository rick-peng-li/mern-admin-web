import { Router } from "express";

import {
  createCustomer,
  deleteCustomer,
  getCustomer,
  listCustomers,
  updateCustomer,
} from "../controllers/customerController.js";
import { validateRequest } from "../middleware/validateRequest.js";
import {
  createCustomerSchema,
  updateCustomerSchema,
} from "../validators/customerValidators.js";

const router = Router();

router.get("/", listCustomers);
router.post("/", validateRequest(createCustomerSchema), createCustomer);
router.get("/:id", getCustomer);
router.patch("/:id", validateRequest(updateCustomerSchema), updateCustomer);
router.delete("/:id", deleteCustomer);

export const customerRoutes = router;
