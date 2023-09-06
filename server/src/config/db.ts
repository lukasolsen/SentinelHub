import mongoose, { connect } from "mongoose";
import { MONGO_URI } from ".";

// Connect to the MongoDB database using the provided URI
connect(MONGO_URI);

// Event handler for a successful database connection
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

// Event handler for database connection errors
mongoose.connection.on("error", (err) => {
  console.error(`MongoDB connection error: ${err}`);
});
