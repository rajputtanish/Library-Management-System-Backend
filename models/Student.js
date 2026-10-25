const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  rollNo: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  department: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String },
  booksBorrowed: { type: Number, default: 0 },
  status: { type: String, enum: ["Active", "Passout"], default: "Active" }
});

module.exports = mongoose.model("Student", studentSchema);