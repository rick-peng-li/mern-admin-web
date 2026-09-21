import { Lead } from "../models/Lead.js";
import {
  createResource,
  deleteResource,
  getResourceById,
  listResources,
  updateResource,
} from "../services/resourceService.js";

export const listLeads = async (req, res) => {
  const data = await listResources({
    model: Lead,
    searchFields: ["customerName", "email", "phone", "status", "source"],
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

export const createLead = async (req, res) => {
  const item = await createResource(Lead, req.body);

  return res.status(201).json({
    success: true,
    message: "线索创建成功",
    data: item,
  });
};

export const getLead = async (req, res) => {
  const item = await getResourceById(Lead, req.params.id);

  return res.json({
    success: true,
    data: item,
  });
};

export const updateLead = async (req, res) => {
  const item = await updateResource(Lead, req.params.id, req.body);

  return res.json({
    success: true,
    message: "线索更新成功",
    data: item,
  });
};

export const deleteLead = async (req, res) => {
  await deleteResource(Lead, req.params.id);

  return res.json({
    success: true,
    message: "线索删除成功",
  });
};
