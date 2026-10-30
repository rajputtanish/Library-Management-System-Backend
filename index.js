const express = require("express");
const cors = require("cors");
require("dotenv").config();

const loginRoutes = require("./routes/loginRoutes");
const bookIssueRoutes = require("./routes/booksIssued");
const { getAllStudents } = require("./controllers/student");
const { getAllBooks, addBook, removeBook } = require("./controllers/book");
const connectDB = require("./library/connectDB");

const app = express();
const PORT = process.env.PORT || 4001;

// Middleware
app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res
    .status(200)
    .send("Welcome to Express.js with MongoDB! nnnnnnnnnnnnnnnnnnnnnnnnnnnnn");
});

// Ensure MongoDB is connected before handling requests
app.use(async (req, res, next) => {
  console.log("REQUEST RECEIVED:", req.method, req.url);

  try {
    console.log("DB CONNECTION STARTING");

    await connectDB();

    console.log("DB CONNECTION SUCCESSFUL");

    next();
  } catch (error) {
    console.error("DB CONNECTION FAILED:", error.message);

    res.status(503).json({
      success: false,
      error: error.message,
    });
  }
});

// API routes
app.use("/api/login", loginRoutes);
app.get("/api/students", getAllStudents);
app.get("/api/books", getAllBooks);
app.post("/api/books", addBook);
app.delete("/api/books", removeBook);
app.use("/api/books-issued", bookIssueRoutes);

// Local development: connect first, then start Express
if (require.main === module) {
  connectDB()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    })
    .catch((error) => {
      console.error("Failed to connect to MongoDB:", error);
      process.exit(1);
    });
}

// Vercel serverless entry point
module.exports = app;
