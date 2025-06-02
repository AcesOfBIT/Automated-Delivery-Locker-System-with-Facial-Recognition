import mongoose from "mongoose";

const courierModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
});

export const Courier = mongoose.model("Courier", courierModel);
