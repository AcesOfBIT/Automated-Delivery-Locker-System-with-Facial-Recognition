import bcrypt from "bcrypt";
import { Package } from "../models/packageModel.js";
import { Locker } from "../models/lockerModel.js";
import { User } from "../models/userModel.js";
import { PickupLog } from "../models/pickupLogModel.js";
import TryCatch from "../utils/TryCatch.js";

export const createPackage = TryCatch(async (req, res) => {
  const { trackingId, deliveryDate, recipientId, size } = req.body;

  const locker = await Locker.findOne({ size, status: "available" });

  let pkg;

  if (locker) {
    pkg = await Package.create({
      trackingId,
      deliveryDate,
      recipientId,
      size,
      lockerId: locker._id,
      status: "Pending",
    });

    locker.status = "occupied";
    await locker.save();
  } else {
    pkg = await Package.create({
      trackingId,
      deliveryDate,
      recipientId,
      size,
      status: "Queued",
    });
  }

  res.status(201).json({
    pkg,
    message: locker
      ? "Package created and locker assigned"
      : "No locker available right now. Package queued",
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

export const pickupPackage = TryCatch(async (req, res) => {
  const { packageId } = req.params;
  const { faceId } = req.body;

  const pkg = await Package.findById(packageId);

  if (!pkg) {
    return res.status(400).json({
      message: "Package not found",
    });
  }

  if (pkg.status === "PickedUp") {
    return res.status(400).json({
      message: "package already picked up",
    });
  }

  if (pkg.recipientId.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      message: "You are not the recipient of this package",
    });
  }

  const user = await User.findById(req.user._id);
  const isMatch = await bcrypt.compare(faceId, user.faceId);

  if (!isMatch) {
    await PickupLog.create({
      userId: req.user._id,
      packageId: pkg._id,
      success: false,
      reason: "Face ID mismatched",
    });

    return res.status(401).json({
      message: "Face ID mismatched",
    });
  }

  await PickupLog.create({
    userId: req.user._id,
    packageId: pkg._id,
    success: true,
    reason: "Face ID matched. Package picked up",
  });

  pkg.status = "PickedUp";
  await pkg.save();

  const locker = await Locker.findById(pkg.lockerId);
  if (locker) {
    locker.status = "available";
    await locker.save();
  }

  res.status(200).json({
    package: pkg,
    message: "Package picked up and Locker released",
  });
});

export const assignLockerToQueuedPackage = TryCatch(async (req, res) => {
  const { size } = req.body;

  const locker = await Locker.findOne({ size, status: "available" });
  if (!locker) {
    return res.status(400).json({
      message: "No available lockers of this size",
    });
  }

  const pkg = await Package.findOne({
    status: "Queued",
  }).sort({ deliveryDate: 1 });

  if (!pkg) {
    return res.status(404).json({
      message: "No queued package to assign",
    });
  }

  pkg.status = "Pending";
  pkg.lockerId = locker._id;
  await pkg.save();

  locker.status = "occupied";
  await locker.save();

  res.status(200).json({
    message: "Queued package assigned to Locker",
    package: pkg,
    locker,
  });
});

export const getPackagesToDeliver = TryCatch(async (req, res) => {
  const packages = await Package.find({ status: "Queued" }).sort({
    deliveryDate: 1,
  });

  res.status(200).json({
    packages,
  });
});
