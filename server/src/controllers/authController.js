import { Admin } from "../models/Admin.js";
import { AppError } from "../utils/AppError.js";
import { signAccessToken } from "../utils/token.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email }).select("+password");

  if (!admin) {
    throw new AppError("账号或密码错误", 401);
  }

  if (admin.status !== "active") {
    throw new AppError("当前账号已被禁用", 403);
  }

  const passwordMatched = await admin.comparePassword(password);

  if (!passwordMatched) {
    throw new AppError("账号或密码错误", 401);
  }

  admin.lastLoginAt = new Date();
  await admin.save();

  const token = signAccessToken({
    sub: admin.id,
    email: admin.email,
  });

  return res.json({
    success: true,
    message: "登录成功",
    data: {
      token,
      user: {
        id: admin.id,
        email: admin.email,
        firstName: admin.firstName,
        lastName: admin.lastName,
        status: admin.status,
        avatarUrl: admin.avatarUrl,
      },
    },
  });
};

export const getCurrentUser = async (req, res) => {
  return res.json({
    success: true,
    data: req.user,
  });
};

export const logout = async (_req, res) => {
  return res.json({
    success: true,
    message: "退出登录成功",
  });
};
