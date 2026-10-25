const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const loginRoutes = require("./routes/loginRoutes");
const bookIssueRoutes = require("./routes/booksIssued");
const studentAuth = require("./routes/studentAuth");
const { getAllStudents } = require("./controllers/student");
const { getAllBooks, addBook, removeBook } = require("./controllers/book");
const startCronJobs = require("./scheduler");

const app = express();
const PORT = process.env.PORT || 4001;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Home route
app.get("/", (req, res) => {
  res.send("Welcome to Express.js with MongoDB!");
});

// API Routes
app.use("/api/login", loginRoutes);
app.use("/api/student-auth", studentAuth);
app.get("/api/students", getAllStudents);
app.get("/api/books", getAllBooks);
app.post("/api/books", addBook);
app.delete("/api/books", removeBook);
app.use("/api/books-issued", bookIssueRoutes);

// Start background jobs
startCronJobs();

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});