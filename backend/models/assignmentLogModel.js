import mongoose from "mongoose";

const assignmentLogSchema = new mongoose.Schema({
  packageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Package",
    required: true,
  },
  lockerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Locker",
    required: true,
  },
  assignedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  source: {
    type: String,
    enum: ["admin", "courier", "cron"],
    required: true,
  },
  assignedAt: {
    type: Date,
    default: Date.now,
  },
});

export const AssignmentLog = mongoose.model(
  "AssignmentLog",
  assignmentLogSchema
);
