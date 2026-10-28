const jwt = require("jsonwebtoken");

const JWT_SECRET = "rdihgiurehiudrhfiuhvfdivfdibvfdiubf";

const isAuthenticated = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  console.log(authHeader)

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access token missing" });
  }

  jwt.verify(token, JWT_SECRET, (err, decodedUser) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }

    req.user = decodedUser;
    next();
  });
};

module.exports = isAuthenticated;
