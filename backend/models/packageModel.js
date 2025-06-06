import mongoose from "mongoose";

const packageSchema = new mongoose.Schema({
  trackingId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["Pending", "PickedUp"],
    default: "Pending",
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
