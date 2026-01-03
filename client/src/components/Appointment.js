import React, { useState } from "react";
import "../styles/Appointment.css";
import API from "../services/api";
import BookingSuccess from "./BookingSuccess";

/* =========================
   MASTER DATA
========================= */
const doctorsList = [
  "Dr. Paidi Sai Kiran",
  "Dr. K. Yashwant",
  "Dr. Ramesh Kumar",
  "Dr. Anjali Reddy",
  "Dr. Ravi Teja",
  "Dr. V. Sneha",
  "Dr. P. Gayathri",
  "Dr. M. Bhanu Pravallika",
  "Dr. P. Renuka",
];

const labTests = [
  { name: "Complete Blood Count (CBC)", price: 400, home: true },
  { name: "Diabetes (HbA1c)", price: 600, home: true },
  { name: "Lipid Profile", price: 800, home: true },
  { name: "Liver Function Test (LFT)", price: 1000, home: true },
  { name: "Thyroid Profile (T3, T4, TSH)", price: 700, home: true },
  { name: "Kidney Function Test (KFT/RFT)", price: 900, home: true },
  { name: "Vitamin D / B12", price: 1200, home: true },
  { name: "Urine Routine & Microscopy", price: 250, home: true },

  { name: "ECG", price: 500, home: false },
  { name: "X-Ray (Chest)", price: 700, home: false },
  { name: "Ultrasound (Abdomen)", price: 2000, home: false },
  { name: "TMT (Stress Test)", price: 2200, home: false },
  { name: "ECHO (2D)", price: 3500, home: false },
  { name: "CT Scan", price: 5000, home: false },
  { name: "MRI Scan", price: 9000, home: false },
];

