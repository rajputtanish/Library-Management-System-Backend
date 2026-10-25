const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  department: { type: String, required: true },
  available: { type: Boolean, default: true }
});

module.exports = mongoose.model("Book", bookSchema);