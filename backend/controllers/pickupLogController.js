import { PickupLog } from "../models/pickupLogModel.js";
import TryCatch from "../utils/TryCatch.js";

export const getPickupLogs = TryCatch(async (req, res) => {
  const logs = await PickupLog.find()
    .populate("userId", "name email")
    .populate("packageId", "trackingId")
    .sort({ attemptTime: -1 });

  res.status(200).json({
    logs,
  });
});
