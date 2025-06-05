import express from "express";
import dotenv from "dotenv";
import connectdb from "./database/db.js";
import userRoutes from "./routes/userRoutes.js";
import courierRoutes from "./routes/courierRoutes.js";
import lockerRoutes from "./routes/lockerRoutes.js";
import packageRoutes from "./routes/packageRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use("/api/user", userRoutes);
app.use("/api/courier", courierRoutes);
app.use("/api/package", packageRoutes);
app.use("/api/locker", lockerRoutes);

app.get("/", (req, res) => {
  res.send("Server working fine");
});

connectdb().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running on port: " + PORT);
  });
});
