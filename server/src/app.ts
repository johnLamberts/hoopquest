import colors from "colors.ts";
import bootstrap from "./bootstrap";
import express, { Application, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import errorHandlingMiddleware from "@/middlewares/errorHandling";
import AppError from "./utils/app-error";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import router from "./modules/route";
import { StudentRoute } from "./modules/students/student.route";

colors?.enable();

dotenv.config({
  path:
    process.env.NODE_ENV === "production"
      ? ".env.production"
      : ".env.development",
});

const app: Application = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// api endpoint
// app.use("/api/v1/", router);
router(app);

app.use(errorHandlingMiddleware);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    statusCode: 404,
    status: "error-not-found",
    message: "Not found",
  });
  next(new AppError("Not found", 404));
});

bootstrap(app);
