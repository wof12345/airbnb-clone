import mongoose from "mongoose";

let isConnected = false;

export async function connectDB() {
  if (isConnected) return;

  const uri = process.env.MONGODB_URI as string;

  if (!uri) throw new Error("MONGODB_URI not set in env");

  mongoose.set("strictQuery", true);
  await mongoose.connect(uri, {
    dbName: process.env.MONGODB_DB || "next_app",
  });

  isConnected = true;
  console.log("✅ MongoDB connected");
}
