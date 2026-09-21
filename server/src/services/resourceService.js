import mongoose from "mongoose";

import { AppError } from "../utils/AppError.js";

const buildSearchFilter = (search, fields) => {
  if (!search) {
    return {};
  }

  return {
    $or: fields.map((field) => ({
      [field]: { $regex: search, $options: "i" },
    })),
  };
};

export const listResources = async ({
  model,
  searchFields,
  page = 1,
  limit = 10,
  search = "",
  sort = { createdAt: -1 },
}) => {
  const normalizedPage = Math.max(1, Number(page) || 1);
  const normalizedLimit = Math.min(50, Math.max(1, Number(limit) || 10));
  const filter = buildSearchFilter(search.trim(), searchFields);
  const skip = (normalizedPage - 1) * normalizedLimit;

  const [items, total] = await Promise.all([
    model.find(filter).sort(sort).skip(skip).limit(normalizedLimit),
    model.countDocuments(filter),
  ]);

  return {
    items,
    pagination: {
      page: normalizedPage,
      limit: normalizedLimit,
      total,
      totalPages: Math.ceil(total / normalizedLimit) || 1,
    },
  };
};

export const getResourceById = async (model, id, select = "") => {
  if (!mongoose.isValidObjectId(id)) {
    throw new AppError("记录 ID 不合法", 400);
  }

  const query = model.findById(id);
  if (select) {
    query.select(select);
  }

  const item = await query;

  if (!item) {
    throw new AppError("记录不存在", 404);
  }

  return item;
};

export const createResource = (model, payload) => model.create(payload);

export const updateResource = async (model, id, payload, options = {}) => {
  if (!mongoose.isValidObjectId(id)) {
    throw new AppError("记录 ID 不合法", 400);
  }

  const item = await model.findByIdAndUpdate(id, payload, {
    returnDocument: "after",
    runValidators: true,
    ...options,
  });

  if (!item) {
    throw new AppError("记录不存在", 404);
  }

  return item;
};

export const deleteResource = async (model, id) => {
  if (!mongoose.isValidObjectId(id)) {
    throw new AppError("记录 ID 不合法", 400);
  }

  const item = await model.findByIdAndDelete(id);

  if (!item) {
    throw new AppError("记录不存在", 404);
  }

  return item;
};
