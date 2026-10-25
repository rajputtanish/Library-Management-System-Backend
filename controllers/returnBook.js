const Book = require("../models/Book");
const Student = require("../models/Student");
const IssueRecord = require("../models/IssueRecord");

const returnBook = async (req, res) => {
  try {
    const { bookId } = req.body;
    if (!bookId) return res.status(400).json({ success: false, message: "Book ID is required" });

    const cleanBookId = bookId.trim();

    const issuedBook = await IssueRecord.findOne({ 
      bookId: cleanBookId, 
      returnTime: null 
    });

    if (!issuedBook) {
      return res.status(404).json({
        success: false,
        message: "No active issue record found for this Book ID. It may already be returned.",
      });
    }

    issuedBook.returnTime = new Date();
    await issuedBook.save();

    await Book.findOneAndUpdate({ id: cleanBookId }, { available: true });

    const student = await Student.findOne({ rollNo: issuedBook.studentId });
    if (student) {
      student.booksBorrowed = Math.max(0, student.booksBorrowed - 1);
      await student.save();
    }

    return res.status(200).json({
      success: true,
      message: `Book ${cleanBookId} returned successfully`,
      data: issuedBook,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { returnBook };