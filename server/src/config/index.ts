import dotenv from "dotenv";
dotenv.config();

const secrets = {
  jwtSecret: process.env.JWT_SECRET,
  jwtExp: "100d",
};

const MONGO_URI = process.env.MONGO_URI;

export default secrets;
export { MONGO_URI };
