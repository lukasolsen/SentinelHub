import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import {
  addBadEmail,
  emailParsing,
  getBadEmail,
  getBadEmails,
  getRelatedReports,
} from "./modules/emailModule";

dotenv.config();

const app: Express = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 1200;
/*
app.post("/api/parse-email", emailParsing);

app.post("/api/add-bad-email", addBadEmail);

app.post("/api/bad-emails", getBadEmails);

app.get("/api/bad-email/:id", getBadEmail);

app.post("/api/related-reports", getRelatedReports);
*/

app.use(require("./routes"));

// Handle 404 - Keep this as a last route
/*app.use(function (req, res, next) {
  res.status(404).send("404: Not Found");
});*/

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
