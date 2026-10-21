const express = require("express");
const router = express.Router();

const users = [
  {
    id: 1,
    email: "rajputtanish2006@gmail.com",
    password: "123456",
  },
];

const login = (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  res.status(200).json({
    success: true,
    message: "Login successful",
    user,
  });
};

router.post("/", login);

module.exports = router; 
