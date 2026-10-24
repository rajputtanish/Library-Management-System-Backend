// routes/studentAuth.js
const express = require("express");
const nodemailer = require("nodemailer");
const { studentsList } = require("../controllers/student");
const router = express.Router();

// Temporary in-memory OTP store: { rollNo: { otp, expires } }
const otpStore = {};

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "your-email@gmail.com",
    pass: "your-app-password", // Use Gmail App Passwords, not your real password
  },
});

// Step 1: Send OTP
router.post("/send-otp", async (req, res) => {
  const { rollNo } = req.body;
  const student = studentsList.find((s) => s.rollNo === rollNo);

  if (!student) return res.status(404).json({ message: "Student ID not found in records." });
  if (student.password) return res.status(400).json({ message: "Student already registered." });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[rollNo] = { otp, expires: Date.now() + 10 * 60000 }; // 10 min expiration

  try {
    await transporter.sendMail({
      from: "your-email@gmail.com",
      to: student.email,
      subject: "Library Registration OTP",
      text: `Your OTP for library registration is: ${otp}`,
    });
    res.status(200).json({ success: true, message: "OTP sent to registered email." });
  } catch (error) {
    res.status(500).json({ message: "Failed to send email." });
  }
});

// Step 2: Verify OTP and Set Password
router.post("/register", (req, res) => {
  const { rollNo, otp, password } = req.body;
  const storedData = otpStore[rollNo];

  if (!storedData || storedData.expires < Date.now()) {
    return res.status(400).json({ message: "OTP expired or invalid." });
  }
  if (storedData.otp !== otp) {
    return res.status(400).json({ message: "Incorrect OTP." });
  }

  const student = studentsList.find((s) => s.rollNo === rollNo);
  student.password = password; // In production, hash this with bcrypt
  delete otpStore[rollNo];

  res.status(200).json({ success: true, message: "Registration complete. You can now login." });
});

// Step 3: Student Login
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const student = studentsList.find((s) => s.email === email && s.password === password);

  if (!student) return res.status(401).json({ message: "Invalid email or password." });
  
  res.status(200).json({ success: true, student });
});

module.exports = router;