const { booksList } = require("./book");
const { studentsList } = require("./student");
const { booksIssueList } = require("./bookBorrowed");

const returnBook = async (req, res) => {
  try {
    const { bookId } = req.body;

    if (!bookId) {
      return res.status(400).json({
        success: false,
        message: "Book ID is required",
      });
    }

    const issuedBook = booksIssueList.find(
      (item) => item.bookId === bookId && item.returnTime === null
    );

    if (!issuedBook) {
      return res.status(404).json({
        success: false,
        message: "No active issue record found for this Book ID. It may already be returned.",
      });
    }

    const book = booksList.find((book) => book.id === issuedBook.bookId);
    const student = studentsList.find(
      (student) => student.rollNo === issuedBook.studentId
    );

    issuedBook.returnTime = new Date();

    if (book) {
      book.available = true;
    }

    if (student) {
      student.booksBorrowed = Math.max(0, student.booksBorrowed - 1);
    }

    return res.status(200).json({
      success: true,
      message: "Book returned successfully",
      data: issuedBook,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to return book",
      error: error.message,
    });
  }
};

module.exports = { returnBook };