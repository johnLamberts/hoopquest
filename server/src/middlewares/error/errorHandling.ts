import ErrorReponse from "@/types/error.interface";
import AppError from "@/utils/app-error";
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

// const errorHandlingMiddleware = (
//   error: AppError,
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   console.log(error);

//   error.statusCode = error.statusCode || 500;
//   error.status = error.status || "error";

//   if (error.name == "MongoServerError") {
//     const field = Object.keys(error.keyValue)[0];

//     if (field === "mobile") {
//       res.status(409).json({
//         status: "error",
//         message: "Mobile already exists",
//       });
//     } else {
//       res.status(409).json({
//         status: "error",
//         message: "Duplicate key error",
//         error: error.keyValue,
//       });
//     }
//   } else if (error.statusCode === 404) {
//     res.status(error.statusCode).json({
//       errors: error.status,
//       message: error.message,
//     });
//   } else {
//     res.status(error.statusCode).json({
//       status: error.status,
//       message: error.message,
//     });
//   }
// };

const errorHandlingMiddleware: ErrorRequestHandler = (
  error,
  req: Request,
  res: Response<ErrorReponse>,
  next: NextFunction
) => {
  const statusCode = error.statusCode || 500;
  res?.status(statusCode).send({
    data: null,
    success: false,
    error: true,
    message: error.message || "Internal Server Error",
    statusCode: statusCode,
    stack: process.env.NODE_ENV === "production" ? "" : error.stack,
  });
};

export default errorHandlingMiddleware;
