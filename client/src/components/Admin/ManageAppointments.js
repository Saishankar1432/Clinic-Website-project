import React, { useEffect, useState } from "react";
import API from "../../services/api";

const ManageAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState("");
  const [filterDate, setFilterDate] = useState(""); // 👈 NEW

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

  /* ===== DATE HELPERS ===== */
  const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

  const today = () =>
    new Date().toISOString().split("T")[0];

  const tomorrow = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  };

  /* ===== STATS ===== */
  const total = appointments.length;
  const pending = appointments.filter(a => a.status === "Pending").length;
  const completed = appointments.filter(a => a.status === "Completed").length;
  const completionRate = total ? Math.round((completed / total) * 100) : 0;

  /* ===== FILTERED DATA ===== */
  const filteredAppointments = appointments.filter(a => {
    const matchSearch =
      a.token.toLowerCase().includes(search.toLowerCase()) ||
      a.phone.includes(search);

    if (!filterDate) return matchSearch;

    return (
      matchSearch &&
      formatDate(a.appointment_date) === filterDate
    );
  });

  return (
    <>
      <h2 className="page-title">Appointments</h2>

      {/* ===== STATS ===== */}
      <div style={{ display: "flex", gap: 20, marginBottom: 25 }}>
        <div className="admin-card"><b>Total</b><h2>{total}</h2></div>
        <div className="admin-card"><b>Pending</b><h2 style={{ color: "#f39c12" }}>{pending}</h2></div>
        <div className="admin-card"><b>Completed</b><h2 style={{ color: "#2ecc71" }}>{completed}</h2></div>
        <div className="admin-card"><b>Completion</b><h2>{completionRate}%</h2></div>
      </div>

      {/* ===== SEARCH + FILTERS ===== */}
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <input
          placeholder="Search by Token or Phone"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ padding: 10, width: 260, borderRadius: 10 }}
        />

        <button className="save-btn" onClick={() => setFilterDate(today())}>
          Today
        </button>

        <button className="save-btn" onClick={() => setFilterDate(tomorrow())}>
          Tomorrow
        </button>

        <input
          type="date"
          value={filterDate}
          onChange={e => setFilterDate(e.target.value)}
          style={{ padding: 10, borderRadius: 10 }}
        />

        <button className="save-btn" onClick={() => setFilterDate("")}>
          Clear
        </button>

        <button
          onClick={() => window.open(`${process.env.REACT_APP_API_URL}/appointments/export/csv`,
  "_blank")}
          className="export-btn"
        >
          ⬇ Export CSV
        </button>
      </div>

      {/* ===== COUNT ===== */}
      <p style={{ marginTop: 10 }}>
        Appointments: <b>{filteredAppointments.length}</b>
      </p>

      {/* ===== TABLE ===== */}
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
          {filteredAppointments.map(a => (
            <tr key={a.id}>
              <td><b>{a.token}</b></td>
              <td>{a.name}</td>
              <td>{a.phone}</td>
              <td>{a.service || a.test}</td>
              <td>{formatDate(a.appointment_date)}</td>
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
