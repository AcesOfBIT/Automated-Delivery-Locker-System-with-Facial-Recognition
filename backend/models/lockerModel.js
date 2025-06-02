import mongoose from "mongoose";

const lockerModel = new mongoose.Schema({
  size: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
});

export const Locker = mongoose.model("Locker", lockerModel);
