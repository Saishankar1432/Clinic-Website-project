import React, { useEffect, useState } from "react";
import API from "../../services/api";
import "./Admin.css";
const emptyForm = {
  title: "",
  description: "",
  category: "",
  image: "",
  timing: "",
  extra: ""
};

const ManageServices = () => {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  /* =========================
     LOAD SERVICES (CMS)
  ========================= */
  const loadServices = async () => {
    try {
      const res = await API.get("/services");
      setServices(res.data);
    } catch (err) {
      alert("Failed to load services");
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  /* =========================
     ADD / UPDATE SERVICE
  ========================= */
  const submitService = async (e) => {
    e.preventDefault();

    if (!form.title || !form.description || !form.category) {
      alert("Please fill required fields");
      return;
    }

    try {
      setLoading(true);

      if (editingId) {
        await API.put(`/services/${editingId}`, form);
        alert("Service updated successfully");
      } else {
        await API.post("/services", form);
        alert("Service added successfully");
      }

      resetForm();
      loadServices(); // 🔥 AUTO REFLECTION
    } catch (err) {
      alert("Error saving service");
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     EDIT SERVICE
  ========================= */
  const editService = (service) => {
    setEditingId(service.id);
    setForm({
      title: service.title || "",
      description: service.description || "",
      category: service.category || "",
      image: service.image || "",
      timing: service.timing || "",
      extra: service.extra || ""
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* =========================
     DELETE SERVICE
  ========================= */
  const deleteService = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;

    try {
      await API.delete(`/services/${id}`);
      loadServices();
    } catch {
      alert("Delete failed");
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  return (
    <>

      {/* ===== ADD / EDIT FORM ===== */}
      <form className="admin-form" onSubmit={submitService}>
        <h2>{editingId ? "Edit Service" : "Add Service"}</h2>

        <input
          placeholder="Service Title *"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          required
        />

        <textarea
          placeholder="Service Description *"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
          required
        />

        <select
          value={form.category}
          onChange={e => setForm({ ...form, category: e.target.value })}
          required
        >
          <option value="">Select Category *</option>
          <option value="doctor">Doctor</option>
          <option value="lab">Lab</option>
          <option value="pharmacy">Pharmacy</option>
          <option value="ambulance">Ambulance</option>
        </select>

        {/* IMAGE / ICON SELECT */}
        <select
          value={form.image}
          onChange={e => setForm({ ...form, image: e.target.value })}
        >
          <option value="">Select Image / Icon</option>

          {/* Doctor icons */}
          <option value="brain">Brain (Neurology)</option>
          <option value="heart">Heart (Cardiology)</option>
          <option value="tooth">Tooth (Dental)</option>
          <option value="eye">Eye</option>
          <option value="bone">Orthopedic</option>

          {/* Facility images */}
          <option value="lab.jpg">Lab Image</option>
          <option value="pharmacy.jpg">Pharmacy Image</option>
          <option value="ambulance.jpg">Ambulance Image</option>
        </select>

        <input
          placeholder="Timing (e.g. 9:00 AM – 6:00 PM)"
          value={form.timing}
          onChange={e => setForm({ ...form, timing: e.target.value })}
        />

        <input
          placeholder="Extra Info (Doctor name / Note)"
          value={form.extra}
          onChange={e => setForm({ ...form, extra: e.target.value })}
        />

        <button type="submit" disabled={loading}>
          {loading
            ? "Saving..."
            : editingId
              ? "Update Service"
              : "Add Service"}
        </button>

        {editingId && (
          <button
            type="button"
            className="secondary"
            onClick={resetForm}
          >
            Cancel Edit
          </button>
        )}
      </form>

      {/* ===== SERVICE LIST ===== */}
      <div className="admin-list">
        {services.length === 0 ? (
          <p>No services added yet</p>
        ) : (
          services.map(service => (
            <div className="admin-card" key={service.id}>
              <b>{service.title}</b> ({service.category})

              <p>{service.description}</p>

              {service.timing && <small>🕒 {service.timing}</small>}
              <br />
              {service.extra && <small>ℹ️ {service.extra}</small>}

              <div className="admin-actions">
                <button onClick={() => editService(service)}>
                  Edit
                </button>
                <button
                  className="danger"
                  onClick={() => deleteService(service.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

    </>
  );
};

export default ManageServices;
