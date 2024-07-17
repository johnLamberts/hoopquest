import ResponseT from "@/types/response.interface";
import { NextFunction, Request, Response } from "express";

class AuthService {
  static async signup(
    req: Request,
    res: ResponseT<Response<null>>,
    next: NextFunction
  ) {}
}
