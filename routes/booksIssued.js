const express = require("express");
const {
  getAllBooksIssued,
  newBookIssued,
  getStudentIssuedBooks,
} = require("../controllers/bookBorrowed");
const { returnBook } = require("../controllers/returnBook"); // Import from the new file
const router = express.Router();

router.get("/", getAllBooksIssued);

router.get("/student/:studentId", getStudentIssuedBooks);

router.post("/", newBookIssued);

router.post("/return", returnBook);

module.exports = router;
