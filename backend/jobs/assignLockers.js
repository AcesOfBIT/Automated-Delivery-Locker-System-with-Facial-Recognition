import cron from "node-cron";
import { Package } from "../models/packageModel.js";
import { Locker } from "../models/lockerModel.js";

cron.schedule("*/2 * * * *", async () => {
  console.log("Running locker auto-assignment");

  const availableLockers = await Locker.find({ status: "available" });

  for (const locker of availableLockers) {
    const queuedPackage = await Package.findOne({
      status: "Queued",
      size: locker.size,
    }).sort({
      deliveryDate: 1,
    });

    if (!queuedPackage) {
      console.log(`No queued packages left for locker size ${locker.size}`);
      continue;
    }

    queuedPackage.status = "Pending";
    queuedPackage.lockerId = locker._id;
    await queuedPackage.save();

    locker.status = "occupied";
    await locker.save();

    console.log(
      `Assigned locker ${locker._id} to package ${queuedPackage.trackingId}`
    );
  }
});
