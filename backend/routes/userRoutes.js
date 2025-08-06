import express from "express";
import {
  deleteUser,
  getAllUsers,
  getMe,
  getUsersByRole,
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
router.get("/me", isAuth, getMe);

router.get("/all", isAuth, isAdmin, getAllUsers);
router.put("/role/:userId", isAuth, isAdmin, updateUserRole);
router.get("/role/:role", isAuth, isAdmin, getUsersByRole);
router.delete("/:userId", isAuth, isAdmin, deleteUser);

export default router;
