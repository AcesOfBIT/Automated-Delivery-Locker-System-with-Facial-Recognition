import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";

export const registerUser = async (req, res) => {
  try {
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

    res.status(201).json({
        user,
        message: "User Created"
    })
  } catch (error) {
    console.log(error);
  }
};
