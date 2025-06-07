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

export const getPickupLogsByUser = TryCatch(async (req, res) => {
  const { userId } = req.params;

  const logs = await PickupLog.find({ userId })
    .populate("userId", "name email")
    .populate("packageId", "trackingId")
    .sort({ attemptTime: -1 });

  if (!logs.length) {
    return res.status(404).json({
      message: "No logs found for this user",
    });
  }

  res.status(200).json({
    logs,
  });
});
