import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import "./config/db";

const app: Express = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 1200;

app.use(require("./routes"));

// Handle 404 - Keep this as a last route
app.use(function (req, res, next) {
  //Log the wanted route
  console.log(req.url);
  res.status(404).send("404: Not Found");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
