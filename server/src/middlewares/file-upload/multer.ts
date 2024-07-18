import getImageExtension from "@/utils/get-image-extension";
import { randomUUID } from "crypto";
import { Request } from "express";
import createHttpError from "http-errors";
import multer from "multer";
import fs from "fs";
import path from "path";

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, fillename: string) => void;

const ensureDirectoryExists = (filePath: string): void => {
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(filePath, { recursive: true });
  }
};

export const fileStorage = multer.diskStorage({
  destination: (
    request: Request,
    file: Express.Multer.File,
    callback: DestinationCallback
  ): void => {
    const fileName = request.originalUrl.includes("auth")
      ? "users"
      : "products";

    // callback(null, `public/uploads/${fileName}`);

    const uploadPath = path.resolve(
      process?.env?.PWD as string,
      "public/uploads",
      fileName
    );

    ensureDirectoryExists(uploadPath);

    callback(null, uploadPath);
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
        ""
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
