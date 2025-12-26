import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import API from "../services/api";

const ReceptionCheckin = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log("📷 ReceptionCheckin mounted");

    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      { fps: 10, qrbox: 250 },
      false
    );

    scanner.render(
      async (decodedText) => {
        console.log("✅ QR scanned:", decodedText);

        scanner.clear(); // prevent double scan

        try {
          const res = await API.post("/appointments/checkin", {
            token: decodedText
          });

          // 🔊 Beep
          new Audio("/beep.mp3").play().catch(() => {});

          setMessage(res.data.message);
        } catch (err) {
          setMessage(
            err.response?.data?.message || "Invalid token"
          );
        }
      },
      () => {}
    );

    return () => {
      scanner.clear().catch(() => {});
    };
  }, []);

  return (
    <div style={card}>
      <h2>Patient Check-In</h2>

      {/* CAMERA */}
      <div id="qr-reader" style={{ width: 300, margin: "20px auto" }} />

      {message && (
        <p style={{ marginTop: 15, fontWeight: 600 }}>
          {message}
        </p>
      )}
    </div>
  );
};

export default ReceptionCheckin;

/* styles */
const card = {
  maxWidth: 420,
  margin: "40px auto",
  padding: 30,
  background: "#fff",
  borderRadius: 20,
  boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
  textAlign: "center"
};
