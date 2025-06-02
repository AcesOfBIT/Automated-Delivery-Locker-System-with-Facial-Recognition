import mongoose from "mongoose";

const transactionModel = mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now,
  },
  action: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  lockerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Locker",
  },
});

export const Transaction = mongoose.model("Transaction", transactionModel);
