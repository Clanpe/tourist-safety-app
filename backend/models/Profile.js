
import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  emailVerified: { type: Boolean, default: false },
  contact: { type: String, required: true },
  contactVerified: { type: Boolean, default: false },
  altContact: { type: String },
  gender: { type: String },
  age: { type: Number, min: 18 },
  otpEmail: { type: String },      // temporary email OTP
  otpContact: { type: String },    // temporary contact OTP
}, { timestamps: true });

export const Profile = mongoose.model("Profile", profileSchema);