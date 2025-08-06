import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { getAssignmentLogs } from "../controllers/assignmentLogController.js";

const router = express.Router();

router.get("/assignment-log", isAuth, isAdmin, getAssignmentLogs);

export default router;
