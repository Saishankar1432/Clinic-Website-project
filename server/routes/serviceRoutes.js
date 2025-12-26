const express = require("express");
const router = express.Router();
const db = require("../config/db");

/* =====================
   GET ALL SERVICES
===================== */
router.get("/", (req, res) => {
  db.query("SELECT * FROM services", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

/* =====================
   ADD SERVICE
===================== */
router.post("/", (req, res) => {
  const { title, description, category, image, timing } = req.body;

  db.query(
    "INSERT INTO services (title, description, category, image, timing) VALUES (?, ?, ?, ?, ?)",
    [title, description, category, image, timing],
    err => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Service added successfully" });
    }
  );
});

/* =====================
   UPDATE SERVICE
===================== */
router.put("/:id", (req, res) => {
  const { title, description, category, image, timing } = req.body;

  db.query(
    "UPDATE services SET title=?, description=?, category=?, image=?, timing=? WHERE id=?",
    [title, description, category, image, timing, req.params.id],
    err => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Service updated" });
    }
  );
});

/* =====================
   DELETE SERVICE
===================== */
router.delete("/:id", (req, res) => {
  db.query(
    "DELETE FROM services WHERE id=?",
    [req.params.id],
    err => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Service deleted" });
    }
  );
});

module.exports = router;
