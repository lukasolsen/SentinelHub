// src/models/User.ts

import mongoose, { Schema, Document } from "mongoose";

export interface IReport extends Document {
  reportId: number;
  timestamp: string;
  emailHash: string;
  tags: string[];
  data: Data;
  metadata: {
    date: string;
    from: string;
    to?: string;
    ip: string;
    size: number;
    subject: string;
    md5: string;
    sha256: string;
  };
  strings: TStrings;
  vendors: VendorOutput[];
  verdict: string;
  country: {
    code: string;
    name: string;
  };
}

const userSchema: Schema = new Schema({
  reportId: { type: Number, required: true },
  timestamp: { type: String, required: true },
  emailHash: { type: String, required: true },
  tags: { type: Array, required: true },
  data: { type: Object, required: true },
  metadata: { type: Object, required: true },
  strings: { type: Object, required: true },
  vendors: { type: Object, required: true },
  verdict: { type: String, required: true },
  country: { type: Object, required: true },
});

const User = mongoose.model<IReport>("Report", userSchema);

export default User;
