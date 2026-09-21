import { z } from "zod";

export const leadSchema = z.object({
  customerName: z.string().trim().min(1, "请输入客户名称"),
  email: z.email("请输入有效邮箱"),
  phone: z.string().trim().min(1, "请输入联系电话"),
  date: z.coerce.date(),
  budget: z.coerce.number().min(0, "预算不能小于 0"),
  request: z.string().trim().min(1, "请输入需求描述"),
  source: z.string().trim().optional().default(""),
  status: z
    .enum(["new", "pending", "qualified", "won", "lost"])
    .optional()
    .default("pending"),
});

export const createLeadSchema = leadSchema;
export const updateLeadSchema = leadSchema.partial();
