import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";
import TryCatch from "../utils/TryCatch.js";
import deleteToken from "../utils/deleteToken.js";
import { Session } from "../models/sessionModel.js";

export const registerUser = TryCatch(async (req, res) => {
  const { name, email, faceId, phone, role } = req.body;

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
    role: role || "user",
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
  });

  res.json({
    user,
    message: "Logged in successfully",
  });
});

export const logOutUser = TryCatch(async (req, res) => {

  await Session.findOneAndUpdate(
    {userId: req.user._id, status:"active"},
    {logoutTime: new Date(), status: "expired"},
    {sort: {loginTime: -1}}
  )

  deleteToken(res);
  res.status(200).json({
    message: "Log out successful",
  });
});

export const getAllUsers = TryCatch(async (req, res) => {
  const users = await User.find().select("-faceId");
  res.status(200).json({ users });
});
