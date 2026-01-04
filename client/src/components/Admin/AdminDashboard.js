import React, { useState, useLayoutEffect } from "react";
import "./Admin.css";
import ManageClinic from "./ManageClinic";
import ManageDoctors from "./ManageDoctors";
import ManageServices from "./ManageServices";
import ManageAppointments from "./ManageAppointments";
import ManageAbout from "./ManageAbout";
import ManageContact from "./ManageContact";
import ManageFeedback from "./ManageFeedback";
import ManageFooter from "./ManageFooter";

import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [page, setPage] = useState("clinic");
  const navigate = useNavigate();
  useLayoutEffect(() => {
  const titles = {
    clinic: "Admin | Clinic",
    doctors: "Admin | Doctors",
    services: "Admin | Services",
    appointments: "Admin | Appointments",
    about: "Admin | About",
    contact: "Admin | Contact",
    feedback: "Admin | Feedback",
    footer: "Admin | Footer"
  };

  document.title = titles[page] || "Admin Panel";
}, [page]);

  return (
    <div className="admin-layout">
      <div className="admin-sidebar">
        <h2>Admin Panel</h2>

        <p className={page==="clinic"?"active":""} onClick={()=>setPage("clinic")}>🏥 Clinic</p>
        <p className={page==="doctors"?"active":""} onClick={()=>setPage("doctors")}>👨‍⚕️ Doctors</p>
        <p className={page==="services"?"active":""} onClick={()=>setPage("services")}>🧪 Services</p>
        <p className={page==="appointments"?"active":""} onClick={()=>setPage("appointments")}>📅 Appointments</p>
        <p className={page==="about"?"active":""} onClick={()=>setPage("about")}>ℹ️ About</p>
        <p className={page==="contact"?"active":""} onClick={()=>setPage("contact")}>📞 Contact</p>
        <p className={page==="feedback"?"active":""} onClick={()=>setPage("feedback")}>📝 Feedback</p>
        <p className={page==="footer"?"active":""} onClick={()=>setPage("footer")}>📌 Footer</p>

       <button
  className="backup-btn"
  onClick={() => {
    if (window.confirm("Do you want to backup the entire database now?")) {
      window.open(
        `${process.env.REACT_APP_API_URL}/api/admin/backup-db`,
        "_blank"
      );
    }
  }}
>
  🗄️ Database Backup
</button>



        <button className="logout-btn" onClick={()=>navigate("/admin")}>🚪 Logout</button>
      </div>

      <div className="admin-main">
        <div className="admin-page">
          {page==="clinic" && <ManageClinic />}
          {page==="doctors" && <ManageDoctors />}
          {page==="services" && <ManageServices />}
          {page==="appointments" && <ManageAppointments />}
          {page==="about" && <ManageAbout />}
          {page==="contact" && <ManageContact />}
          {page === "feedback" && <ManageFeedback />}
          {page==="footer" && <ManageFooter />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
