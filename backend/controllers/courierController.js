import { Package } from "../models/packageModel.js";
import { Locker } from "../models/lockerModel.js";
import { AssignmentLog } from "../models/assignmentLogModel.js";
import TryCatch from "../utils/TryCatch.js";

export const getPackagesToDeliver = TryCatch(async (req, res) => {
  const packages = await Package.find({ status: "Queued" }).sort({
    deliveryDate: 1,
  });

  res.status(200).json({
    packages,
  });
});

export const assignLocker = TryCatch(async (req, res) => {
  const { packageId } = req.params;

  const pkg = await Package.findById(packageId);

  if (!pkg) {
    return res.status(400).json({
      message: "Invalid Package",
    });
  }

  if (pkg.status !== "Queued") {
    return res.status(400).json({
      message: "Already assingned Locker",
    });
  }

  const locker = await Locker.findOneAndUpdate(
    { size: pkg.size, status: "available" },
    { status: "occupied" },
    { new: true }
  );

  if (!locker) {
    return res.status(400).json({
      message: "No locker available for that size",
    });
  }

  pkg.status = "Pending";
  pkg.lockerId = locker._id;
  await pkg.save();

  await AssignmentLog.create({
    packageId: pkg._id,
    lockerId: locker._id,
    assignedBy: req.user._id,
    source: req.user.role,
  });

  res.status(200).json({
    message: "Locker assigned by courier",
    package: pkg,
    locker,
  });
});
