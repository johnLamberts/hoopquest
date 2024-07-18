import ResponseT from "@/types/response.interface";
import { NextFunction, Request, Response } from "express";
import User from "./user.model";
import createHttpError, { InternalServerError } from "http-errors";
import customResponse from "@/utils/custom-response";
class AuthService {
  static async signup(
    req: Request,
    res: Response<ResponseT<null>>,
    next: NextFunction
  ) {
    const { email, password, firstName, lastName, confirmPassword, gender } =
      req.body;

    try {
      const isEmailExit = await User.findOne({
        email,
      });

      if (isEmailExit) {
        return next(
          createHttpError(
            409,
            `Email address ${email} is already exists, please pick a different one.`
          )
        );
      }

      const data = {
        user: {
          email,
          firstName,
          lastName,
        },
      };

      const newUser = new User({
        email,
        password,
        firstName,
        lastName,
        confirmPassword,
      });

      const user = await newUser.save();

      return res.status(201).json(
        customResponse<any>({
          data,
          success: true,
          error: false,
          message: "Auth signup is success. an Email with verficiation",
          statusCode: 201,
        })
      );
    } catch (err) {
      console.log(err);
      return next(InternalServerError);
    }
  }
}

export default AuthService;
