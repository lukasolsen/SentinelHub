import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { FeodotrackerAbuseCH } from "./modules/ip_blacklist";
import { simpleParser } from "mailparser";
import cors from "cors"; // Import cors directly

dotenv.config();

const app: Express = express();
app.use(express.json());
app.use(cors()); // Use the cors middleware
const port = process.env.PORT || 1200; // Use a default port if PORT is not set in .env

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get("/api", (req: Request, res: Response) => {
  FeodotrackerAbuseCH.getInstance()
    .getData()
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      res.status(500).send("Internal Server Error");
    });
});

app.post("/email-parser", (req: Request, res: Response) => {
  const { emailContent } = req.body; // Extract emailContent from the request body
  console.log(emailContent);

  simpleParser(emailContent)
    .then((parsed) => {
      // Allow cross-origin requests
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.send({ content: parsed, status: "ok" });
    })
    .catch((error) => {
      console.error("Error parsing email:", error);
      res.status(500).send("Internal Server Error");
    });
});

const bad_emails = [];

app.post("/email-add", (req: Request, res: Response) => {
  const { emailContent } = req.body; // Extract emailContent from the request body
  bad_emails.push(emailContent);
  return res.send({ status: "ok" });
  console.log(bad_emails);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
