import crypto from "crypto";
import { simpleParser } from "mailparser";

export const generateHash = (email: string) => {
  const hash = crypto.createHash("sha256");
  hash.update(email);
  return hash.digest("hex");
};

export const generateMD5 = (email: string) => {
  const hash = crypto.createHash("md5");
  hash.update(email);
  return hash.digest("hex");
};

export const Categories = [
  "Spam",
  "Malware",
  "Data Exfiltration",
  "URL Phishing",
  "Scamming",
  "Spear Phishing",
  "Domain Impersonation",
  "Brand Impersonation",
  "Extortion",
  "Business Email Compromise",
  "Conversation Hijacking",
  "Lateral Phishing",
  "Account Takeover",
  "Unknown",
  "Not Supported",
] as const;

export const getEmailContent = async (
  emailContent: string
): Promise<ParsedMail> => {
  try {
    return await simpleParser(emailContent);
  } catch (error) {
    console.error("Error parsing email:", error);
    throw new Error("Internal Server Error");
  }
};
