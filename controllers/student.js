const studentsList = [
  {
    rollNo: "STU-2026-001",
    name: "Aarav Sharma",
    department: "Computer Science",
    email: "aarav@library.edu",
    phone: "+91 98765 43210",
    password: "Aarav@2026",
    booksBorrowed: 0,
    status: "Active",
  },
  {
    rollNo: "STU-2026-002",
    name: "Ananya Patel",
    department: "Management",
    email: "ananya@library.edu",
    phone: "+91 87654 32109",
    password: "Ananya@2026",
    booksBorrowed: 0,
    status: "Active",
  },
  {
    rollNo: "STU-2026-003",
    name: "Rohan Verma",
    department: "Pharmacy",
    email: "rohan@library.edu",
    phone: "+91 76543 21098",
    password: "Rohan@2026",
    booksBorrowed: 0,
    status: "Passout",
  },
  {
    rollNo: "STU-2026-004",
    name: "Diya Nair",
    department: "Management",
    email: "diya@library.edu",
    phone: "+91 65432 10987",
    password: "Diya@2026",
    booksBorrowed: 0,
    status: "Active",
  },
  {
    rollNo: "STU-2026-005",
    name: "Kabir Mehta",
    department: "Microbiology",
    email: "kabir@library.edu",
    phone: "+91 54321 09876",
    password: "Kabir@2026",
    booksBorrowed: 0,
    status: "Active",
  },
];

const getAllStudents = (req, res) => {
  res.status(200).json(studentsList);
};

module.exports = { getAllStudents, studentsList};
