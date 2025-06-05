import express from "express";
import {
  createPackage,
  getAllPackages,
  getPackagesByRecipient,
} from "../controllers/packageController.js";

const router = express.Router();

router.post("/", createPackage);
router.get("/", getAllPackages);
router.get("/recipient/:recipientId", getPackagesByRecipient);

export default router;
