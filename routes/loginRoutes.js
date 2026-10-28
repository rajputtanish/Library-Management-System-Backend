const express = require("express");
const jwt = require("jsonwebtoken");

const Staff = require("../models/Staff");
const isAuthenticated = require("../middleware/isAuthenticated");
const router = express.Router();

const JWT_SECRET = "rdihgiurehiudrhfiuhvfdivfdibvfdiubf";

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const user = await Staff.findOne({ email, password });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const token = jwt.sign({ email, password }, JWT_SECRET, {
      expiresIn: "8h",
    });

    res
      .status(200)
      .json({ success: true, message: "Login successful", user, token });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get("/check-token", isAuthenticated, async (req, res) => {
  try {
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
