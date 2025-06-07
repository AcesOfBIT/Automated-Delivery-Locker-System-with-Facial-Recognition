import mongoose from "mongoose";

const pickupLogSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  packageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Package",
    required: true,
  },
  attemptTime: {
    type: Date,
    default: Date.now,
  },
  success: {
    type: Boolean,
    required: true,
  },
  reason: {
    type: String,
  },
});

export const PickupLog = mongoose.model("PickupLog", pickupLogSchema);
