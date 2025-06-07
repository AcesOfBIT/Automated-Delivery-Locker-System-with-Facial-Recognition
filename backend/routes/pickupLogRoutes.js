import express from "express";
import {
  getPickupLogs,
  getPickupLogsByUser,
} from "../controllers/pickupLogController.js";
import { isAuth } from "../middlewares/isAuth.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = express.Router();

router.get("/", isAuth, isAdmin, getPickupLogs);
router.get("/user/:userId", isAuth, isAdmin, getPickupLogsByUser);

export default router;
