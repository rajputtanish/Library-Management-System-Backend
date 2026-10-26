const express = require("express");
const Staff = require("../models/Staff");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req);
    const user = await Staff.findOne({ email, password });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    res.status(200).json({ success: true, message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
