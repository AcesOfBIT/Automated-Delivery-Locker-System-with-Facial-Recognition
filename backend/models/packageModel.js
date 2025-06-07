import mongoose from "mongoose";

const packageSchema = new mongoose.Schema({
  trackingId: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    enum: ["Queued", "Pending", "PickedUp"],
    default: "Pending",
  },
  size: {
    type: String,
    enum: ["small", "medium", "large"],
    required: true,
  },
  deliveryDate: {
    type: Date,
    required: true,
  },
  recipientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  lockerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Locker",
  },
});

export const Package = mongoose.model("Package", packageSchema);
