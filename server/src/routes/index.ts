import express from "express";
const router = express.Router();

// Use the '/api' route prefix and include routes from the './api' module
router.use("/api", require("./api"));

module.exports = router;
