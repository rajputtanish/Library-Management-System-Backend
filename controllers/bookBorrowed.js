const { booksList } = require("./book");
const { studentsList } = require("./student");

const booksIssueList = [];

// Issue a book
const newBookIssued = async (req, res) => {
  try {
    const { studentId, bookId } = req.body;

    if (!studentId || !bookId) {
      return res.status(400).json({
        success: false,
        message: "Student ID and Book ID are required",
      });
    }

    // Find student using roll number
    const student = studentsList.find(
      (student) => student.rollNo === studentId,
    );

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    // Find book using book ID
    const book = booksList.find((book) => book.id === bookId);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    if (!book.available) {
      return res.status(400).json({
        success: false,
        message: "Book is not available",
      });
    }

    if (student.status !== "Active") {
      return res.status(400).json({
        success: false,
        message: "Student is not active",
      });
    }

    // Create issue record
    const issuedBook = {
      id: `ISS-${Date.now()}`,
      studentId: student.rollNo,
      bookId: book.id,
      borrowTime: new Date(),
      returnTime: null,
    };

    // Update data
    booksIssueList.push(issuedBook);
    book.available = false;
    student.booksBorrowed += 1;

    console.log("Issued Book Record:", issuedBook, booksIssueList);

    return res.status(201).json({
      success: true,
      message: "Book issued successfully",
      data: issuedBook,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to issue book",
      error: error.message,
    });
  }
};

// Get all issued books
const getAllBooksIssued = async (req, res) => {
  try {
    const data = booksIssueList
      .map((item) => {
        const student = studentsList.find((s) => s.rollNo === item.studentId);

        const book = booksList.find((b) => b.id === item.bookId);

        return {
          ...item,
          studentName: student?.name || item.studentId,
          bookTitle: book?.title || item.bookId,
        };
      })
      .sort(
        (a, b) =>
          new Date(b.returnTime || b.borrowTime) -
          new Date(a.returnTime || a.borrowTime),
      );

    return res.status(200).json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch issued books",
      error: error.message,
    });
  }
};

const getStudentIssuedBooks = async (req, res) => {
  try {
    const { studentId } = req.params;

    // Find all active issues (not yet returned) for this student
    const studentIssues = booksIssueList.filter(
      (item) => item.studentId === studentId && item.returnTime === null
    );

    // Map the book details into the response
    const data = studentIssues.map((item) => {
      const book = booksList.find((b) => b.id === item.bookId);
      return {
        ...item,
        bookTitle: book?.title || "Unknown Title",
        bookAuthor: book?.author || "Unknown Author",
        department: book?.department || "Unknown Department",
      };
    });

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch student's books",
      error: error.message,
    });
  }
};

module.exports = {
  newBookIssued,
  getAllBooksIssued,
  getStudentIssuedBooks,
};
