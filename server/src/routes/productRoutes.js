import { Router } from "express";

import {
  createProduct,
  deleteProduct,
  getProduct,
  listProducts,
  updateProduct,
} from "../controllers/productController.js";
import { validateRequest } from "../middleware/validateRequest.js";
import {
  createProductSchema,
  updateProductSchema,
} from "../validators/productValidators.js";

const router = Router();

router.get("/", listProducts);
router.post("/", validateRequest(createProductSchema), createProduct);
router.get("/:id", getProduct);
router.patch("/:id", validateRequest(updateProductSchema), updateProduct);
router.delete("/:id", deleteProduct);

export const productRoutes = router;
