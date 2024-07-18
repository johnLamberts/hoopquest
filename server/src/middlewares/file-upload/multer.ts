import getImageExtension from "@/utils/get-image-extension";
import { randomUUID } from "crypto";
import { Request } from "express";
import createHttpError from "http-errors";
import multer from "multer";

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, fillename: string) => void;

export const fileStorage = multer.diskStorage({
  destination: (
    request: Request,
    file: Express.Multer.File,
    callback: DestinationCallback
  ): void => {
    const fileName = request.originalUrl.includes("users")
      ? "users"
      : "products";

    callback(null, `public/uploades/${fileName}`);
  },

  filename: (
    request: Request,
    file: Express.Multer.File,
    callback: FileNameCallback
  ) => {
    if (process?.env?.NODE_ENV && process?.env?.NODE_ENV === "development") {
      console.log(file);
    }

    const imageExtension = getImageExtension(file.mimetype);

    if (!imageExtension) {
      callback(
        createHttpError(422, "Invalid request (File type is not supported)"),
        String(false)
      );

      return;
    }

    callback(null, `${file.fieldname}-${randomUUID()}${imageExtension}`);
  },
});

export const uploadImage = multer({
  storage: fileStorage,
  limits: {
    fileSize: 1024 * 1024 * 18, // accept files up to mgb
  },
});

export const customMulterConfig = multer({
  storage: multer.diskStorage({}),
  limits: {
    fileSize: 1024 * 1024 * 10, // accept files up 10 mgb
  },
  fileFilter: (
    request: Request,
    file: Express.Multer.File,
    callback: multer.FileFilterCallback
  ) => {
    if (!getImageExtension(file.mimetype)) {
      // @ts-ignore
      callback(
        createHttpError(
          422,
          "Invalid request (File type is not supported)"
        ) as any,
        false
      );
      return;
    }
    callback(null, true);
  },
});

export default { uploadImage };