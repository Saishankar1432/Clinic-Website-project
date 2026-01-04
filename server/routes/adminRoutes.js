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

router.get("/backup-db", async (req, res) => {
  try {
    const tables = [
      "appointments",
      "doctors",
      "services",
      "feedback",
      "about",
      "contact",
      "footer",
      "pages"
    ];

    const backup = {};

    for (const table of tables) {
      const rows = await new Promise((resolve, reject) => {
        db.query(`SELECT * FROM ${table}`, (err, results) => {
          if (err) reject(err);
          else resolve(results);
        });
      });

      backup[table] = rows;
    }

    res.setHeader("Content-Type", "application/json");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=clinic_database_backup.json"
    );

    res.send(JSON.stringify(backup, null, 2));
  } catch (err) {
    console.error("❌ BACKUP ERROR:", err.message);
    res.status(500).json({ message: "Backup failed" });
  }
});



module.exports = router;
