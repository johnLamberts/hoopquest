import { Request } from "express";
import { Document } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role?: string;
  profileImage: string;
  status?: string;
  isVerified?: boolean;
  isDeleted?: boolean;
  createdAt: string;
  updatedAt?: string;
  emailVerificationLinkToken?: string;
  token?: string;
  accessToken?: string;
  refreshToken?: string;
  confirmationCode?: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: string;
  userId?: string;
}

export interface IRequestUser extends Request {
  user: IUser;
}

export interface IAuthRequest extends Request {
  headers: { authorization?: string; Authorization?: string };
  cookies: { authToken?: string; accessToken?: string; refreshToken?: string };

  user?: IUser;
}
