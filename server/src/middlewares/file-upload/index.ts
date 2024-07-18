import Cloudinary from "cloudinary";

import { environmentConfig } from "@/configs";

export const cloudinary = Cloudinary.v2;

cloudinary.config({
  cloud_name: environmentConfig.CLOUDINARY_NAME,
  api_key: environmentConfig.CLOUDINARY_APY_KEY,
  api_secret: environmentConfig.CLOUDINARY_SECRET_KEY,
});

export default cloudinary;
