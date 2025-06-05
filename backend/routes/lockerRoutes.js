import express from "express";
import {
  createLocker,
  getAvailableLocker,
} from "../controllers/lockerController.js";
import { isAuth } from "../middlewares/isAuth.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = express.Router();

router.get("/available", isAuth, getAvailableLocker);

router.post("/create", isAuth, isAdmin, createLocker);

export default router;
