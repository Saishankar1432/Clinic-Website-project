const router = require("express").Router();
const db = require("../config/db");

router.get("/", (req, res) => {
  db.query("SELECT * FROM contact_info WHERE id=1", (e, r) => {
    if (e) return res.status(500).json(e);
    res.json(r[0]);
  });
});

router.put("/", (req, res) => {
  const { address, phone, email, hours, emergency } = req.body;
  db.query(
    "UPDATE contact_info SET address=?, phone=?, email=?, hours=?, emergency=? WHERE id=1",
    [address, phone, email, hours, emergency],
    () => res.json({ message: "Contact updated" })
  );
});

module.exports = router;
