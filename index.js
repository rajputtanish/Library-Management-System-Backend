const express = require("express");
const cors = require("cors");
const loginRoutes = require("./routes/loginRoutes");
const bookIssueRoutes = require("./routes/booksIssued");
const { getAllStudents } = require("./controllers/student");
const { getAllBooks, addBook } = require("./controllers/book");

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

app.get("/api/students", getAllStudents);

app.get("/api/books", getAllBooks);

app.post("/api/books", addBook);

app.use("/api/books-issued", bookIssueRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
