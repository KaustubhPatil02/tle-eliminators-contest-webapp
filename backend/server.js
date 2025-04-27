const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const contestRoutes = require("./routes/contestRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: [
      "https://tle-eliminators-contest-webapp.vercel.app", // Deployed frontend
      "http://localhost:5173", // Local development frontend
    ],
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow specific HTTP methods
    credentials: true, // Allow cookies and credentials
  })
);

// Default Route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// API Routes
app.use("/api", contestRoutes);

// Database Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1); // Exit the process if the database connection fails
  });

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Export the app for Vercel
module.exports = app;