const Appointment = () => {
  const [activeTab, setActiveTab] = useState("doctor");
  const [overlay, setOverlay] = useState(null);
  const [token, setToken] = useState(null);

  const [isEmergency, setIsEmergency] = useState(false);
  const [sampleType, setSampleType] = useState("hospital");
  const [selectedTests, setSelectedTests] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    doctor: "",
    appointment_date: "",
    appointment_time: "",
    address: "",
    location: "",
  });

  /* ===== DATE & TIME HELPERS ===== */
  const getTodayDate = () => {
    return new Date().toISOString().split("T")[0];
  };

  const getMinTime = () => {
    if (form.appointment_date === getTodayDate()) {
      return new Date().toTimeString().slice(0, 5);
    }
    return "";
  };

  const isPastTimeForToday = (time) => {
    if (form.appointment_date !== getTodayDate()) return false;

    const now = new Date();
    const [h, m] = time.split(":").map(Number);

    const selected = new Date();
    selected.setHours(h, m, 0, 0);

    return selected < now;
  };

  const handleTimeChange = (e) => {
    const selectedTime = e.target.value;

    if (isPastTimeForToday(selectedTime)) {
      alert("Please select a future time");
      setForm({ ...form, appointment_time: "" });
      return;
    }

    setForm({ ...form, appointment_time: selectedTime });
  };

  const handleDateChange = (e) => {
    setForm({
      ...form,
      appointment_date: e.target.value,
      appointment_time: ""
    });
  };

  /* =========================
     PRICE LOGIC
  ========================= */
  const calculatePrice = () => {
    let total = 0;
    selectedTests.forEach(t => {
      const found = labTests.find(x => x.name === t);
      if (found) total += found.price;
    });
    return total;
  };

  /* =========================
     SUBMIT
  ========================= */
  const submitAppointment = async (type) => {
  if (loading) return; // prevent double click

  try {
    setLoading(true);

    const payload = {
      ...form,
      type,
      test: selectedTests.join(", "),
      sampleType,
      amount: calculatePrice(),
    };

    const res = await API.post("/appointments", payload);

    // ✅ TOKEN ONLY FOR VISIT TYPES
    if (
      type === "doctor" ||
      (type === "lab" && sampleType === "hospital")
    ) {
      setToken(res.data.token);
      setOverlay("success");
    }

  } catch (err) {
    setOverlay("error");
  } finally {
    setLoading(false);
  }
};


  return (
    <section className="appointment-section" id="appointment">

      {/* ===== SUCCESS ===== */}
      {overlay === "success" && token && (
        <BookingSuccess
          token={token}
          date={form.appointment_date}
          time={form.appointment_time}
          onClose={() => {
            setOverlay(null);
            setToken(null);
          }}
        />
      )}

      {/* ===== ERROR ===== */}
      {overlay === "error" && (
        <div className="overlay">
          <div className="overlay-card error">
            <span className="close-btn" onClick={() => setOverlay(null)}>✖</span>
            <h3>Error</h3>
            <p>Something went wrong</p>
          </div>
        </div>
      )}

      {/* ===== INFO (NO TOKEN CASES) ===== */}
{overlay === "info" && (
  <div className="overlay">
    <div className="overlay-card">
      <span className="close-btn" onClick={() => setOverlay(null)}>✖</span>

      <h3>Request Submitted Successfully</h3>

      <p>
        {activeTab === "pharmacy" && (
          <>Your medicine request has been received. Our pharmacist will contact you shortly.</>
        )}

        {activeTab === "lab" && sampleType === "home" && (
          <>Your home sample request has been received. Our lab technician will visit your address as scheduled.</>
        )}
      </p>
    </div>
  </div>
)}


      {/* ===== TABS ===== */}
      <div className="appointment-tabs">
        <button className={activeTab === "doctor" ? "active" : ""} onClick={() => setActiveTab("doctor")}>Doctor</button>
        <button className={activeTab === "lab" ? "active" : ""} onClick={() => setActiveTab("lab")}>Lab</button>
        <button className={activeTab === "pharmacy" ? "active" : ""} onClick={() => setActiveTab("pharmacy")}>Pharmacy</button>
      </div>

      {/* ===== DOCTOR ===== */}
      {activeTab === "doctor" && (
        <form className="appointment-form" onSubmit={e => {
          e.preventDefault();
          submitAppointment(isEmergency ? "emergency" : "doctor");
        }}>
          <h3>Doctor Appointment</h3>

          <label>Patient Name <span className="star">*</span></label>
          <input required onChange={e => setForm({ ...form, name: e.target.value })} />

          <label>Phone *</label>
          <input
            required
            maxLength="10"
            inputMode="numeric"
            value={form.phone}
            onChange={e =>
              setForm({
                ...form,
                phone: e.target.value.replace(/[^0-9]/g, "")
              })
            }
          />

          <label>Email</label>
          <input onChange={e => setForm({ ...form, email: e.target.value })} />

          <label>Doctor <span className="star">*</span></label>
          <select required onChange={e => setForm({ ...form, doctor: e.target.value })}>
            <option value="">Select Doctor</option>
            {doctorsList.map(d => <option key={d}>{d}</option>)}
          </select>

          <label>Date *</label>
          <input
           type="date"
           min={getTodayDate()}
           value={form.appointment_date}
           required
           onChange={handleDateChange}
          />


          <label>Time *</label>
          <input
            type="time"
            min={getMinTime()}
            value={form.appointment_time}
            required
            onChange={handleTimeChange}
          />


         <label className="checkbox-row emergency-row">
           <input
            type="checkbox"
            checked={isEmergency}
            onChange={e => setIsEmergency(e.target.checked)}
           />
          <span className="checkbox-text"> Emergency Visit</span>
         </label>


          <p className="blink-note">⚠ Show token at reception and Check Weight, BP and Temperature</p>

          <button disabled={loading}>
          {loading ? "Please wait..." : "Generate Token"}
          </button>
        </form>
      )}

      {/* ===== LAB ===== */}
      {activeTab === "lab" && (
        <form className="appointment-form" onSubmit={e => {
          e.preventDefault();
          submitAppointment("lab");
        }}>
          <h3>Lab Test Booking</h3>

          <label>Patient Name <span className="star">*</span></label>
          <input required onChange={e => setForm({ ...form, name: e.target.value })} />

          <label>Phone *</label>
          <input
            required
            maxLength="10"
            inputMode="numeric"
            value={form.phone}
            onChange={e =>
              setForm({
                ...form,
                phone: e.target.value.replace(/[^0-9]/g, "")
              })
            }
          />

          <label>Email <span className="star">*</span></label>
          <input required onChange={e => setForm({ ...form, phone: e.target.value })} />

          <label>Date *</label>
          <input
           type="date"
           min={getTodayDate()}
           value={form.appointment_date}
           required
           onChange={handleDateChange}
          />


          <label>Time *</label>
          <input
            type="time"
            min={getMinTime()}
            value={form.appointment_time}
            required
            onChange={handleTimeChange}
          />

          <label>Sample Type <span className="star">*</span></label>
          <select required value={sampleType} onChange={e => setSampleType(e.target.value)}>
            <option value="hospital">Visit Hospital</option>
            <option value="home">Home Sample</option>
          </select>

          <div className="checkbox-group">
  {labTests
    .filter(t => (sampleType === "home" ? t.home : true))
    .map(test => (
      <label key={test.name} className="checkbox-row">
        <input
          type="checkbox"
          checked={selectedTests.includes(test.name)}
          onChange={e => {
            if (e.target.checked) {
              setSelectedTests([...selectedTests, test.name]);
            } else {
              setSelectedTests(selectedTests.filter(t => t !== test.name));
            }
          }}
        />
        <span className="checkbox-text">
          {test.name} – ₹{test.price}
        </span>
      </label>
    ))}
</div>

          <p><b>Total:</b> ₹{calculatePrice()}</p>

          {sampleType === "home" && (
            <>
              <label>Home Address <span className="star">*</span></label>
              <textarea required onChange={e => setForm({ ...form, address: e.target.value })} />

              <a href="https://www.google.com/maps" target="_blank" rel="noreferrer">
                📍 Open Google Maps & Share Location
              </a>

              <input placeholder="Paste Google Maps Location (optional)"
                onChange={e => setForm({ ...form, location: e.target.value })} />
            </>
          )}

          <button disabled={loading}>
          {loading ? "Please wait..." : "Book Test"}
          </button>
        </form>
      )}

      {/* ===== PHARMACY ===== */}
      {activeTab === "pharmacy" && (
        <form className="appointment-form" onSubmit={e => {
          e.preventDefault();
          submitAppointment("pharmacy");
        }}>
          <h3>Pharmacy Request</h3>

          <label>Patient Name <span className="star">*</span></label>
          <input required onChange={e => setForm({ ...form, name: e.target.value })} />

          <label>Phone *</label>
          <input
            required
            maxLength="10"
            inputMode="numeric"
            value={form.phone}
            onChange={e =>
              setForm({
                ...form,
                phone: e.target.value.replace(/[^0-9]/g, "")
              })
            }
          />

          <label>Email <span className="star">*</span></label>
          <input required onChange={e => setForm({ ...form, phone: e.target.value })} />

          <label>Date *</label>
          <input
           type="date"
           min={getTodayDate()}
           value={form.appointment_date}
           required
           onChange={handleDateChange}
          />


          <label>Time *</label>
          <input
            type="time"
            min={getMinTime()}
            value={form.appointment_time}
            required
            onChange={handleTimeChange}
          />

          <label>Upload Prescription <span className="star">*</span></label>
          <input type="file" required accept="image/*,.pdf" />

          <label>Delivery Address <span className="star">*</span></label>
          <textarea required onChange={e => setForm({ ...form, address: e.target.value })} />

          <a href="https://www.google.com/maps" target="_blank" rel="noreferrer">
            📍 Open Google Maps & Share Location
          </a>

          <input placeholder="Paste Google Maps Location (optional)"
            onChange={e => setForm({ ...form, location: e.target.value })} />

          <button>Submit</button>
        </form>
      )}

    </section>
  );
};

export default Appointment;
