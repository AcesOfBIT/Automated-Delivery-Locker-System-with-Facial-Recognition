import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { getAllSessions } from "../controllers/sessionController.js";

const router = express.Router();

router.get("/", isAuth, isAdmin, getAllSessions);

export default router;
