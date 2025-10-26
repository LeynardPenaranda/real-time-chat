import mongoose from "mongoose";

export const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL!);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};
