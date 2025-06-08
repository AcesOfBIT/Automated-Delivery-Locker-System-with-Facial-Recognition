import cron from "node-cron";
import { Session } from "../models/sessionModel.js";

cron.schedule("*/5 * * * *", async () => {
  const THIRTY_MINUTES = 30 * 60 * 1000;
  const cutOffTime = new Date(Date.now() - THIRTY_MINUTES);

  const expired = await Session.updateMany(
    { status: "active", lastActivity: { $lt: cutOffTime } },
    { status: "expired", logoutTime: new Date() }
  );

  if (expired.modifiedCount > 0) {
    console.log(`Auto expired ${expired.modifiedCount} inactive session(s)`);
  }
});
