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
import { ObjectId } from "mongoose";
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

    console.log(email, password);
    try {
      const user = (await User.findOne({ email })
        .select("+password")
        .exec()) as IUserDocument;

      // 401 unauthorized
      if (!user) {
        return next(createHttpError(401, "Auth failed (Invalid credentials)"));
      }

      // Compare password
      const isPasswordCorrect = await user.comparePassword(password);

      if (!isPasswordCorrect)
        return next(createHttpError(401, "Invalid Password."));

      let token = (await Token.findOne({
        userId: user._id,
      })) as TokenInterfaceDocument;

      console.log(token);

      if (!token) {
        token = await new Token({ userId: user._id });
        token = await token.save();
      }

      const generatedAccessToken = await token.generateToken(
        {
          userId: user._id as ObjectId,
        },
        environmentConfig.ACCESS_TOKEN_SECRET_KEY,
        {
          expiresIn: "1h",
          issuer: environmentConfig.JWT_ISSUER,
          audience: String(user._id),
        }
      );

      const generatedRefreshToken = await token.generateToken(
        {
          userId: user._id as ObjectId,
        },
        environmentConfig.REFRESH_TOKEN_SECRET_KEY,
        {
          expiresIn: "5h",
          issuer: environmentConfig.JWT_ISSUER,
          audience: String(user._id),
        }
      );

      console.log(generatedAccessToken, generatedRefreshToken);

      // Save the updated Token
      token.refreshToken = generatedRefreshToken;
      token.accessToken = generatedAccessToken;
      token = await token.save();

      // check user is verified or not
      if (!user.isVerified || user.status !== "active") {
        const verifyEmailLink = `${environmentConfig.WEBSITE_URL}/verify-email?id=${user._id}&token=${token.refreshToken}`;

        const responseData = {
          accessToken: token.accessToken,
          refreshToken: token.refreshToken,
          verifyEmailLink,
        };

        return res.status(401).json(
          customResponse<typeof responseData>({
            data: responseData,
            success: false,
            error: true,
            message: `Your Email has not been verified. An Email with Verification link has been sent to your account ${user.email} Please Verify Your Email first or use the email verification lik which is been send with the response to verfiy your email`,
            statusCode: 401,
          })
        );
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      // const { password: pass, confirmPassword: confPass, isVerified, status } = user;

      const data = {
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
        user: user,
      };

      // Set cookies
      res.cookie("accessToken", token.accessToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // one days
        secure: process.env.NODE_ENV === "production",
      });

      res.cookie("refreshToken", token.refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        secure: process.env.NODE_ENV === "production",
      });

      // Set refreshToken' AND accessToken IN cookies
      return res.status(200).json(
        customResponse<typeof data>({
          success: true,
          error: false,
          message: "Auth logged in successful.",
          statusCode: 200,
          data,
        })
      );
    } catch (err) {
      console.log(`[LoginError]: ${err}`.bg_white.red);
      return next(err);
    }
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
