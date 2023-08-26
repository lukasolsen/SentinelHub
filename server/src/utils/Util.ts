import crypto from "crypto";

export const generateHash = (email: string) => {
  const hash = crypto.createHash("sha256");
  hash.update(email);
  return hash.digest("hex");
};
