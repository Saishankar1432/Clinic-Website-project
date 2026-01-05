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
        console.error("❌ LOGIN ERROR:", err.message);
        return res.status(500).json({ message: "Server error" });
      }

      if (result.length === 0) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // ✅ LOG ACTIVITY
      logActivity({
        userType: "admin",
        userId: result[0].id,
        action: "admin_login",
        req
      });

      res.json({
  message: "Login successful",
  role: result[0].role
});
    }
  );
});

/* ===============================
   VIEW AUDIT LOGS (ADMIN)
================================ */
router.get("/logs", (req, res) => {
  db.query(
    "SELECT * FROM audit_logs ORDER BY created_at DESC",
    (err, results) => {
      if (err) {
        console.error("❌ LOG FETCH ERROR:", err.message);
        return res.status(500).json({ message: "Failed to fetch logs" });
      }
      res.json(results);
    }
  );
});

/* ===============================
   DATABASE BACKUP (ADMIN)
   ✅ SAFE JSON EXPORT (RENDER FRIENDLY)
================================ */
router.get("/backup-db", async (req, res) => {
  try {
    // ✅ ONLY EXISTING TABLES
    const tables = [
      "appointments",
      "doctors",
      "services",
      "feedback",
      "footer"
    ];

    const backup = {};

    for (const table of tables) {
      const rows = await new Promise((resolve, reject) => {
        db.query(`SELECT * FROM ${table}`, (err, results) => {
          if (err) {
            console.error(`❌ TABLE ERROR (${table}):`, err.message);
            reject(err);
          } else {
            resolve(results);
          }
        });
      });

      backup[table] = rows;
    }

    // ✅ LOG ACTIVITY
    logActivity({
      userType: "admin",
      userId: null,
      action: "database_backup",
      req
    });

    res.setHeader("Content-Type", "application/json");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=clinic_database_backup.json"
    );

    res.send(JSON.stringify(backup, null, 2));
  } catch (err) {
    console.error("🔥 BACKUP FAILED:", err.message);
    res.status(500).json({ message: "Backup failed" });
  }
});

module.exports = router;
