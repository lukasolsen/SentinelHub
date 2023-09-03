// src/models/User.ts

import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  ip: string;
  email: string;
  verified: boolean;
  loggedIn: boolean;
}

const userSchema: Schema = new Schema({
  ip: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  verified: { type: Boolean, default: false },
  loggedIn: { type: Boolean, default: false },
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
