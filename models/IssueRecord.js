const mongoose = require("mongoose");

const issueRecordSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  studentId: { type: String, required: true }, 
  bookId: { type: String, required: true }, 
  borrowTime: { type: Date, default: Date.now },
  returnTime: { type: Date, default: null }
});

module.exports = mongoose.model("IssueRecord", issueRecordSchema);