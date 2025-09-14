import express from "express";
import {
  getServices,
  createService,
  getServiceById,
} from "../controllers/services.ts";

const router = express.Router();

router.get("/", getServices);
router.post("/", createService);
router.get("/:id", getServiceById);

export default router;
