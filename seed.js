require("dotenv").config();

const Book = require("./models/Book");
const Student = require("./models/Student");
const Staff = require("./models/Staff");
const IssueRecord = require("./models/IssueRecord");
const connectDB = require("./library/connectDB");
const initialBooks = require("./temp-data/books");

const initialStudents = [
  {
    rollNo: "STU-2026-001",
    name: "Aarav Sharma",
    department: "Computer Science",
    email: "aarav@library.edu",
    phone: "+91 98765 43210",
    booksBorrowed: 0,
    status: "Active",
  },
  {
    rollNo: "STU-2026-002",
    name: "Ananya Patel",
    department: "Management",
    email: "ananya@library.edu",
    phone: "+91 87654 32109",
    booksBorrowed: 0,
    status: "Active",
  },
  {
    rollNo: "STU-2026-003",
    name: "Rohan Verma",
    department: "Pharmacy",
    email: "rohan@library.edu",
    phone: "+91 76543 21098",
    booksBorrowed: 0,
    status: "Passout",
  },
  {
    rollNo: "STU-2026-004",
    name: "Diya Nair",
    department: "Management",
    email: "diya@library.edu",
    phone: "+91 65432 10987",
    booksBorrowed: 0,
    status: "Active",
  },
  {
    rollNo: "STU-2026-005",
    name: "Tanish Rajput",
    department: "Computer Science",
    email: "rajputtanish2006@gmail.com",
    phone: "+91 54321 09876",
    booksBorrowed: 0,
    status: "Active",
  },
  {
    rollNo: "STU-2026-006",
    name: "Priya Singh",
    department: "Management",
    email: "priya.singh6@library.edu",
    phone: "+91 90000 00006",
    booksBorrowed: 0,
    status: "Active",
  },
  {
    rollNo: "STU-2026-007",
    name: "Rahul Gupta",
    department: "Computer Science",
    email: "rahul.gupta7@library.edu",
    phone: "+91 90000 00007",
    booksBorrowed: 0,
    status: "Active",
  },
  {
    rollNo: "STU-2026-008",
    name: "Sneha Kumar",
    department: "Microbiology",
    email: "sneha.kumar8@library.edu",
    phone: "+91 90000 00008",
    booksBorrowed: 0,
    status: "Active",
  },
  {
    rollNo: "STU-2026-009",
    name: "Arjun Mehta",
    department: "Pharmacy",
    email: "arjun.mehta9@library.edu",
    phone: "+91 90000 00009",
    booksBorrowed: 0,
    status: "Active",
  },
  {
    rollNo: "STU-2026-010",
    name: "Kavya Joshi",
    department: "Computer Science",
    email: "kavya.joshi10@library.edu",
    phone: "+91 90000 00010",
    booksBorrowed: 0,
    status: "Passout",
  },
];

const initialStaff = [
  { email: "rajputtanish2006@gmail.com", password: "123456" },
];

const seedDB = async () => {
  try {
    await connectDB();

    await Book.deleteMany({});
    await Student.deleteMany({});
    await Staff.deleteMany({});
    await IssueRecord.deleteMany({});

    await Book.insertMany(initialBooks);
    await Student.insertMany(initialStudents);
    await Staff.insertMany(initialStaff);

    console.log("Database seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDB();
