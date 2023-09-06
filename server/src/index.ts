import express, { Express } from "express";
import cors from "cors";
import "./config/db";

// Create an Express application
const app: Express = express();

// Parse incoming JSON requests
app.use(express.json());

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Define the port where the server will listen
const port = process.env.PORT || 1200;

// Include routes from the 'routes' module
app.use(require("./routes"));

// Handle 404 errors - this should be the last route
app.use(function (req, res) {
  res.status(404).send("404: Not Found");
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
