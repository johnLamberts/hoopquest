import { NextFunction, Response, Request } from "express";
import AuthService from "./auth.service";

class AuthController {
  static signup(req: Request, res: Response, next: NextFunction) {
    return AuthService.signup(req, res, next);
  }
}

export default AuthController;
