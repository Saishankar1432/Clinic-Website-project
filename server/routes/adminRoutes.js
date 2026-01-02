const express = require("express");
const router = express.Router();
const db = require("../config/db");
const path = require("path");
const { exec } = require("child_process"); 
const logActivity = require("../utils/auditLogger");
const fs = require("fs");

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

router.get("/backup", (req, res) => {
  const date = new Date().toISOString().split("T")[0];
  const filePath =`C:\\db_backups\\manual-backup-${date}.sql`;

  const command = `"C:\\Program Files\\MySQL\\MySQL Server 8.0\\bin\\mysqldump.exe" -u root -pMysql@532003 paidis_clinic > "C:\\db_backups\\manual-backup-${date}.sql"`;


  exec(command, { shell: true }, (error) => {
    if (error) {
      console.error("❌ BACKUP ERROR:", error);
      return res.status(500).json({ message: "Backup failed" });
    }

    // ✅ Ensure file exists
    if (!fs.existsSync(filePath)) {
      console.error("❌ Backup file not found");
      return res.status(500).json({ message: "Backup file not created" });
    }

    res.download(filePath);
  });
});

module.exports = router;
