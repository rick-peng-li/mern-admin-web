import { Admin } from "../models/Admin.js";
import {
  createResource,
  deleteResource,
  getResourceById,
  listResources,
  updateResource,
} from "../services/resourceService.js";
import { AppError } from "../utils/AppError.js";

export const listAdmins = async (req, res) => {
  const data = await listResources({
    model: Admin,
    searchFields: ["email", "firstName", "lastName"],
    page: req.query.page,
    limit: req.query.limit,
    search: req.query.search,
  });

  const items = data.items.map((item) => ({
    id: item.id,
    email: item.email,
    firstName: item.firstName,
    lastName: item.lastName,
    status: item.status,
    avatarUrl: item.avatarUrl,
    lastLoginAt: item.lastLoginAt,
    createdAt: item.createdAt,
  }));

  return res.json({
    success: true,
    data: items,
    meta: data.pagination,
  });
};

export const createAdmin = async (req, res) => {
  const existed = await Admin.findOne({ email: req.body.email });
  if (existed) {
    throw new AppError("该邮箱已存在", 409);
  }

  const password = await Admin.hashPassword(req.body.password);
  const admin = await createResource(Admin, {
    ...req.body,
    password,
  });

  return res.status(201).json({
    success: true,
    message: "管理员创建成功",
    data: {
      id: admin.id,
      email: admin.email,
      firstName: admin.firstName,
      lastName: admin.lastName,
      status: admin.status,
      avatarUrl: admin.avatarUrl,
      createdAt: admin.createdAt,
    },
  });
};

export const getAdmin = async (req, res) => {
  const admin = await getResourceById(Admin, req.params.id);

  return res.json({
    success: true,
    data: {
      id: admin.id,
      email: admin.email,
      firstName: admin.firstName,
      lastName: admin.lastName,
      status: admin.status,
      avatarUrl: admin.avatarUrl,
      lastLoginAt: admin.lastLoginAt,
      createdAt: admin.createdAt,
    },
  });
};

export const updateAdmin = async (req, res) => {
  if (req.body.email) {
    const existed = await Admin.findOne({ email: req.body.email });
    if (existed && existed.id !== req.params.id) {
      throw new AppError("该邮箱已存在", 409);
    }
  }

  const admin = await updateResource(Admin, req.params.id, req.body);

  return res.json({
    success: true,
    message: "管理员更新成功",
    data: {
      id: admin.id,
      email: admin.email,
      firstName: admin.firstName,
      lastName: admin.lastName,
      status: admin.status,
      avatarUrl: admin.avatarUrl,
      lastLoginAt: admin.lastLoginAt,
      createdAt: admin.createdAt,
    },
  });
};

export const updateAdminPassword = async (req, res) => {
  const password = await Admin.hashPassword(req.body.password);
  const admin = await updateResource(Admin, req.params.id, { password });

  return res.json({
    success: true,
    message: "管理员密码更新成功",
    data: {
      id: admin.id,
      email: admin.email,
      firstName: admin.firstName,
      lastName: admin.lastName,
    },
  });
};

export const deleteAdmin = async (req, res) => {
  if (req.user.id === req.params.id) {
    throw new AppError("不能删除当前登录账号", 400);
  }

  await deleteResource(Admin, req.params.id);

  return res.json({
    success: true,
    message: "管理员删除成功",
  });
};
