import express from "express";
import {
  assignLockerToQueuedPackage,
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
router.put("/assign-package", isAuth, isAdmin, assignLockerToQueuedPackage);

export default router;
