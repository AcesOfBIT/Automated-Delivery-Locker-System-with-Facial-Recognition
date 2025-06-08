import { AssignmentLog } from "../models/assignmentLogModel.js";
import TryCatch from "../utils/TryCatch.js";

export const getAssignmentLogs = TryCatch(async (req, res) => {
  const { source, after, before } = req.query;

  const query = {};

  if (source) {
    query.source = source;
  }

  if (after || before) {
    query.assignedAt = {};
    if (after) query.assignedAt.$gte = new Date(after);
    if (before) query.assignedAt.$lte = new Date(before);
  }

  const logs = await AssignmentLog.find(query)
    .populate("packageId", "trackingId")
    .populate("lockerId", "lockerNumber size")
    .populate("assignedBy", "name email role")
    .sort({ assignedAt: -1 });

  res.status(200).json({ logs });
});
