const express = require("express");
const router = express.Router();
const db = require("../config/db");

/* ===============================
   ADMIN LOGIN (CMS)
================================ */
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.query(
    "SELECT * FROM admin WHERE username = ? AND password = ?",
    [username, password],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (result.length === 0) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      res.json({ message: "Login successful" });
    }
  );
  const logActivity = require("../utils/auditLogger");

router.post("/login", (req, res) => {
  // after password validation success

  logActivity({
    userType: "admin",
    userId: admin.id,
    action: "admin_login",
    req
  });

  res.json({ message: "Login successful" });
});

});

/* ===============================
   VIEW AUDIT LOGS (ADMIN)
================================ */
router.get("/logs", (req, res) => {
  db.query(
    "SELECT * FROM audit_logs ORDER BY created_at DESC",
    (err, results) => {
      if (err) {
        console.error("❌ LOG FETCH ERROR:", err);
        return res.status(500).json({ message: "Failed to fetch logs" });
      }
      res.json(results);
    }
  );
});


module.exports = router;
