const express = require("express");
const cors = require("cors");
// const mongoose = require("mongoose");
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
  console.log("dsfijohs")
  res.send("Welcome to Express.js with MongoDB!");
});

// API Routes
app.use("/api/login", loginRoutes);
app.get("/api/students", getAllStudents);
app.get("/api/books", getAllBooks);
app.post("/api/books", addBook);
app.delete("/api/books", removeBook);
app.use("/api/books-issued", bookIssueRoutes);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  });
