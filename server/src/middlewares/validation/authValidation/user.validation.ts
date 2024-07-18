import { NextFunction, Request, RequestHandler, Response } from "express";
import validator from "../validator";
import userSchemaValidation from "./userSchema.validation";

export const signupUserValidation: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => validator(userSchemaValidation.signupUser, req.body, next);
