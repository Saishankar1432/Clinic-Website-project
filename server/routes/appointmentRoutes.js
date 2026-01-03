const express = require("express");
const router = express.Router();
const db = require("../config/db");
const QRCode = require("qrcode");
const sendEmail = require("../utils/email");

/* ===============================
   TOKEN GENERATOR
================================ */
const generateToken = (type) => {
  const num = Math.floor(100 + Math.random() * 900);
  return `${type.toUpperCase()}-${num}`;
};

/* ===============================
   BOOK APPOINTMENT
================================ */
router.post("/", async (req, res) => {
  const {
    name,
    phone,
    email,
    type,
    doctor,
    test,
    address,
    appointment_date,
    notes
  } = req.body;

  if (!name || !phone || !type) {
    return res.status(400).json({ message: "Required fields missing" });
  }

  let service = null;
  let labTest = null;

  const cleanPhone = phone.replace(/[^0-9+]/g, "").trim();

  if (type === "doctor" || type === "emergency") {
    if (!doctor || !appointment_date) {
      return res.status(400).json({ message: "Doctor and date required" });
    }
    service = doctor;
  }

  if (type === "lab") {
    labTest = test || null;
  }

  if (type === "pharmacy") {
    service = "Pharmacy Request";
  }

  const token = generateToken(type);

  const query = `
    INSERT INTO appointments
    (name, phone, email, service, test, appointment_date, token, type, address, notes, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Pending')
  `;

  const values = [
    name,
    cleanPhone,
    email || null,
    service,
    labTest,
    appointment_date || null,
    token,
    type,
    address || null,
    notes || null
  ];

  db.query(query, values, async (err) => {
    if (err) {
      console.error("DB ERROR:", err);
      return res.status(500).json({ message: "Database error" });
    }

    /* ===== GENERATE QR (BUFFER) ===== */
let qrBuffer = null;
try {
  qrBuffer = await QRCode.toBuffer(token);
} catch (e) {
  console.error("QR ERROR:", e.message);
}

/* ===== SEND EMAIL (BOOKING) ===== */
if (email && qrBuffer) {
  await sendEmail(
    email,
    "Appointment Confirmed – Paidi's Clinic",
    `
    <h2>Paidi's Clinic</h2>
    <p>Hello <b>${name}</b>,</p>

    <p>Your appointment has been booked successfully.</p>

    <p><b>Token:</b> ${token}</p>
    <p><b>Date:</b> ${appointment_date || "-"}</p>

    <p>Show this QR at reception:</p>
    <img src="cid:qr-code"/>

    <p>Regards,<br/>Paidi's Clinic</p>
    `,
    [
      {
        filename: "token-qr.png",
        content: qrBuffer,
        cid: "qr-code",
      },
    ]
  );
}

res.json({
      message: "Appointment booked successfully",
      token
    });
  });
});

/* ===============================
   VIEW APPOINTMENTS (ADMIN)
================================ */
router.get("/", (req, res) => {
  db.query(
    "SELECT * FROM appointments ORDER BY created_at DESC",
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Failed to fetch appointments" });
      }
      res.json(results);
    }
  );
});

/* ===============================
   CHECK-IN (QR SCAN)
================================ */
router.post("/checkin", (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ message: "Token required" });
  }

  db.query(
    "SELECT * FROM appointments WHERE token = ?",
    [token],
    async (err, results) => {
      if (err || results.length === 0) {
        return res.status(404).json({ message: "Invalid token" });
      }

      const appt = results[0];

      if (appt.status === "Completed") {
        return res.status(400).json({ message: "Already completed" });
      }

      db.query(
        "UPDATE appointments SET status='Completed' WHERE token=?",
        [token],
        async () => {

          /* ===== SEND EMAIL (CHECK-IN SUCCESS) ===== */
          if (appt.email) {
  await sendEmail(
    appt.email,
    "Visit Completed – Paidi's Clinic",
    `
    <h2>Paidi's Clinic</h2>
    <p>Hello <b>${appt.name}</b>,</p>

    <p>✅ Your visit has been completed successfully.</p>

    <p><b>Token:</b> ${token}</p>

    <p>Thank you for visiting Paidi's Clinic.</p>
    `
  );
}


          res.json({
            message: "Check-in successful. Appointment completed."
          });
        }
      );
    }
  );
});

/* ===============================
   EXPORT APPOINTMENTS (ADMIN)
================================ */
router.get("/export/csv", (req, res) => {
  const query = `
    SELECT token, name, phone, service, test, appointment_date, status
    FROM appointments
    ORDER BY appointment_date DESC
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("❌ EXPORT ERROR:", err);
      return res.status(500).json({ message: "Export failed" });
    }

    let csv =
      "Token,Patient,Phone,Service/Test,Date,Status\n";

    results.forEach(row => {
      csv += `"${row.token}","${row.name}","${row.phone}","${row.service || row.test || ""}","${row.appointment_date || ""}","${row.status}"\n`;
    });

    res.header("Content-Type", "text/csv");
    res.attachment("appointments.csv");
    res.send(csv);
  });
});


module.exports = router;
