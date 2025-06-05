import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import {
  getAllSessions,
  getMySessions,
  getUserSessions,
} from "../controllers/sessionController.js";

const router = express.Router();

router.get("/my", isAuth, getMySessions);

router.get("/", isAuth, isAdmin, getAllSessions);
router.get("/user/:userId", isAuth, isAdmin, getUserSessions);

export default router;
