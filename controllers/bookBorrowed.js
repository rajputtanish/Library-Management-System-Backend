const Book = require("../models/Book");
const Student = require("../models/Student");
const IssueRecord = require("../models/IssueRecord");

const newBookIssued = async (req, res) => {
  try {
    const { studentId, bookId } = req.body;

    if (!studentId || !bookId) {
      return res.status(400).json({ success: false, message: "Student ID and Book ID are required" });
    }

    const student = await Student.findOne({ rollNo: studentId });
    if (!student) return res.status(404).json({ success: false, message: "Student not found" });
    
    if (student.status !== "Active") {
      return res.status(400).json({ success: false, message: "Student is not active" });
    }

    const book = await Book.findOne({ id: bookId });
    if (!book) return res.status(404).json({ success: false, message: "Book not found" });
    
    if (!book.available) {
      return res.status(400).json({ success: false, message: "Book is not available" });
    }

    const issuedBook = await IssueRecord.create({
      id: `ISS-${Date.now()}`,
      studentId: student.rollNo,
      bookId: book.id
    });

    book.available = false;
    await book.save();

    student.booksBorrowed += 1;
    await student.save();

    return res.status(201).json({
      success: true,
      message: "Book issued successfully",
      data: issuedBook,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

const getAllBooksIssued = async (req, res) => {
  try {
    console.log("passed auth")
    const issues = await IssueRecord.find({}).sort({ borrowTime: -1 }).lean();
    
    const data = await Promise.all(issues.map(async (item) => {
      const student = await Student.findOne({ rollNo: item.studentId }).lean();
      const book = await Book.findOne({ id: item.bookId }).lean();
      return {
        ...item,
        studentName: student?.name || item.studentId,
        bookTitle: book?.title || item.bookId,
      };
    }));

    return res.status(200).json({ success: true, count: data.length, data });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

const getStudentIssuedBooks = async (req, res) => {
  try {
    const { studentId } = req.params;
    const studentIssues = await IssueRecord.find({ studentId }).sort({ borrowTime: -1 }).lean();

    const data = await Promise.all(studentIssues.map(async (item) => {
      const book = await Book.findOne({ id: item.bookId }).lean();
      return {
        ...item,
        bookTitle: book?.title || "Unknown Title",
        bookAuthor: book?.author || "Unknown Author",
        department: book?.department || "Unknown Department",
      };
    }));

    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { newBookIssued, getAllBooksIssued, getStudentIssuedBooks };