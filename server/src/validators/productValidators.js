import { z } from "zod";

export const productSchema = z.object({
  productName: z.string().trim().min(1, "请输入产品名称"),
  sku: z.string().trim().optional().default(""),
  description: z.string().trim().min(1, "请输入产品描述"),
  price: z.coerce.number().min(0, "价格不能小于 0"),
  status: z
    .enum(["available", "low-stock", "archived"])
    .optional()
    .default("available"),
});

export const createProductSchema = productSchema;
export const updateProductSchema = productSchema.partial();
