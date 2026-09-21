import { z } from "zod";

export const createAdminSchema = z.object({
  email: z.email("请输入有效邮箱"),
  password: z
    .string()
    .min(8, "密码至少 8 位")
    .regex(/[A-Z]/, "密码至少包含一个大写字母")
    .regex(/[a-z]/, "密码至少包含一个小写字母")
    .regex(/[0-9]/, "密码至少包含一个数字"),
  firstName: z.string().trim().min(1, "请输入名"),
  lastName: z.string().trim().min(1, "请输入姓"),
  status: z.enum(["active", "inactive"]).optional(),
  avatarUrl: z.string().trim().optional().default(""),
});

export const updateAdminSchema = createAdminSchema.omit({ password: true }).partial();

export const updatePasswordSchema = z.object({
  password: z
    .string()
    .min(8, "密码至少 8 位")
    .regex(/[A-Z]/, "密码至少包含一个大写字母")
    .regex(/[a-z]/, "密码至少包含一个小写字母")
    .regex(/[0-9]/, "密码至少包含一个数字"),
});
