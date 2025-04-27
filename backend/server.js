const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const contestRoutes = require("./routes/contestRoutes");
const fetchLeetCodeContestProblems = require('./scrapping/fetchContestProblems');


const app = express();
app.use(express.json());
app.use(cors({
  origin: ["https://tle-eliminators-contest-webapp.vercel.app", "http://localhost:5173"], // Allow frontend origins
  methods: ["GET", "POST", "PUT", "DELETE"], // Allow specific HTTP methods
  credentials: true // Allow cookies and credentials
}));

// Routes
app.use("/api", contestRoutes);

// app.use('api', fetchLeetCodeContestProblems);

// Database Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000, // Keep trying to send operations for 5 seconds
})
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app; // Export the app for Vercel