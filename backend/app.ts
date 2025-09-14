import express from "express";
import cors from "cors";
import serviceRoutes from "./routes/services";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/services", serviceRoutes);

app.get("/", (req, res) => {
  res.send("Server Running...");
});

export default app;
