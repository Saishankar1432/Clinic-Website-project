const express = require("express");
const router = express.Router();
const db = require("../config/db");

/* =========================
   GET ALL DOCTORS (Frontend)
========================= */
router.get("/", (req, res) => {
  db.query("SELECT * FROM doctors", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

/* =========================
   ADD DOCTOR (Admin CMS)
========================= */
router.post("/", (req, res) => {
  const { name, specialization, qualification, experience, hours } = req.body;

  db.query(
    "INSERT INTO doctors (name, specialization, qualification, experience, hours) VALUES (?, ?, ?, ?, ?)",
    [name, specialization, qualification, experience, hours],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Doctor added successfully" });
    }
  );
});

/* ==========================
   UPDATE DOCTOR
========================== */
router.put("/:id", (req, res) => {
  const { name, specialization, qualification, experience, hours, image } = req.body;

  const sql = `
    UPDATE doctors SET
      name = ?,
      specialization = ?,
      qualification = ?,
      experience = ?,
      hours = ?,
      image = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [name, specialization, qualification, experience, hours, image, req.params.id],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json(err);
      }
      res.json({ message: "Doctor updated successfully" });
    }
  );
});


/* =========================
   DELETE DOCTOR
========================= */
router.delete("/:id", (req, res) => {
  db.query(
    "DELETE FROM doctors WHERE id=?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Doctor deleted successfully" });
    }
  );
});

module.exports = router;
