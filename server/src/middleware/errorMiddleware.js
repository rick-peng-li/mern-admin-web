import { ZodError } from "zod";

import { AppError } from "../utils/AppError.js";

export const notFoundHandler = (_req, _res, next) => {
  next(new AppError("请求的资源不存在", 404));
};

export const errorHandler = (error, _req, res, _next) => {
  if (error instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "请求参数校验失败",
      details: error.flatten(),
    });
  }

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
      details: error.details,
    });
  }

  return res.status(500).json({
    success: false,
    message: "服务端发生未处理异常",
  });
};
