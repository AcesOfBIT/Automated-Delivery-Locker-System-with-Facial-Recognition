import cron from "node-cron";
import { Package } from "../models/packageModel.js";
import { Locker } from "../models/lockerModel.js";

cron.schedule("*/2 * * * *", async () => {
  console.log("Running locker auto-assignment");

  try {
    const availableLockers = await Locker.find({ status: "available" });

    for (const locker of availableLockers) {
      const queuedPackage = await Package.findOneAndUpdate(
        {
          status: "Queued",
          size: locker.size,
        },
        {
          status: "Pending",
          lockerId: locker._id,
        },
        {
          sort: { deliveryDate: 1 },
          new: true,
        }
      );

      if (!queuedPackage) {
        console.log(`No queued packages left for locker size ${locker.size}`);
        continue;
      }

      await Locker.findByIdAndUpdate(locker._id, { status: "occupied" });

      console.log(
        `Assigned locker ${locker._id} to package ${queuedPackage.trackingId}`
      );
    }
    console.log("cron locker assignment cycle completed");
  } catch (error) {
    console.error("cron job failed", error.message);
  }
});
