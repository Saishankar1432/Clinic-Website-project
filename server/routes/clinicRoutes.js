const express = require("express");
const router = express.Router();
const db = require("../config/db");

/* ===============================
   GET CLINIC INFO (Frontend)
================================ */
router.get("/", (req, res) => {
  db.query("SELECT * FROM clinic_info WHERE id = 1", (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(result[0]);
  });
});

/* ===============================
   UPDATE CLINIC INFO (Admin CMS)
================================ */
router.put("/", (req, res) => {
  const { name, tagline, about } = req.body;

  db.query(
    "UPDATE clinic_info SET name=?, tagline=?, about=? WHERE id=1",
    [name, tagline, about],
    (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: "Clinic info updated successfully" });
    }
  );
});

module.exports = router;
