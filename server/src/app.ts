import colors from "colors.ts";
import bootstrap from "./bootstrap";
import express, { Application } from "express";
import dotenv from "dotenv";

colors?.enable();

dotenv.config({
  path:
    process.env.NODE_ENV === "production"
      ? ".env.production"
      : ".env.development",
});

const app: Application = express();

bootstrap(app);
