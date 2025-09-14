// api/index.ts (Vercel serverless function)
import dotenv from "dotenv";
import serverless from "serverless-http";
import { connectDB } from "../config/db";
import app from "../app";

dotenv.config();

let isConnected = false;

async function setup() {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }
}

const handler = serverless(app);

export default async function (req, res) {
  await setup(); // ensure DB is connected once
  return handler(req, res);
}
