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
});

module.exports = router;
