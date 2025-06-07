import express from "express";
import {
  assignLockerToQueuedPackage,
  createPackage,
  getAllPackages,
  getMyPackages,
  getPackagesByRecipient,
  getPackagesToDeliver,
  pickupPackage,
} from "../controllers/packageController.js";
import { isAuth } from "../middlewares/isAuth.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { isCourier } from "../middlewares/isCourier.js";

const router = express.Router();

router.post("/create", isAuth, createPackage);
router.get("/my", isAuth, getMyPackages);
router.put("/pickup/:packageId", isAuth, pickupPackage);

router.get("/recipient/:recipientId", isAuth, isAdmin, getPackagesByRecipient);
router.get("/", isAuth, isAdmin, getAllPackages);
router.put("/assign-package", isAuth, isAdmin, assignLockerToQueuedPackage);

router.get("/delivery-list", isAuth, isCourier, getPackagesToDeliver);

export default router;
