import React, { useEffect, useState } from "react";
import "../styles/Services.css";
import API from "../services/api";
import { FaPhoneAlt } from "react-icons/fa";

/* ===== IMPORT FACILITY IMAGES ===== */
import labImg from "../assets/services/lab.jpg";
import pharmacyImg from "../assets/services/pharmacy.jpg";
import ambulanceImg from "../assets/services/ambulance.jpg";

/* ===== IMAGE MAP (VERY IMPORTANT) ===== */
const serviceImages = {
  "lab.jpg": labImg,
  "pharmacy.jpg": pharmacyImg,
  "ambulance.jpg": ambulanceImg
};

const Services = () => {
 
  const [doctors, setDoctors] = useState([]);
  const [services, setServices] = useState([]);

  /* ===== FETCH CMS DATA ===== */
  useEffect(() => {
    API.get("/doctors").then(res => setDoctors(res.data));
    API.get("/services").then(res => setServices(res.data));
  }, []);

  return (
    <section className="services-section" id="services">

      {/* ================= DOCTOR SERVICES ================= */}
      <h2 className="section-title">Our Medical Services</h2>

      <div className="services-grid">
        {doctors.map(doc => (
          <div className="service-card" key={doc.id}>
            <h3>
  {doc.emoji && <span style={{ fontSize: "22px", marginRight: 6 }}>{doc.emoji}</span>}
  {doc.specialization}
</h3>
            <p className="doctor-name">{doc.name}</p>
            <p className="doctor-meta">
              {doc.qualification} • {doc.experience}
            </p>
            <p className="visit-hours">
              Visiting Hours: {doc.hours}
            </p>

            <div className="service-actions">
              <button
                className="btn primary"
                onClick={() =>
                  document
                    .getElementById("appointment")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Book Appointment
              </button>

              <button
                className="btn outline"
                onClick={() =>
                  document
                    .getElementById("doctors")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                View Doctor
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= FACILITIES ================= */}
      <h2 className="section-title facilities-title">Clinic Facilities</h2>

      <div className="facilities-grid">
        {services.map(s => (
          <div className="facility-card" key={s.id}>
            {/* IMAGE FROM MAP */}
            <img
              src={serviceImages[s.image]}
              alt={s.title}
            />

            <h3>{s.title}</h3>
            <p>{s.description}</p>

            {s.timing && (
              <p className="facility-time">🕒 {s.timing}</p>
            )}

            {/* ACTIONS BASED ON CATEGORY */}
            {s.category === "lab" && (
              <div className="facility-actions">
                <button
                  className="btn primary"
                  onClick={() =>
                    document
                      .getElementById("appointment")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Home Sample Collection
                 </button>

                <button
                  className="btn outline"
                  onClick={() => {
                  localStorage.setItem("appointmentType", "lab");
                  document
                  .getElementById("appointment")
                  ?.scrollIntoView({ behavior: "smooth" });
                }}
               >
                Book Lab Test
              </button>
              </div>
            )}

            {s.category === "pharmacy" && (
              <div className="facility-actions">
                <button
  className="btn primary"
  onClick={() => {
    localStorage.setItem("appointmentType", "pharmacy");
    document
      .getElementById("appointment")
      ?.scrollIntoView({ behavior: "smooth" });
  }}
>
  Order Medicines
</button>


                <button
                  className="btn outline"
                  onClick={() =>
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Contact Pharmacy
                </button>
              </div>
            )}

            {s.category === "ambulance" && (
              <a href="tel:+919999999999" className="btn primary">
                <FaPhoneAlt /> Call Ambulance
              </a>
            )}
          </div>
        ))}
      </div>

    </section>
  );
};

export default Services;
