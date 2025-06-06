import { Package } from "../models/packageModel.js";
import { Locker } from "../models/lockerModel.js";
import TryCatch from "../utils/TryCatch.js";

export const createPackage = TryCatch(async (req, res) => {
  const { trackingId, deliveryDate, recipientId, size } = req.body;

  const locker = await Locker.findOne({ size, status: "available" });

  if (!locker) {
    return res.status(400).json({
      message: `No available ${size} size lockers right now.`,
    });
  }

  const pkg = await Package.create({
    trackingId,
    deliveryDate,
    recipientId,
    lockerId: locker._id,
    status: "Pending",
  });

  locker.status = "occupied";
  await locker.save();

  res.status(201).json({
    pkg,
    message: "Package created successfully",
  });
});

export const getAllPackages = TryCatch(async (req, res) => {
  const packages = await Package.find().populate("recipientId lockerId");
  res.json({
    packages,
    message: "Fetched all packages",
  });
});

export const getPackagesByRecipient = TryCatch(async (req, res) => {
  const { recipientId } = req.params;

  const packages = await Package.find({ recipientId }).populate("lockerId");
  if (!packages.length) {
    return res.status(404).json({ message: "No packages found for this user" });
  }

  res.json(packages);
});

export const getMyPackages = TryCatch(async (req, res) => {
  const userId = req.user._id;

  const packages = await Package.find({ recipientId: userId }).populate(
    "lockerId"
  );

  if (!packages.length) {
    return res.status(400).json({ message: "No packages found for this user" });
  }
  res.json(packages);
});
