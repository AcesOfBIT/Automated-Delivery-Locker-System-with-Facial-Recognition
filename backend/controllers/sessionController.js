import { Session } from "../models/sessionModel.js";
import TryCatch from "../utils/TryCatch.js";

export const getAllSessions = TryCatch(async (req, res) => {
  const sessions = await Session.find().populate("userId", "name email role");
  res.status(200).json(sessions);
});
