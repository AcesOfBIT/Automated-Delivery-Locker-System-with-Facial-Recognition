import express from "express";
import {
  createPackage,
  getAllPackages,
  getMyPackages,
  getPackagesByRecipient,
} from "../controllers/packageController.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router();

router.post("/create", isAuth, createPackage);
router.get("/", isAuth, getAllPackages);
router.get("/my", isAuth, getMyPackages);
router.get("/recipient/:recipientId", isAuth, getPackagesByRecipient);

export default router;
