import { NextFunction, Request, RequestHandler, Response } from "express";
import validator from "../validator";
import userSchemaValidation from "./userSchema.validation";

export const signupUserValidation: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => validator(userSchemaValidation.signupUser, req.body, next);

export const loginUserValidation: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => validator(userSchemaValidation.loginUser, req.body, next);

export const verifyUserEmailValidation: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return validator(userSchemaValidation.verifyUserEmail, req.params, next);
};
