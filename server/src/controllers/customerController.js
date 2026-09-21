import { Customer } from "../models/Customer.js";
import {
  createResource,
  deleteResource,
  getResourceById,
  listResources,
  updateResource,
} from "../services/resourceService.js";

export const listCustomers = async (req, res) => {
  const data = await listResources({
    model: Customer,
    searchFields: ["company", "firstName", "lastName", "email", "phone"],
    page: req.query.page,
    limit: req.query.limit,
    search: req.query.search,
  });

  return res.json({
    success: true,
    data: data.items,
    meta: data.pagination,
  });
};

export const createCustomer = async (req, res) => {
  const item = await createResource(Customer, req.body);

  return res.status(201).json({
    success: true,
    message: "客户创建成功",
    data: item,
  });
};

export const getCustomer = async (req, res) => {
  const item = await getResourceById(Customer, req.params.id);

  return res.json({
    success: true,
    data: item,
  });
};

export const updateCustomer = async (req, res) => {
  const item = await updateResource(Customer, req.params.id, req.body);

  return res.json({
    success: true,
    message: "客户更新成功",
    data: item,
  });
};

export const deleteCustomer = async (req, res) => {
  await deleteResource(Customer, req.params.id);

  return res.json({
    success: true,
    message: "客户删除成功",
  });
};
