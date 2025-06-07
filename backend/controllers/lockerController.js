import { Locker } from "../models/lockerModel.js";
import TryCatch from "../utils/TryCatch.js";

export const createLocker = TryCatch(async (req, res) => {
  const { size } = req.body;
  const locker = await Locker.create({
    size,
  });
  res.json({
    locker,
    message: "Locker Created",
  });
});

export const getAvailableLocker = TryCatch(async (req, res) => {
  const lockers = await Locker.find({ status: "available" });
  res.json({
    lockers,
    message: "Fetched available lockers",
  });
});
