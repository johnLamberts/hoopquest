import ResponseT from "@/types/response.interface";
import customResponse from "../../utils/custom-response";
import express, { Request, Response } from "express";
import AuthController from "./auth.controller";
import {
  loginUserValidation,
  signupUserValidation,
  verifyUserEmailValidation,
} from "@/middlewares/validation/authValidation";
import { uploadImage } from "@/middlewares/file-upload";

const router = express.Router();

router.post(
  "/signup",
  uploadImage.single("profileImg"),
  signupUserValidation,
  AuthController.signup
);

router.post("/login", loginUserValidation, AuthController.login);

router.get(
  "/verify_email/:userId/:token",
  verifyUserEmailValidation,
  AuthController.verifyEmailController
);

export const AuthRoute = router;
