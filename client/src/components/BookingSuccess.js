import React from "react";
import { QRCodeCanvas } from "qrcode.react";

const BookingSuccess = ({ token, date, time, onClose }) => {
  return (
    <div style={overlay}>
      <div style={card}>
        <button onClick={onClose} style={closeBtn}>×</button>

        <h2 style={{ color: "#2ecc71" }}>✓ Appointment Booked</h2>

        <p><b>Token:</b> {token}</p>
        <p><b>Date:</b> {date}</p>
        <p><b>Time:</b> {time}</p>

        {/* ✅ QR CODE */}
        <div style={{ margin: "20px 0" }}>
          <QRCodeCanvas value={token} size={180} />
        </div>

        <p style={{ fontWeight: 600 }}>
          Show this QR at reception
        </p>

        <h2 style={{ color: "#1e90ff" }}>{token}</h2>
      </div>
    </div>
  );
};

export default BookingSuccess;

/* ---------- styles ---------- */
const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000
};

const card = {
  background: "#fff",
  padding: 30,
  borderRadius: 16,
  textAlign: "center",
  width: 360,
  position: "relative"
};

const closeBtn = {
  position: "absolute",
  top: 10,
  right: 15,
  border: "none",
  background: "transparent",
  fontSize: 24,
  cursor: "pointer"
};
