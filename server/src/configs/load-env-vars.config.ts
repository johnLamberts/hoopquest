import dotenv from "dotenv";

dotenv.config({
  path:
    process.env.NODE_ENV === "production"
      ? ".env.production"
      : ".env.development",
});

export const environmentConfig = {
  PORT: process.env.PORT,
  JWT_KEY: process.env.JWT_KEY,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
  DATABASE_URI: process.env.DATABASE_URI as string,
  DATABASE_NAME: process.env.DATABASE_NAME,
  TEST_ENV_DATABASE_URI: process.env.TEST_ENV_DATABASE_URI as string,
  TEST_ENV_DATABASE_NAME: process.env.TEST_ENV_DATABASE_NAME,

  CLOUDINARY_NAME: process.env.CLOUDINARY_NAME as string,
  CLOUDINARY_SECRET_KEY: process.env.CLOUDINARY_SECRET_KEY as string,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY as string,

  JWT_ISSUER: process.env.JWT_ISSUER as string,

  ACCESS_TOKEN_SECRET_KEY: process.env.ACCESS_TOKEN_SECRET_KEY as string,
  REFRESH_TOKEN_SECRET_KEY: process.env.REFRESH_TOKEN_SECRET_KEY as string,
  ACCESS_TOKEN_KEY_EXPIRE_TIME: process.env
    .ACCESS_TOKEN_KEY_EXPIRE_TIME as string,
  REFRESH_TOKEN_KEY_EXPIRE_TIME: process.env
    .REFRESH_TOKEN_KEY_EXPIRE_TIME as string,

  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY as string,
  ADMIN_SENDGRID_EMAIL: process.env.ADMIN_SENDGRID_EMAIL as string,

  WEBSITE_URL: process.env.WEBSITE_URL as string,
};

// PORT=8001
// JWT_KEY="(!@#*!@#ASJDLASLCX>ZCK123123/12k3o123sinicaakjsdkaddumpasldlangajksdjkasdcrushq)";
// DATABASE_URI=mongodb+srv://hoopmate-admin:hoopmate-admin-123@cluster0.w6nj1yy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
// ORIGIN=http://localhost:5173
// DATABASE_NAME=hoop-quest
