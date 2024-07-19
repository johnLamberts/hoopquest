import { NextFunction, Response, Request } from "express";
import AuthService from "./auth.service";

class AuthController {
  static signup(req: Request, res: Response, next: NextFunction) {
    return AuthService.signup(req, res, next);
  }

  static login(req: Request, res: Response, next: NextFunction) {
    return AuthService.login(req, res, next);
  }

  static verifyEmailController(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    return AuthService.verifyEmail(req, res, next);
  }
}

export default AuthController;
