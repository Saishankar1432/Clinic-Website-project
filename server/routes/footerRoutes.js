const router = require("express").Router();
const db = require("../config/db");

router.get("/", (req, res) => {
  db.query("SELECT * FROM footer_info WHERE id=1", (e, r) => {
    if (e) return res.status(500).json(e);
    res.json(r[0]);
  });
});

router.put("/", (req, res) => {
  const { description, services, address, phone, email, copyright } = req.body;
  db.query(
    "UPDATE footer_info SET description=?, services=?, address=?, phone=?, email=?, copyright=? WHERE id=1",
    [description, services, address, phone, email, copyright],
    () => res.json({ message: "Footer updated" })
  );
});

module.exports = router;
