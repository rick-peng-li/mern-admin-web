import { AppError } from "../utils/AppError.js";
import { verifyAccessToken } from "../utils/token.js";
import { Admin } from "../models/Admin.js";

export const requireAuth = async (req, _res, next) => {
  try {
    const authorization = req.headers.authorization || "";
    const token = authorization.startsWith("Bearer ")
      ? authorization.replace("Bearer ", "")
      : null;

    if (!token) {
      throw new AppError("未提供有效的登录凭证", 401);
    }

    const payload = verifyAccessToken(token);
    const admin = await Admin.findById(payload.sub).select("-password");

    if (!admin) {
      throw new AppError("登录状态无效，请重新登录", 401);
    }

    req.user = admin;
    next();
  } catch (error) {
    next(new AppError("登录状态已失效，请重新登录", 401));
  }
};
