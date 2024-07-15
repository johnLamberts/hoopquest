import { Application } from "express";
import { connectDB, environmentConfig } from "@/configs";
import app from "./app";
import console from "console";

const startServer = async () => {
  try {
    const conn = await connectDB(
      process.env.NODE_ENV === "test"
        ? environmentConfig.TEST_ENV_DATABASE_URI
        : environmentConfig.DATABASE_URI,
      process.env.NODE_ENV === "test"
        ? environmentConfig.TEST_ENV_DATABASE_NAME
        : environmentConfig.DATABASE_NAME
    );
    const PORT: number = parseInt(`${process.env.PORT}`, 10) || 8667;

    app.listen(PORT, () =>
      console.log(
        `Server is running at http://localhost:${PORT}`.bg_green.green
      )
    );

    console.log(
      `MongoDB database connection established successfully to... ${
        process.env.NODE_ENV === "test"
          ? environmentConfig.TEST_ENV_DATABASE_NAME
          : environmentConfig.DATABASE_NAME
      }`.cyan.underline
    );
  } catch (err) {
    console.error(err);

    process.exit(1);
  }
};

startServer();

export default app;
