import express from "express";
import { getPickupLogs } from "../controllers/pickupLogController.js";
import { isAuth } from "../middlewares/isAuth.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = express.Router();

router.get("/", isAuth, isAdmin, getPickupLogs);

export default router;
