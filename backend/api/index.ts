// api/index.ts
import dotenv from "dotenv";
import serverless from "serverless-http";

import app from "../app";

dotenv.config();

const handler = serverless(app);

export default function vercelHandler(req, res) {
  console.log("Handler called", req.url);

  return handler(req, res);
}
