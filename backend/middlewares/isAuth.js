import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
import { Session } from "../models/sessionModel.js";

export const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "Please login",
      });
    }
    const decodedData = jwt.verify(token, process.env.JWT_SEC);
    if (!decodedData) {
      return res.status(401).json({
        message: "Token expired",
      });
    }
    req.user = await User.findById(decodedData.id).select("-faceId");
    req.user.role = decodedData.role;

    await Session.findOneAndUpdate(
      { userId: req.user._id, status: "active" },
      { lastActivity: new Date() },
      { sort: { loginTime: -1 } }
    );

    next();
  } catch (error) {
    res.status(500).json({
      message: "Please login",
    });
  }
};
