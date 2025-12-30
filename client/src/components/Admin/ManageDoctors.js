import React, { useEffect, useState } from "react";
import API from "../../services/api";

const empty = {
  name: "",
  specialization: "",
  qualification: "",
  experience: "",
  hours: "",
  image: "",
  emoji: ""
};

const ManageDoctors = () => {
 
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);

  // LOAD DOCTORS
  const load = () => {
    API.get("/doctors")
      .then(res => setDoctors(res.data))
      .catch(err => console.error(err));
  };

  // ✅ FIXED useEffect (NO RETURN VALUE)
  useEffect(() => {
    load();
  }, []);

  // ADD / UPDATE DOCTOR
  const submit = (e) => {
    e.preventDefault();

    const req = editId
      ? API.put(`/doctors/${editId}`, form)
      : API.post("/doctors", form);

    req.then(() => {
      setForm(empty);
      setEditId(null);
      load();
    });
  };

  

  return (
    <>
      <h2 className="page-title">
        {editId ? "Edit Doctor" : "Add Doctor"}
      </h2>

      <form className="admin-form grid-form" onSubmit={submit}>
        <input
          placeholder="Doctor Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          placeholder="Specialization"
          value={form.specialization}
          onChange={e => setForm({ ...form, specialization: e.target.value })}
          required
        />
        <select
  value={form.emoji}
  onChange={e => setForm({ ...form, emoji: e.target.value })}
  required
>
  <option value="">Select Emoji</option>
  <option value="🧠">🧠 Neurologist</option>
  <option value="🩺">🩺 General Physician</option>
  <option value="❤️">❤️ Cardiologist</option>
  <option value="🎗️">🎗️ Oncologist</option>
  <option value="🫀">🫀 Cardiothoracic</option>
  <option value="🦷">🦷 Dentist</option>
  <option value="👂">👂 ENT</option>
  <option value="👁️">👁️ Ophthalmologist</option>
  <option value="🦴">🦴 Orthopedic</option>
</select>



        <input
          placeholder="Qualification"
          value={form.qualification}
          onChange={e => setForm({ ...form, qualification: e.target.value })}
          required
        />

        <input
          placeholder="Experience"
          value={form.experience}
          onChange={e => setForm({ ...form, experience: e.target.value })}
          required
        />

        <input
          placeholder="Visiting Hours"
          value={form.hours}
          onChange={e => setForm({ ...form, hours: e.target.value })}
          required
        />

        <select
          value={form.image}
          onChange={e => setForm({ ...form, image: e.target.value })}
          required
        >
          <option value="">Select Image</option>
          <option value="doctor1.jpg">Doctor Image 1</option>
          <option value="doctor2.jpg">Doctor Image 2</option>
          <option value="doctor3.jpg">Doctor Image 3</option>
          <option value="doctor4.jpg">Doctor Image 4</option>
          <option value="doctor5.jpg">Doctor Image 5</option>
          <option value="doctor6.jpg">Doctor Image 6</option>
          <option value="doctor7.jpg">Doctor Image 7</option>
          <option value="doctor8.jpg">Doctor Image 8</option>
          <option value="doctor9.jpg">Doctor Image 9</option>
        </select>

        <button className="save-btn">
          {editId ? "Update Doctor" : "Add Doctor"}
        </button>
      </form>

      <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 40
  }}
>
  <h2 className="page-title">Doctors List</h2>

  <button
    className="export-btn"
    onClick={() =>
      window.open("http://localhost:5000/api/doctors/export/csv")
    }
  >
    ⬇ Export CSV
  </button>
</div>


      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Specialization</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map(d => (
            <tr key={d.id}>
              <td>{d.name}</td>
              <td>{d.specialization}</td>
              <td>
                <button
                  onClick={() => {
                    setEditId(d.id);
                    setForm(d);
                  }}
                >
                  Edit
                </button>

                <button
                  className="danger"
                  onClick={() =>
                    API.delete(`/doctors/${d.id}`).then(load)
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ManageDoctors;
