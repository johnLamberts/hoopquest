import { Application } from "express";
import connectDB from "@/database/connection";

const bootstrap = async (app: Application) => {
  try {
    const PORT: number = parseInt(`${process.env.PORT}`, 10) || 8667;

    app.listen(PORT, () =>
      console.log(
        `Server is running at http://localhost:${PORT}`.magenta.underline
      )
    );

    await connectDB();
  } catch (err) {
    console.error(err);

    process.exit(1);
  }
};

export default bootstrap;
