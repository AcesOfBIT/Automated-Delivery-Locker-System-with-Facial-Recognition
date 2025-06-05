import express from "express";
import { createLocker, getAvailableLocker } from "../controllers/lockerController.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router();

router.post("/create",isAuth, createLocker);
router.get("/available",isAuth, getAvailableLocker)

export default router;
