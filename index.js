const express = require("express");
const cors = require("cors");
const loginRoutes = require("./routes/loginRoutes");
const bookIssueRoutes = require("./routes/booksIssued");
const studentAuth = require("./routes/studentAuth"); // <-- Import new route
const { getAllStudents } = require("./controllers/student");
const { getAllBooks, addBook, removeBook } = require("./controllers/book");

// 1. Import the scheduler
const startCronJobs = require("./scheduler");

const app = express();
const PORT = process.env.PORT || 4001;

// Middleware
app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.send("Welcome to Express.js!");
});

app.use("/api/login", loginRoutes);
app.use("/api/student-auth", studentAuth); // <-- Mount new route

app.get("/api/students", getAllStudents);
app.get("/api/books", getAllBooks);
app.post("/api/books", addBook);
app.delete("/api/books", removeBook);
app.use("/api/books-issued", bookIssueRoutes);

// 2. Start the background email alerts
startCronJobs();

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});