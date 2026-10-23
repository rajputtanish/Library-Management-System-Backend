const studentsList = [
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
    department: "English Literature",
    email: "ananya@library.edu",
    phone: "+91 87654 32109",
    booksBorrowed: 0,
    status: "Active",
  },
  {
    rollNo: "STU-2026-003",
    name: "Rohan Verma",
    department: "Physics",
    email: "rohan@library.edu",
    phone: "+91 76543 21098",
    booksBorrowed: 0,
    status: "Suspended",
  },
  {
    rollNo: "STU-2026-004",
    name: "Diya Nair",
    department: "Social Sciences",
    email: "diya@library.edu",
    phone: "+91 65432 10987",
    booksBorrowed: 0,
    status: "Active",
  },
  {
    rollNo: "STU-2026-005",
    name: "Kabir Mehta",
    department: "Computer Science",
    email: "kabir@library.edu",
    phone: "+91 54321 09876",
    booksBorrowed: 0,
    status: "Active",
  },
];

const getAllStudents = (req, res) => {
  res.status(200).json(studentsList);
};

module.exports = { getAllStudents, studentsList };
