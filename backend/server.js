const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const contestRoutes = require("./routes/contestRoutes");

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173' // Allow requests only from frontend
}));

// Routes
app.use("/api", contestRoutes);

// Database Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
