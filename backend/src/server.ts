import dotenv from "dotenv";
import { connectDB } from "./config/db.ts";
import app from "./app.ts";

dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
