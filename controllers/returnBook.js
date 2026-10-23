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

    // 1. Sanitize the input to remove accidental spaces (e.g. "BK-101A " -> "BK-101A")
    const cleanBookId = bookId.trim();
    
    console.log(`Attempting to return book: ${cleanBookId}`);
    console.log("Current active issues in memory:", booksIssueList);

    // 2. Find the active issue record
    const issuedBook = booksIssueList.find(
      (item) => item.bookId === cleanBookId && item.returnTime === null
    );

    if (!issuedBook) {
      console.log("Failed to find active issue for:", cleanBookId);
      return res.status(404).json({
        success: false,
        message: "No active issue record found for this Book ID. It may already be returned.",
      });
    }

    const book = booksList.find((book) => book.id === issuedBook.bookId);
    const student = studentsList.find(
      (student) => student.rollNo === issuedBook.studentId
    );

    // 3. Update records
    issuedBook.returnTime = new Date();

    if (book) {
      book.available = true;
    }

    if (student) {
      student.booksBorrowed = Math.max(0, student.booksBorrowed - 1);
    }

    console.log("Successfully returned:", issuedBook);

    return res.status(200).json({
      success: true,
      message: `Book ${cleanBookId} returned successfully`,
      data: issuedBook,
    });
  } catch (error) {
    console.error("Return Book Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to return book",
      error: error.message,
    });
  }
};

module.exports = { returnBook };