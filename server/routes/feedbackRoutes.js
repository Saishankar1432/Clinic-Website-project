const express = require("express");
const router = express.Router();
const db = require("../config/db");
const axios = require("axios");
const logActivity = require("../utils/auditLogger");

/* ===============================
   SUBMIT FEEDBACK (WITH CAPTCHA)
================================ */
router.post("/", async (req, res) => {
  const { name, phone, email, message, captchaToken } = req.body;

  console.log("📩 FEEDBACK RECEIVED:", req.body);

  // 1️⃣ Basic validation
  if (!name || !phone || !message) {
    return res.status(400).json({ message: "Required fields missing" });
  }

  if (!captchaToken) {
    return res.status(400).json({ message: "Captcha is required" });
  }

  try {
    // 2️⃣ Verify captcha with Google
    const verifyURL = "https://www.google.com/recaptcha/api/siteverify";

    const captchaRes = await axios.post(verifyURL, null, {
      params: {
        secret: process.env.RECAPTCHA_SECRET_KEY,
        response: captchaToken
      }
    });

    if (!captchaRes.data.success) {
      return res.status(400).json({ message: "Captcha verification failed" });
    }

    // 3️⃣ Insert feedback into DB (your existing logic)
    const query = `
      INSERT INTO feedback (name, phone, email, message)
      VALUES (?, ?, ?, ?)
    `;

    db.query(query, [name, phone, email || null, message], (err) => {
      if (err) {
        console.error("❌ FEEDBACK INSERT ERROR:", err.sqlMessage);
        return res.status(500).json({ message: "Database error" });
      }

      res.json({ message: "Feedback submitted successfully" });
    });
  } catch (error) {
    console.error("❌ CAPTCHA ERROR:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

/* ===============================
   VIEW FEEDBACK (ADMIN)
================================ */
router.get("/", (req, res) => {
  db.query(
    "SELECT * FROM feedback ORDER BY created_at DESC",
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Failed to fetch feedback" });
      }
      res.json(results);
    }
  );
});
/* ===============================
   EXPORT FEEDBACK (ADMIN)
================================ */
router.get("/export/csv", (req, res) => {
  const query = "SELECT * FROM feedback ORDER BY created_at DESC";

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Export failed" });
    }

    let csv = "Name,Phone,Email,Message,Date\n";

    results.forEach(row => {
      csv += `"${row.name}","${row.phone}","${row.email || ""}","${row.message.replace(/"/g, '""')}","${row.created_at}"\n`;
    });

    /* ✅ LOG ACTIVITY HERE */
    logActivity({
      userType: "admin",
      userId: null,                 // use admin id if available
      action: "export_feedback",
      req
    });

    res.header("Content-Type", "text/csv");
    res.attachment("feedback.csv");
    res.send(csv);
  });
});

module.exports = router;
