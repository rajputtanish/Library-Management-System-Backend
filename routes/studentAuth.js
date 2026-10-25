const express = require("express");
const nodemailer = require("nodemailer");
const Student = require("../models/Student");
require("dotenv").config();

const router = express.Router();
const otpStore = {};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

router.post("/send-otp", async (req, res) => {
  const { rollNo } = req.body;
  try {
    const student = await Student.findOne({ rollNo: rollNo.trim() });
    
    if (!student) return res.status(404).json({ message: "Student ID not found in records." });
    if (student.password) return res.status(400).json({ message: "Student already registered." });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[rollNo] = { otp, expires: Date.now() + 10 * 60000 }; 

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: student.email,
      subject: "Library Registration OTP",
      text: `Your OTP for library registration is: ${otp}`,
    });
    
    res.status(200).json({ success: true, message: "OTP sent to registered email." });
  } catch (error) {
    res.status(500).json({ message: "Failed to process OTP request.", error: error.message });
  }
});

router.post("/register", async (req, res) => {
  const { rollNo, otp, password } = req.body;
  const storedData = otpStore[rollNo];

  if (!storedData || storedData.expires < Date.now()) {
    return res.status(400).json({ message: "OTP expired or invalid." });
  }
  if (storedData.otp !== otp) {
    return res.status(400).json({ message: "Incorrect OTP." });
  }

  try {
    await Student.findOneAndUpdate({ rollNo }, { password });
    delete otpStore[rollNo];
    res.status(200).json({ success: true, message: "Registration complete. You can now login." });
  } catch (error) {
    res.status(500).json({ message: "Registration failed.", error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const student = await Student.findOne({ email, password });

    if (!student) return res.status(401).json({ message: "Invalid email or password." });
    res.status(200).json({ success: true, student });
  } catch (error) {
    res.status(500).json({ message: "Login failed.", error: error.message });
  }
});

module.exports = router;