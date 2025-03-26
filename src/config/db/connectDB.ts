import mongoose from "mongoose";

const NEXT_PUBLIC_MONGODB_URI: string =
  process.env.NEXT_PUBLIC_MONGODB_URI || "";

if (!NEXT_PUBLIC_MONGODB_URI) {
  throw new Error("❌ MONGODB_URL is not defined in environment variables");
}

const connectDB = async (): Promise<void> => {
  if (mongoose.connection.readyState >= 1) return;

  try {
    await mongoose.connect(NEXT_PUBLIC_MONGODB_URI);
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  }
};

export default connectDB;
