
import mongoose from "mongoose";
import { env } from "./env.js";
import logger from "./logger.js";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(env.MONGO_URL);
    logger.info(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    logger.error("Error connecting to MongoDB:", error.message);
    logger.warn("Continuing server without MongoDB connection for now.");
  }
};
