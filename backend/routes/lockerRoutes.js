import express from "express";
import { createLocker, getAvailableLocker } from "../controllers/lockerController.js";

const router = express.Router();

router.post("/create", createLocker);
router.get("/available", getAvailableLocker)

export default router;
