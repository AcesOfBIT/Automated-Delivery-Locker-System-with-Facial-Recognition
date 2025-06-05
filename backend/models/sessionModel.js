import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  loginTime: {
    type: Date,
    default: Date.now,
  },
  logoutTime: {
    type: Date,
  },
  status: {
    type: String,
    enum: ["active", "expired"],
    default: "active",
  },
});

export const Session = mongoose.model("Session", sessionSchema);
