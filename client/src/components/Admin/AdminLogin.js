import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

const AdminLogin = () => {
  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await API.post("/admin/login", form);

    // ✅ STORE LOGIN INFO HERE
    if (!res.data.role) {
  alert("Login failed: role not received");
  return;
}

localStorage.setItem("role", res.data.role);
localStorage.setItem("isAdminLoggedIn", "true");

    // ✅ Redirect to dashboard
    navigate("/admin/dashboard");
  } catch {
    alert("Invalid username or password");
  }
};


  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: "400px",
        margin: "80px auto",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        background: "#fff"
      }}
    >
      <h2 style={{ textAlign: "center" }}>Admin Login</h2>

      <input
        placeholder="Username"
        required
        style={{ width: "100%", padding: "10px", marginBottom: "12px" }}
        onChange={(e) =>
          setForm({ ...form, username: e.target.value })
        }
      />

      <input
        type="password"
        placeholder="Password"
        required
        style={{ width: "100%", padding: "10px", marginBottom: "12px" }}
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />

      <button
        style={{
          width: "100%",
          padding: "12px",
          background: "#1e90ff",
          color: "#fff",
          border: "none",
          borderRadius: "20px",
          fontWeight: "600"
        }}
      >
        Login
      </button>
    </form>
  );
};

export default AdminLogin;
