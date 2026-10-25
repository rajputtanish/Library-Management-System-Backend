const cron = require("node-cron");
const nodemailer = require("nodemailer");
const IssueRecord = require("./models/IssueRecord");
const Student = require("./models/Student");
const Book = require("./models/Book");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

const LOAN_PERIOD_DAYS = 14; // Adjust to match your policy

const runDailyChecks = async () => {
  try {
    console.log("Running manual/test due date and fine check...");

    // 1. Fetch all active loans directly from MongoDB
    const activeIssues = await IssueRecord.find({ returnTime: null });

    for (const issue of activeIssues) {
      const borrowDate = new Date(issue.borrowTime);
      const today = new Date();
      const diffTime = Math.abs(today - borrowDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      // 2. Check if the book is overdue
      if (diffDays > LOAN_PERIOD_DAYS) {
        // Fetch the associated student and book details
        const student = await Student.findOne({ rollNo: issue.studentId });
        const book = await Book.findOne({ id: issue.bookId });

        if (student && book) {
          const daysOverdue = diffDays - LOAN_PERIOD_DAYS;
          
          console.log(`Sending overdue alert to ${student.email} for ${book.title}...`);
          
          // Uncomment below to actually send the emails
          /*
          await transporter.sendMail({
            from: process.env.GMAIL_USER,
            to: student.email,
            subject: "Overdue Library Book Alert",
            text: `Hello ${student.name},\n\nYour borrowed book "${book.title}" (ID: ${book.id}) is ${daysOverdue} days overdue. Please return it as soon as possible to avoid further fines.\n\nThank you,\nLibrary Administration`,
          });
          */
        }
      }
    }
    console.log("Due date check complete.");
  } catch (error) {
    console.error("Error in scheduled task:", error);
  }
};

const startCronJobs = () => {
  // Run immediately on server start for testing
  runDailyChecks();

  // Schedule to run every day at 8:00 AM
  cron.schedule("0 8 * * *", () => {
    runDailyChecks();
  });
  
  console.log("Scheduler initialized: Background tasks ready.");
};

module.exports = startCronJobs;