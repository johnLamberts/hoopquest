import Cloudinary from "cloudinary";

import { environmentConfig } from "@/configs";

import dotenv from "dotenv";

dotenv.config();
export const cloudinary = Cloudinary.v2;

cloudinary.config({
  cloud_name: environmentConfig.CLOUDINARY_NAME,
  api_key: environmentConfig.CLOUDINARY_API_KEY,
  api_secret: environmentConfig.CLOUDINARY_SECRET_KEY,
});

export default cloudinary;
