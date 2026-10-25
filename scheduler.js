const cron = require("node-cron");
const nodemailer = require("nodemailer");
const { booksIssueList } = require("./controllers/bookBorrowed");
const { studentsList } = require("./controllers/student");
const { booksList } = require("./controllers/book");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "your-email@gmail.com", 
    pass: "your-app-password",    
  },
});

const LOAN_PERIOD_DAYS = 14;
const FINE_PER_DAY = 10;

// 1. Extract the logic into a standalone function
const runDailyChecks = () => {
  console.log("Running manual/test due date and fine check...");
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);

  const activeIssues = booksIssueList.filter((issue) => issue.returnTime === null);

  activeIssues.forEach(async (issue) => {
    const borrowDate = new Date(issue.borrowTime);
    const dueDate = new Date(borrowDate.getTime() + LOAN_PERIOD_DAYS * 24 * 60 * 60 * 1000);
    dueDate.setHours(0, 0, 0, 0);

    const student = studentsList.find((s) => s.rollNo === issue.studentId);
    const book = booksList.find((b) => b.id === issue.bookId);

    if (!student || !book) return;

    // Alert 1: Book Due Tomorrow
    if (dueDate.getTime() === tomorrow.getTime()) {
      try {
        await transporter.sendMail({
          from: "library-admin@university.edu",
          to: student.email,
          subject: "Test Alert: Book Due Tomorrow",
          text: `Hi ${student.name},\n\nYour borrowed book "${book.title}" is due tomorrow.`,
        });
        console.log(`Success: Pre-due email sent to ${student.email}`);
      } catch (err) {
        console.error("Email failed:", err);
      }
    }

    // Alert 2: Overdue Warning
    if (today > dueDate) {
      const overdueDays = Math.ceil(Math.abs(today - dueDate) / (1000 * 60 * 60 * 24));
      const currentFine = overdueDays * FINE_PER_DAY;
      
      try {
        await transporter.sendMail({
          from: "library-admin@university.edu",
          to: student.email,
          subject: `Test URGENT: Book Overdue - Fine (₹${currentFine})`,
          text: `Hi ${student.name},\n\nYour book "${book.title}" is OVERDUE by ${overdueDays} days. Fine: ₹${currentFine}.`,
        });
        console.log(`Success: Overdue email sent to ${student.email}`);
      } catch (err) {
        console.error("Email failed:", err);
      }
    }
  });
};

const startCronJobs = () => {
  // TEST METHOD 1: Run exactly once immediately when you save/restart the server
  runDailyChecks();

  // TEST METHOD 2: Run every minute (instead of 8 AM)
  // Change "* * * * *" back to "0 8 * * *" for production
  cron.schedule("* * * * *", () => {
    runDailyChecks();
  });
};

module.exports = startCronJobs;