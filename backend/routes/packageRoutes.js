import express from "express";
import {
  createPackage,
  getAllPackages,
  getMyPackages,
  getPackagesByRecipient,
  pickupPackage,
} from "../controllers/packageController.js";
import { isAuth } from "../middlewares/isAuth.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = express.Router();

router.post("/create", isAuth, createPackage);
router.get("/my", isAuth, getMyPackages);
router.put("/pickup/:packageId", isAuth, pickupPackage);

router.get("/recipient/:recipientId", isAuth, isAdmin, getPackagesByRecipient);
router.get("/", isAuth, isAdmin, getAllPackages);

export default router;
