import { AssignmentLog } from "../models/assignmentLogModel.js";
import TryCatch from "../utils/TryCatch.js";

export const getAssignmentLogs = TryCatch(async (req, res) => {
  const logs = await AssignmentLog.find()
    .populate("packageId", "trackingId")
    .populate("lockerId", "lockerId size")
    .populate("assignedBy", "name email role")
    .sort({ assignedAt: -1 });

  res.status(200).json({ logs });
});
