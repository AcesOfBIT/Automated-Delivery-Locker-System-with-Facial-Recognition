import mongoose from "mongoose";

const packageSchema = new mongoose.Schema({
  status: {
    type: String,
    required: true,
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
