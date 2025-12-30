import React, { useEffect, useState } from "react";
import API from "../../services/api";

const ManageAppointments = () => {
  
  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState("");
  const [showToday, setShowToday] = useState(false);

  const loadAppointments = () => {
    API.get("/appointments")
      .then(res => setAppointments(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    loadAppointments();
    const interval = setInterval(loadAppointments, 10000);
    return () => clearInterval(interval);
  }, []);

  const total = appointments.length;
  const pending = appointments.filter(a => a.status === "Pending").length;
  const completed = appointments.filter(a => a.status === "Completed").length;
  const completionRate = total ? Math.round((completed / total) * 100) : 0;
  const today = new Date().toISOString().split("T")[0];

  return (
    <>
      <h2 className="page-title">Appointments</h2>

      <div style={{ display: "flex", gap: 20, marginBottom: 25 }}>
        <div className="admin-card"><b>Total</b><h2>{total}</h2></div>
        <div className="admin-card"><b>Pending</b><h2 style={{ color: "#f39c12" }}>{pending}</h2></div>
        <div className="admin-card"><b>Completed</b><h2 style={{ color: "#2ecc71" }}>{completed}</h2></div>
        <div className="admin-card"><b>Completion</b><h2>{completionRate}%</h2></div>
      </div>

      <input
        placeholder="Search by Token or Phone"
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ padding: 10, width: 280, marginBottom: 15, borderRadius: 10 }}
      />

      <button className="save-btn" onClick={() => setShowToday(!showToday)}>
        {showToday ? "Show All" : "Show Today"}
      </button>

      <button
      onClick={() => window.open("http://localhost:5000/api/appointments/export/csv")}
      className="export-btn"
    >
      ⬇ Export CSV
    </button>

      <table className="admin-table" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Token</th>
            <th>Patient</th>
            <th>Phone</th>
            <th>Service</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {appointments
            .filter(a => {
              const match =
                a.token.toLowerCase().includes(search.toLowerCase()) ||
                a.phone.includes(search);
              if (!showToday) return match;
              return match && a.appointment_date === today;
            })
            .map(a => (
              <tr key={a.id}>
                <td><b>{a.token}</b></td>
                <td>{a.name}</td>
                <td>{a.phone}</td>
                <td>{a.service || a.test}</td>
                <td>{a.appointment_date}</td>
                <td>
                  <span
                    style={{
                      width: 16,
                      height: 16,
                      display: "inline-block",
                      borderRadius: "50%",
                      background: a.status === "Completed" ? "#2ecc71" : "#f39c12"
                    }}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default ManageAppointments;
