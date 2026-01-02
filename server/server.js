const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 5000;
const feedbackRoutes = require("./routes/feedbackRoutes");
const cron = require("node-cron");
const backupDB = require("./backup/dbBackup");

app.use(cors());
app.use(express.json());

app.use("/api/clinic", require("./routes/clinicRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/doctors", require("./routes/doctorRoutes"));
app.use("/api/services", require("./routes/serviceRoutes"));
app.use("/api/about", require("./routes/aboutRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));
app.use("/api/footer", require("./routes/footerRoutes"));
app.use("/api/pages", require("./routes/pagesRoute")); 
app.use("/api/appointments", require("./routes/appointmentRoutes"));
app.use("/api/feedback", require("./routes/feedbackRoutes"));


app.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "Clinic API is running 🚀"
  });
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});


// Daily DB backup at 2:00 AM
cron.schedule("0 2 * * *", () => {
  console.log("⏰ Running daily database backup...");
  backupDB();
});
