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
    available: false,
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
    available: false,
  },
  {
    id: "BK-303A",
    title: "Brief History of Time",
    author: "Stephen Hawking",
    department: "Physics",
    available: false,
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

// Update your module.exports to include the new addBook function
module.exports = { getAllBooks, addBook, booksList };
