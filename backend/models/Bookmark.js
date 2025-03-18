const mongoose = require("mongoose");

const BookmarkSchema = new mongoose.Schema({
  title: String,
  url: String,
  startTime: String,
  platform: String,
});

module.exports = mongoose.model("Bookmark", BookmarkSchema);
