import { Session } from "../models/sessionModel.js";
import TryCatch from "../utils/TryCatch.js";

export const getAllSessions = TryCatch(async (req, res) => {
  const sessions = await Session.find().populate("userId", "name email role");
  res.status(200).json({ sessions });
});

export const getUserSessions = TryCatch(async (req, res) => {
  const { userId } = req.params;

  const sessions = await Session.find({ userId }).sort({ loginTime: -1 });

  res.status(200).json({ sessions });
});

export const getMySessions = TryCatch(async (req, res) => {
  const userId = req.user._id;

  const sessions = await Session.find({ userId }).sort({ loginTime: -1 });
  res.status(200).json({ sessions });
});

export const getActiveSessions = TryCatch(async (req, res) => {
  const sessions = await Session.find({ status: "active" })
    .sort({
      loginTime: -1,
    })
    .populate("userId", "name email role");

  res.status(200).json({ sessions });
});

export const getMyActiveSessions = TryCatch(async (req, res) => {
  const userId = req.user._id;

  const sessions = await Session.find({ userId, status: "active" }).sort({
    loginTime: -1,
  });

  res.status(200).json({ sessions });
});
