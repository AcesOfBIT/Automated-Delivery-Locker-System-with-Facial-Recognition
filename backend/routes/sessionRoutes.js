import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import {
  getActiveSessions,
  getAllSessions,
  getMyActiveSessions,
  getMySessions,
  getUserSessions,
} from "../controllers/sessionController.js";

const router = express.Router();

router.get("/my", isAuth, getMySessions);
router.get("/my/active", isAuth, getMyActiveSessions);

router.get("/", isAuth, isAdmin, getAllSessions);
router.get("/active", isAuth, isAdmin, getActiveSessions);
router.get("/user/:userId", isAuth, isAdmin, getUserSessions);

export default router;
