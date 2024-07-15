import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI as string, {
      dbName: process.env.DATABASE_NAME,
    });

    console.log(`Database connected succesfully`.italic.cyan);
  } catch (err) {
    console.error(err);

    process.exit(1);
  }
};

export default connectDB;
