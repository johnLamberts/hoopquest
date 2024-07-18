import colors from "colors.ts";
import express, { Application, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import router from "./modules/route";
import notFoundMiddleware from "./middlewares/error/notFound";
import errorHandlingMiddleware from "./middlewares/error/errorHandling";

colors?.enable();

// dotenv.config({
//   path:
//     process.env.NODE_ENV === "production"
//       ? ".env.production"
//       : ".env.development"
//       ? ".env.development"
//       : ".env.test",
// });

dotenv.config();

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
app.use(notFoundMiddleware);

export default app;
