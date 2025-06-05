import express from "express";
import {
  getAllUsers,
  loginUser,
  logOutUser,
  registerUser,
} from "../controllers/userController.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logOutUser);

router.get("/all", isAuth, isAdmin, getAllUsers);

export default router;
