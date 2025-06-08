import { Locker } from "../models/lockerModel.js";
import TryCatch from "../utils/TryCatch.js";

export const createLocker = TryCatch(async (req, res) => {
  const { size } = req.body;

  const lastLocker = await Locker.findOne().sort({ lockerNumber: -1 });

  let nextNumber = 1;

  if (lastLocker && lastLocker.lockerNumber) {
    const lastNumber = parseInt(lastLocker.lockerNumber.replace("L", ""), 10);
    nextNumber = lastNumber + 1;
  }

  const locker = await Locker.create({
    size,
    status: "available",
    lockerNumber: `L${nextNumber}`,
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
