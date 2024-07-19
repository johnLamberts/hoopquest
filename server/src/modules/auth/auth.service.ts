import ResponseT from "@/types/response.interface";
import { NextFunction, Request, Response } from "express";
import createHttpError, { InternalServerError } from "http-errors";
import customResponse from "@/utils/custom-response";
import { cloudinary } from "@/middlewares/file-upload";
import { deleteFile } from "@/utils";
import User, { IUserDocument } from "../shared/models/user.model";
import Token, { TokenInterfaceDocument } from "../shared/models/token.model";
import { SignOptions } from "jsonwebtoken";
import { environmentConfig } from "@/configs";
import { sendEmailVerificationEmail } from "@/utils/send-email";
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

      const newUser = new User({
        email,
        password,
        firstName,
        lastName,
        confirmPassword,
        isVerified: false,
        profileImg: cloudinaryResult?.secure_url,
        cloudinary_id: cloudinaryResult?.public_id,
      });

      const user = await newUser.save();

      let token = await new Token({
        userId: user._id,
      });

      const payload = {
        userId: user._id,
      };

      const accessTokenSecretKey = environmentConfig.ACCESS_TOKEN_SECRET_KEY;

      const accessTokenOptions: SignOptions = {
        expiresIn: environmentConfig.ACCESS_TOKEN_KEY_EXPIRE_TIME,
        issuer: environmentConfig.JWT_ISSUER,
        audience: String(user._id),
      };

      const refreshTokenSecretKey = environmentConfig.REFRESH_TOKEN_SECRET_KEY;
      const refreshTokenJwtOptions: SignOptions = {
        expiresIn: environmentConfig.REFRESH_TOKEN_KEY_EXPIRE_TIME,
        issuer: environmentConfig.JWT_ISSUER,
        audience: String(user._id),
      };

      // Generate and set verify email token
      const generatedAccessToken = await token.generateToken(
        payload,
        accessTokenSecretKey,
        accessTokenOptions
      );
      const generatedRefreshToken = await token.generateToken(
        payload,
        accessTokenSecretKey,
        accessTokenOptions
      );

      // Save the updated token
      token.refreshToken = generatedRefreshToken;
      token.accessToken = generatedAccessToken;
      token = await token.save();

      const verifyEmailLink = `${environmentConfig.WEBSITE_URL}/verify_email?id=${user._id}&token=${token.refreshToken}`;

      await sendEmailVerificationEmail(
        email,
        `${firstName} ${lastName}`,
        verifyEmailLink
      );
      const data = {
        user: {
          accessToken: token.accessToken,
          refreshToken: token.refreshToken,
          verifyEmailLink,
        },
      };
      return res.status(201).json(
        customResponse<any>({
          data,
          success: true,
          error: false,
          message: `Auth Signup is success. An Email with Verification link has been sent to your account ${user.email} Please Verify Your Email first or use the email verification lik which is been send with the response body to verfiy your email`,
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

  static async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
  }

  static async verifyEmail(req: Request, res: Response, next: NextFunction) {
    try {
      // console.log(req.params.userId, req.params.token);
      const user = (await User.findById(req.params.userId)) as IUserDocument;

      if (!user) {
        return next(
          createHttpError(
            400,
            `Email verification token is invalid or has expired. Please click on resend for verify your email.`
          )
        );
      }

      // user is already verified
      if (user.isVerified && user.status === "active") {
        return res.status(200).send(
          customResponse({
            data: null,
            success: true,
            error: false,
            message: `Your email has already been verified.`,
            statusCode: 200,
          })
        );
      }

      const emailToken = (await Token.findOne({
        userId: user._id,
        refreshToken: req.params.token,
      })) as TokenInterfaceDocument;

      console.log(`EMAIL TOKEN: ${emailToken}`.bg_black.white);
      if (!emailToken) {
        return next(
          createHttpError(
            400,
            "Email verification token is invalid or has expired."
          )
        );
      }

      user.isVerified = true;
      user.status = "active";
      await user.save();

      // await emailToken.delete();
      await emailToken.deleteOne({ userId: user._id });

      console.log(emailToken);

      return res.status(200).json(
        customResponse({
          data: null,
          success: true,
          error: false,
          message:
            "Your account has been successfully verified . Please Login. ",
          statusCode: 200,
        })
      );
    } catch (error) {
      console.log(`[VerifyEmailErorr]: ${error}`);
      return next(InternalServerError);
    }
  }
}

export default AuthService;
