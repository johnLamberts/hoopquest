import ResponseT from "@/types/response.interface";
import customResponse from "../../utils/custom-response";
import express, { Request, Response } from "express";
import AuthController from "./auth.controller";
import { signupUserValidation } from "@/middlewares/validation/authValidation";

const router = express.Router();

router.post("/signup", signupUserValidation, AuthController.signup);

export const AuthRoute = router;
