const express = require("express");
const router = express.Router();
const db = require("../config/db");
const logActivity = require("../utils/auditLogger");

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

/* ===============================
   EXPORT DOCTORS (ADMIN)
================================ */
router.get("/export/csv", (req, res) => {
  const query = "SELECT * FROM doctors";
logActivity({
  userType: "admin",
  userId: null,
  action: "export_doctors",
  req
});

  db.query(query, (err, results) => {
    if (err) {
      console.error("❌ EXPORT ERROR:", err);
      return res.status(500).json({ message: "Export failed" });
    }

    let csv =
      "Name,Specialization,Qualification,Experience,Hours,Image\n";

    results.forEach(row => {
      csv += `"${row.name}","${row.specialization}","${row.qualification}","${row.experience}","${row.hours}","${row.image}"\n`;
    });

    /* ✅ LOG ACTIVITY HERE */
    logActivity({
      userType: "admin",
      userId: null,                 // use admin id if available
      action: "export_doctors",
      req
    });

    res.header("Content-Type", "text/csv");
    res.attachment("doctors.csv");
    res.send(csv);
  });
});


module.exports = router;
