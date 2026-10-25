const mongoose = require("mongoose");
require("dotenv").config();

const Book = require("./models/Book");
const Student = require("./models/Student");
const Staff = require("./models/Staff");

const initialBooks = [
  { id: "BK-101A", title: "The Great Gatsby", author: "F. Scott Fitzgerald", department: "Management", available: true },
  { id: "BK-101B", title: "The Great Gatsby", author: "F. Scott Fitzgerald", department: "Management", available: true },
  { id: "BK-101C", title: "The Great Gatsby", author: "F. Scott Fitzgerald", department: "Management", available: true },
  { id: "BK-202A", title: "1984", author: "George Orwell", department: "Computer Science", available: true },
  { id: "BK-202B", title: "1984", author: "George Orwell", department: "Computer Science", available: true },
  { id: "BK-303A", title: "Brief History of Time", author: "Stephen Hawking", department: "Pharmacy", available: true },
];

const initialStudents = [
  { rollNo: "STU-2026-001", name: "Aarav Sharma", department: "Computer Science", email: "aarav@library.edu", phone: "+91 98765 43210", password: "Aarav@2026", booksBorrowed: 0, status: "Active" },
  { rollNo: "STU-2026-002", name: "Ananya Patel", department: "Management", email: "ananya@library.edu", phone: "+91 87654 32109", password: "Ananya@2026", booksBorrowed: 0, status: "Active" },
  { rollNo: "STU-2026-003", name: "Rohan Verma", department: "Pharmacy", email: "rohan@library.edu", phone: "+91 76543 21098", password: "Rohan@2026", booksBorrowed: 0, status: "Passout" },
  { rollNo: "STU-2026-004", name: "Diya Nair", department: "Management", email: "diya@library.edu", phone: "+91 65432 10987", password: "Diya@2026", booksBorrowed: 0, status: "Active" },
  { rollNo: "STU-2026-005", name: "Tanish Rajput", department: "Computer Science", email: "rajputtanish2006@gmail.com", phone: "+91 54321 09876", booksBorrowed: 0, status: "Active" },
];

const initialStaff = [
  { email: "rajputtanish2006@gmail.com", password: "123456" }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB...");

    await Book.deleteMany({});
    await Student.deleteMany({});
    await Staff.deleteMany({});

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