const Book = require("../models/Book");

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({});
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const addBook = async (req, res) => {
  const { title, author, department, quantity } = req.body;

  if (!title || !author || !department || quantity < 1) {
    return res.status(400).json({
      success: false,
      message: "Please provide all required book details and a valid quantity.",
    });
  }

  const newCopies = [];
  const baseId = `BK-${Math.floor(1000 + Math.random() * 9000)}`;

  for (let i = 0; i < quantity; i++) {
    newCopies.push({
      id: `${baseId}-${String.fromCharCode(65 + i)}`,
      title,
      author,
      department,
      available: true,
    });
  }

  try {
    const addedBooks = await Book.insertMany(newCopies);
    return res.status(201).json({
      success: true,
      message: `${quantity} copies of "${title}" added successfully!`,
      addedBooks,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

const removeBook = async (req, res) => {
  const { bookIds } = req.body;

  if (!bookIds || !Array.isArray(bookIds) || bookIds.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Please provide an array of Book IDs.",
    });
  }

  try {
    // Check if any of the requested books are currently issued out
    const issuedBooks = await Book.find({ id: { $in: bookIds }, available: false });
    if (issuedBooks.length > 0) {
      const issuedIds = issuedBooks.map((b) => b.id).join(", ");
      return res.status(400).json({
        success: false,
        message: `Cannot delete currently issued book(s): ${issuedIds}. Please return them first.`,
      });
    }

    const result = await Book.deleteMany({ id: { $in: bookIds } });
    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "No books found matching the provided IDs.",
      });
    }
    return res.status(200).json({
      success: true,
      message: `Successfully removed ${result.deletedCount} book(s)!`,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { getAllBooks, addBook, removeBook };