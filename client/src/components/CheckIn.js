import React, { useState } from "react";
import API from "../services/api";

const CheckIn = () => {
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");

  const handleCheckIn = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/appointments/checkin", { token });
      setMessage(res.data.message);
      setToken("");
    } catch (err) {
      setMessage(
        err.response?.data?.message || "Check-in failed"
      );
    }
  };

  return (
    <div style={{
      maxWidth: 400,
      margin: "100px auto",
      padding: 30,
      background: "#fff",
      borderRadius: 20,
      boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
    }}>
      <h2 style={{ textAlign: "center" }}>Patient Check-In</h2>

      <form onSubmit={handleCheckIn}>
        <input
          placeholder="Enter Token (e.g. DOC-123)"
          value={token}
          onChange={e => setToken(e.target.value)}
          required
          style={{
            width: "100%",
            padding: 12,
            marginBottom: 15,
            borderRadius: 10,
            border: "1px solid #ccc"
          }}
        />

        <button style={{
          width: "100%",
          padding: 12,
          borderRadius: 20,
          background: "#1e90ff",
          color: "#fff",
          border: "none",
          fontWeight: "600"
        }}>
          Check In
        </button>
      </form>

      {message && (
        <p style={{
          marginTop: 15,
          textAlign: "center",
          fontWeight: 600
        }}>
          {message}
        </p>
      )}
    </div>
  );
};

export default CheckIn;
