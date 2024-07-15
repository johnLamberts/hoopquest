import AppError from "@/utils/app-error";
import { NextFunction, Request, Response } from "express";

const errorHandlingMiddleware = (
  error: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(error);

  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";

  if (error.name == "MongoServerError") {
    const field = Object.keys(error.keyValue)[0];

    if (field === "mobile") {
      res.status(409).json({
        status: "error",
        message: "Mobile already exists",
      });
    } else {
      res.status(409).json({
        status: "error",
        message: "Duplicate key error",
        error: error.keyValue,
      });
    }
  } else if (error.statusCode === 404) {
    res.status(error.statusCode).json({
      errors: error.status,
      message: error.message,
    });
  } else {
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });
  }
};

export default errorHandlingMiddleware;
