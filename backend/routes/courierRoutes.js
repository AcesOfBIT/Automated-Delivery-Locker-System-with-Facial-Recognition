import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import { isCourier } from "../middlewares/isCourier.js";
import {
  assignLocker,
  getPackagesToDeliver,
} from "../controllers/courierController.js";

const router = express.Router();

router.get("/delivery-list", isAuth, isCourier, getPackagesToDeliver);
router.put("/assign/:packageId", isAuth, isCourier, assignLocker);

export default router;
