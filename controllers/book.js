const booksList = [
  {
    id: "BK-101A",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    department: "English Literature",
    available: true,
  },
  {
    id: "BK-101B",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    department: "English Literature",
    available: true,
  },
  {
    id: "BK-101C",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    department: "English Literature",
    available: true,
  },
  {
    id: "BK-202A",
    title: "1984",
    author: "George Orwell",
    department: "Social Sciences",
    available: true,
  },
  {
    id: "BK-202B",
    title: "1984",
    author: "George Orwell",
    department: "Social Sciences",
    available: true,
  },
  {
    id: "BK-303A",
    title: "Brief History of Time",
    author: "Stephen Hawking",
    department: "Physics",
    available: true,
  },
];

const getAllBooks = (req, res) => {
  res.status(200).json(booksList);
};

const getAllBooksCount = (req, res) => {
  const totalBooks = booksList.length;
  return res.status(200).json({ totalBooks });
};
const addBook = (req, res) => {
  const { title, author, department, quantity } = req.body;

  if (!title || !author || !department || quantity < 1) {
    return res.status(400).json({
      success: false,
      message: "Please provide all required book details and a valid quantity.",
    });
  }

  const newCopies = [];
  // Generate a base ID for this batch of books
  const baseId = `BK-${Math.floor(1000 + Math.random() * 9000)}`;

  // Create individual copies based on the quantity requested
  for (let i = 0; i < quantity; i++) {
    newCopies.push({
      id: `${baseId}-${String.fromCharCode(65 + i)}`,
      title,
      author,
      department,
      available: true, // New books are available by default
    });
  }

  // Push the new copies to the backend array
  booksList.push(...newCopies);

  return res.status(201).json({
    success: true,
    message: `${quantity} copies of "${title}" added successfully!`,
    addedBooks: newCopies,
  });
};

// Replace your existing removeBook function with this:
const removeBook = (req, res) => {
  const { bookIds } = req.body; 

  if (!bookIds || !Array.isArray(bookIds) || bookIds.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Please provide an array of Book IDs.",
    });
  }

  const initialLength = booksList.length;

  // Loop backwards to safely remove items from the array without shifting indexes
  for (let i = booksList.length - 1; i >= 0; i--) {
    if (bookIds.includes(booksList[i].id)) {
      booksList.splice(i, 1);
    }
  }

  const removedCount = initialLength - booksList.length;

  if (removedCount === 0) {
    return res.status(404).json({
      success: false,
      message: "No books found matching the provided IDs.",
    });
  }

  return res.status(200).json({
    success: true,
    message: `Successfully removed ${removedCount} book(s)!`,
  });
};

// Update your module.exports to include the new addBook function
module.exports = { getAllBooks, addBook, removeBook, booksList };
