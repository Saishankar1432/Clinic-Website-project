const express = require("express");
const router = express.Router();
const db = require("../config/db");
const multer = require("multer");

// storage config
const storage = multer.diskStorage({
  destination: "uploads/prescriptions",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

/* CUSTOMER UPLOAD */
router.post("/order", upload.single("prescription"), (req, res) => {
  const { customer_name, customer_phone } = req.body;
  const prescription = req.file.filename;

  db.query(
    "INSERT INTO medicine_orders (customer_name, customer_phone, prescription) VALUES (?, ?, ?)",
    [customer_name, customer_phone, prescription],
    () => res.json({ message: "Order placed successfully" })
  );
});

/* ADMIN / PHARMACY VIEW */
router.get("/orders", (req, res) => {
  db.query("SELECT * FROM medicine_orders ORDER BY created_at DESC", (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

module.exports = router;
