import ResponseT from "@/types/response.interface";
import customResponse from "../../utils/custom-response";
import express, { Request, Response } from "express";

const router = express.Router();

router.get("/", (req: Request, res: Response<ResponseT<null>>) => {
  const message = "Welcome to HoopQuest API 👋🌎";

  res.send(
    customResponse({
      data: null,
      success: true,
      error: false,
      message,
      statusCode: 200,
    })
  );
});

export const HomeRoute = router;
