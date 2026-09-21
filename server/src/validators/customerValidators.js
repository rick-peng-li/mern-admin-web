import { z } from "zod";

export const customerSchema = z.object({
  company: z.string().trim().min(1, "请输入公司名称"),
  firstName: z.string().trim().min(1, "请输入联系人名"),
  lastName: z.string().trim().min(1, "请输入联系人姓"),
  email: z.email("请输入有效邮箱"),
  phone: z.string().trim().min(1, "请输入联系电话"),
  website: z.string().trim().optional().default(""),
  country: z.string().trim().optional().default(""),
  address: z.string().trim().optional().default(""),
  bankAccount: z.string().trim().optional().default(""),
  companyRegNumber: z.string().trim().optional().default(""),
  companyTaxNumber: z.string().trim().optional().default(""),
  companyTaxId: z.string().trim().optional().default(""),
  notes: z.string().trim().optional().default(""),
  status: z.enum(["active", "inactive"]).optional().default("active"),
});

export const createCustomerSchema = customerSchema;
export const updateCustomerSchema = customerSchema.partial();
