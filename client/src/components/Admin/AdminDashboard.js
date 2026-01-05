import React, { useState, useLayoutEffect, useEffect } from "react";
import "./Admin.css";

import ManageClinic from "./ManageClinic";
import ManageDoctors from "./ManageDoctors";
import ManageServices from "./ManageServices";
import ManageAppointments from "./ManageAppointments";
import ManageAbout from "./ManageAbout";
import ManageContact from "./ManageContact";
import ManageFeedback from "./ManageFeedback";
import ManageFooter from "./ManageFooter";
import ManageMedicineOrders from "./ManageMedicineOrders";

import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState(null);
  const [page, setPage] = useState(null);

  /* 🔐 AUTH CHECK */
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    const isLoggedIn = localStorage.getItem("isAdminLoggedIn");

    if (!isLoggedIn || !storedRole) {
      navigate("/admin");
      return;
    }

    setRole(storedRole);
    setPage(storedRole === "pharmacy" ? "orders" : "clinic");
  }, [navigate]);

  /* 🏷️ PAGE TITLE */
  useLayoutEffect(() => {
    if (!page) return;

    const titles = {
      clinic: "Admin | Clinic",
      doctors: "Admin | Doctors",
      services: "Admin | Services",
      appointments: "Admin | Appointments",
      about: "Admin | About",
      contact: "Admin | Contact",
      feedback: "Admin | Feedback",
      footer: "Admin | Footer",
      orders: "Pharmacy | Medicine Orders"
    };

    document.title = titles[page] || "Admin Panel";
  }, [page]);

  /* ⏳ LOADING STATE (IMPORTANT) */
  if (!role || !page) {
    return <div style={{ padding: "40px" }}>Loading admin panel...</div>;
  }

  return (
    <div className="admin-layout">
      {/* ===== SIDEBAR ===== */}
      <div className="admin-sidebar">
        <h2>Admin Panel</h2>

        {/* ===== ADMIN MENU ===== */}
        {role === "admin" && (
          <>
            <p onClick={() => setPage("clinic")} className={page==="clinic"?"active":""}>🏥 Clinic</p>
            <p onClick={() => setPage("doctors")} className={page==="doctors"?"active":""}>👨‍⚕️ Doctors</p>
            <p onClick={() => setPage("services")} className={page==="services"?"active":""}>🧪 Services</p>
            <p onClick={() => setPage("appointments")} className={page==="appointments"?"active":""}>📅 Appointments</p>
            <p onClick={() => setPage("about")} className={page==="about"?"active":""}>ℹ️ About</p>
            <p onClick={() => setPage("contact")} className={page==="contact"?"active":""}>📞 Contact</p>
            <p onClick={() => setPage("feedback")} className={page==="feedback"?"active":""}>📝 Feedback</p>
            <p onClick={() => setPage("footer")} className={page==="footer"?"active":""}>📌 Footer</p>

            <button
              className="backup-btn"
              onClick={() =>
                window.open(
                  `${process.env.REACT_APP_API_URL}/admin/backup-db`,
                  "_blank"
                )
              }
            >
              🗄️ Database Backup
            </button>
          </>
        )}

        {/* ===== PHARMACY MENU ===== */}
        {role === "pharmacy" && (
          <p onClick={() => setPage("orders")} className={page==="orders"?"active":""}>
            💊 Medicine Orders
          </p>
        )}

        {/* LOGOUT */}
        <button
          className="logout-btn"
          onClick={() => {
            localStorage.clear();
            navigate("/admin");
          }}
        >
          🚪 Logout
        </button>
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="admin-main">
        <div className="admin-page">

          {role === "admin" && page === "clinic" && <ManageClinic />}
          {role === "admin" && page === "doctors" && <ManageDoctors />}
          {role === "admin" && page === "services" && <ManageServices />}
          {role === "admin" && page === "appointments" && <ManageAppointments />}
          {role === "admin" && page === "about" && <ManageAbout />}
          {role === "admin" && page === "contact" && <ManageContact />}
          {role === "admin" && page === "feedback" && <ManageFeedback />}
          {role === "admin" && page === "footer" && <ManageFooter />}

          {role === "pharmacy" && page === "orders" && <ManageMedicineOrders />}

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
