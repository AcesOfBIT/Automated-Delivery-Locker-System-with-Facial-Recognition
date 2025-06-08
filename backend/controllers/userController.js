import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";
import TryCatch from "../utils/TryCatch.js";
import deleteToken from "../utils/deleteToken.js";
import { Session } from "../models/sessionModel.js";

export const registerUser = TryCatch(async (req, res) => {
  const { name, email, faceId, phone } = req.body;

  let user = await User.findOne({ email });

  if (user) {
    return res.status(400).json({
      message: "Already have account with this email",
    });
  }
  const hashFaceId = await bcrypt.hash(faceId, 10);

  user = await User.create({
    name,
    email,
    phone,
    faceId: hashFaceId,
  });
  // generateToken(user, res);
  res.status(201).json({
    user,
    message: "User Created",
  });
});

export const loginUser = TryCatch(async (req, res) => {
  const { email, faceId } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: "No user with this email",
    });
  }

  const compareFaceId = await bcrypt.compare(faceId, user.faceId);

  if (!compareFaceId) {
    return res.status(400).json({
      message: "Password doesn't match. Please try again",
    });
  }

  generateToken(user, res);

  await Session.create({
    userId: user._id,
    status: "active",
    loginTime: new Date(),
    lastActivity: new Date(),
    ipAddress: req.ip || req.connection.remoteAddress,
    userAgent: req.get("User-agent"),
  });

  res.json({
    user,
    message: "Logged in successfully",
  });
});

export const logOutUser = TryCatch(async (req, res) => {
  await Session.findOneAndUpdate(
    { userId: req.user._id, status: "active" },
    { logoutTime: new Date(), status: "expired" },
    { sort: { loginTime: -1 } }
  );

  deleteToken(res);
  res.status(200).json({
    message: "Log out successful",
  });
});

export const getAllUsers = TryCatch(async (req, res) => {
  const users = await User.find().select("-faceId");
  res.status(200).json({ users });
});

export const updateUserRole = TryCatch(async (req, res) => {
  const { userId } = req.params;
  const { role } = req.body;

  if (!["user", "admin", "courier"].includes(role)) {
    return res.status(400).json({
      message: "Invalid role",
    });
  }

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  user.role = role;
  await user.save();

  res.status(200).json({
    message: `Role updated to ${role} for user ${user.name}`,
    user: {
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

export const getUsersByRole = TryCatch(async (req, res) => {
  const { role } = req.params;

  if (!["admin", "user", "courier"].includes(role)) {
    return res.status(400).json({
      message: "Invalid role",
    });
  }

  const users = await User.find({ role }).select("name email role");
  res.status(200).json({ users });
});

export const deleteUser = TryCatch(async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  if (user.role === "admin") {
    const countAdmin = await User.countDocuments({ role: "admin" });
    if (countAdmin <= 1) {
      return res.status(403).json({
        message: "Cannot delete the last Admin",
      });
    }
  }

  await user.deleteOne(user);
  res.status(200).json({
    message: `${user.name} deleted successfully`,
  });
});
