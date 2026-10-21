const express = require("express");
const {
  getAllBooksIssued,
  newBookIssued,
  returnBook,
} = require("../controllers/bookBorrowed");
const router = express.Router();

router.get("/", getAllBooksIssued);

router.post("/", newBookIssued);

router.post("/return", returnBook);

module.exports = router;
