import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    const dbUri = process.env.MONGO_URI || "mongodb://localhost:27017/mydb";
    await mongoose.connect(dbUri); // No need to pass useNewUrlParser or useUnifiedTopology
    console.log("Database connected");
  } catch (error) {
    console.error("Database connection failed", error);
    process.exit(1);
  }
};

export default connectDB;
