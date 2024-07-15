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
  DATABASE_URI: process.env.DATABASE_URI as string,
  DATABASE_NAME: process.env.DATABASE_NAME,
  TEST_ENV_DATABASE_URI: process.env.TEST_ENV_DATABASE_URI as string,
  TEST_ENV_DATABASE_NAME: process.env.TEST_ENV_DATABASE_NAME,
};

// PORT=8001
// JWT_KEY="(!@#*!@#ASJDLASLCX>ZCK123123/12k3o123sinicaakjsdkaddumpasldlangajksdjkasdcrushq)";
// DATABASE_URI=mongodb+srv://hoopmate-admin:hoopmate-admin-123@cluster0.w6nj1yy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
// ORIGIN=http://localhost:5173
// DATABASE_NAME=hoop-quest
