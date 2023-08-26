import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { FeodotrackerAbuseCH } from "./modules/ip_blacklist";
import { simpleParser, ParsedMail } from "mailparser";
import {
  addBadEmail,
  emailParsing,
  getBadEmail,
  getBadEmails,
} from "./modules/emailModule";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 1200;

app.use(express.json());
app.use(cors());

app.post("/api/parse-email", emailParsing);

app.post("/api/add-bad-email", addBadEmail);

app.post("/api/bad-emails", getBadEmails);

app.get("/api/bad-email/:id", getBadEmail);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
