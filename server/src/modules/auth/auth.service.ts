import ResponseT from "@/types/response.interface";
import { NextFunction, Request, Response } from "express";
import User from "./user.model";
import createHttpError, { InternalServerError } from "http-errors";
import customResponse from "@/utils/custom-response";
import { cloudinary } from "@/middlewares/file-upload";
import { deleteFile } from "@/utils";
class AuthService {
  static async signup(
    req: Request,
    res: Response<ResponseT<null>>,
    next: NextFunction
  ) {
    const {
      email,
      password,
      firstName,
      lastName,
      confirmPassword,
      profileImg,
      cloudinary_id,
    } = req.body;

    try {
      const isEmailExit = await User.findOne({
        email,
      });

      if (isEmailExit) {
        if (req.file?.filename) {
          const localFilePath = `${process.env.PWD}/public/uploads/users/${req.file?.filename}`;
          deleteFile(localFilePath);

          console.log(`[authService]: ${localFilePath}`);
        }
        return next(
          createHttpError(
            409,
            `Email address ${email} is already exists, please pick a different one.`
          )
        );
      }

      let cloudinaryResult;

      if (req.file?.filename) {
        const localFilePath = `${process.env.PWD}/public/uploads/users/${req.file?.filename}`;

        cloudinaryResult = await cloudinary.uploader.upload(localFilePath, {
          folder: "users",
        });

        deleteFile(localFilePath);

        console.log(`[authService]: ${localFilePath}`);
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
        profileImg: cloudinaryResult?.secure_url,
        cloudinary_id: cloudinaryResult?.public_id,
      });

      const user = await newUser.save();

      return res.status(201).json(
        customResponse<any>({
          data: user,
          success: true,
          error: false,
          message: "Auth signup is success. an Email with verficiation",
          statusCode: 201,
        })
      );
    } catch (err) {
      if (req.file?.filename) {
        const localFilePath = `${process.env.PWD}/public/uploads/users/${req.file.filename}`;

        deleteFile(localFilePath);
      }
      return next(InternalServerError);
    }
  }
}

export default AuthService;
