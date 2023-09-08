// src/models/User.ts

import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  ip: string;
  token: string;
  email: string;
  verified: boolean;
  loggedIn: boolean;
  role?: string;
}

const userSchema: Schema = new Schema({
  ip: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  verified: { type: Boolean, default: false },
  loggedIn: { type: Boolean, default: false },
  role: { type: String, default: "member" },
  token: { type: String, required: true, unique: true },
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
