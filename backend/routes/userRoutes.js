import express from "express";
import {
  getAllUsers,
  loginUser,
  logOutUser,
  registerUser,
  updateUserRole,
} from "../controllers/userController.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", isAuth, logOutUser);

router.get("/all", isAuth, isAdmin, getAllUsers);
router.put("/role/:userId", isAuth, isAdmin, updateUserRole);

export default router;
