import { Product } from "../models/Product.js";
import {
  createResource,
  deleteResource,
  getResourceById,
  listResources,
  updateResource,
} from "../services/resourceService.js";

export const listProducts = async (req, res) => {
  const data = await listResources({
    model: Product,
    searchFields: ["productName", "sku", "description", "status"],
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

export const createProduct = async (req, res) => {
  const item = await createResource(Product, req.body);

  return res.status(201).json({
    success: true,
    message: "产品创建成功",
    data: item,
  });
};

export const getProduct = async (req, res) => {
  const item = await getResourceById(Product, req.params.id);

  return res.json({
    success: true,
    data: item,
  });
};

export const updateProduct = async (req, res) => {
  const item = await updateResource(Product, req.params.id, req.body);

  return res.json({
    success: true,
    message: "产品更新成功",
    data: item,
  });
};

export const deleteProduct = async (req, res) => {
  await deleteResource(Product, req.params.id);

  return res.json({
    success: true,
    message: "产品删除成功",
  });
};
