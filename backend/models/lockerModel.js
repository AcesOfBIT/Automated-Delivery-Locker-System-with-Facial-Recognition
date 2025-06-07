import mongoose from "mongoose";

const lockerModel = new mongoose.Schema({
  size: {
    type: String,
    enum: ["small", "medium", "large"],
    required: true,
  },
  status: {
    type: String,
    enum: ["available", "occupied"],
    default: "available",
  },
});

export const Locker = mongoose.model("Locker", lockerModel);
