import express from "express";

import {
  getHumans,
  getHumanById,
  createHuman,
  updateHuman,
  deleteHuman
} from "../controllers/HumanController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.get("/", auth, getHumans);
router.get("/:id", auth, getHumanById);
router.post("/", auth, createHuman);
router.put("/:id", auth, updateHuman);
router.delete("/:id", auth, deleteHuman);

export default router;