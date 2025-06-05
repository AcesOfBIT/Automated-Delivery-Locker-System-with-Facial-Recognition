import express from "express";
import {
  createPackage,
  getAllPackages,
  getPackagesByRecipient,
} from "../controllers/packageController.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router();

router.post("/create", isAuth, createPackage);
router.get("/", isAuth, getAllPackages);
router.get("/recipient/:recipientId", isAuth, getPackagesByRecipient);

export default router;
