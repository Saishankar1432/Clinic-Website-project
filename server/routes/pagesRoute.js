const express = require("express");
const router = express.Router();
const db = require("../config/db");

/* ===========================
   GET PAGE (ABOUT / CONTACT)
=========================== */
router.get("/:page", (req, res) => {
  const page = req.params.page;

  db.query(
    "SELECT * FROM pages WHERE page = ?",
    [page],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result[0]);
    }
  );
});

/* ===========================
   UPDATE PAGE (ADMIN CMS)
=========================== */
router.put("/:page", (req, res) => {
  const page = req.params.page;
  const { title, content, founder, qualification, bullets } = req.body;

  db.query(
    `UPDATE pages 
     SET title=?, content=?, founder=?, qualification=?, bullets=? 
     WHERE page=?`,
    [title, content, founder, qualification, bullets, page],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Page updated successfully" });
    }
  );
});

module.exports = router;
