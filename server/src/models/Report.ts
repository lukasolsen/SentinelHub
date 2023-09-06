// src/models/User.ts

import mongoose, { Schema, Document } from "mongoose";

export interface IReport extends Document {
  _id?: string; // Only for MongoDB
  reportId: number;
  timestamp: string;
  emailHash: string;
  tags: string[];
  data: EEmailData;
  metadata: EEmailMetadata;
  strings: EStrings;
  vendors: EVendorOutput[];
  verdict: string;
  isSafe: boolean;
  totalVendorsSafe: number;
  totalVendorsThreats: number;
  totalVendors: number;
  yara: EYaraRuleOutput[];
  country: ECountry;
}

const userSchema: Schema = new Schema({
  reportId: { type: Number, required: true },
  timestamp: { type: String, required: true },
  emailHash: { type: String, required: true },
  tags: { type: Array, required: true },
  data: { type: Object, required: true },
  metadata: { type: Object, required: true },
  strings: { type: Object, required: true },
  yara: { type: Object, required: true },
  vendors: { type: Object, required: true },
  verdict: { type: String, required: true },
  country: { type: Object, required: true },
});

const User = mongoose.model<IReport>("Report", userSchema);

export default User;
