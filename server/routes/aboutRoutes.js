const router = require("express").Router();
const db = require("../config/db");

router.get("/", (req, res) => {
  db.query("SELECT * FROM about_info WHERE id=1", (e, r) => {
    if (e) return res.status(500).json(e);
    res.json(r[0]);
  });
});

router.put("/", (req, res) => {
  const { title, description, founder_name, founder_qualification, points } = req.body;
  db.query(
    "UPDATE about_info SET title=?, description=?, founder_name=?, founder_qualification=?, points=? WHERE id=1",
    [title, description, founder_name, founder_qualification, points],
    () => res.json({ message: "About updated" })
  );
});

module.exports = router;
