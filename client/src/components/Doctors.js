import React, { useEffect, useState } from "react";
import "../styles/Doctors.css";
import API from "../services/api";

/* ===== IMPORT DOCTOR IMAGES ===== */
import doc1 from "../assets/doctors/doctor1.jpg";
import doc2 from "../assets/doctors/doctor2.jpg";
import doc3 from "../assets/doctors/doctor3.jpg";
import doc4 from "../assets/doctors/doctor4.jpg";
import doc5 from "../assets/doctors/doctor5.jpg";
import doc6 from "../assets/doctors/doctor6.jpg";
import doc7 from "../assets/doctors/doctor7.jpg";
import doc8 from "../assets/doctors/doctor8.jpg";
import doc9 from "../assets/doctors/doctor9.jpg";

/* ===== IMAGE MAP ===== */
const imageMap = {
  "doctor1.jpg": doc1,
  "doctor2.jpg": doc2,
  "doctor3.jpg": doc3,
  "doctor4.jpg": doc4,
  "doctor5.jpg": doc5,
  "doctor6.jpg": doc6,
  "doctor7.jpg": doc7,
  "doctor8.jpg": doc8,
  "doctor9.jpg": doc9,
};

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);

  /* ===== FETCH DOCTORS FROM CMS ===== */
  useEffect(() => {
    API.get("/doctors")
      .then((res) => {
        setDoctors(res.data);
      })
      .catch((err) => {
        console.error("Error fetching doctors:", err);
      });
  }, []);

  return (
    <section className="doctors-section" id="doctors">
      <h2 className="section-title">Our Doctors</h2>
      <p className="section-subtitle">
        Meet our experienced and caring medical professionals
      </p>

      <div className="doctors-grid">
        {doctors.length === 0 ? (
          <p>No doctors available</p>
        ) : (
          doctors.map((doc) => (
            <div className="doctor-card" key={doc.id}>
              {/* ===== DOCTOR IMAGE ===== */}
              <img
                src={imageMap[doc.image] || doc1}
                alt={doc.name}
                className="doctor-img"
              />

              <h3>{doc.name}</h3>
              <span className="specialization">{doc.specialization}</span>

              <p className="doctor-info">
                <strong>Qualification:</strong> {doc.qualification}
              </p>

              <p className="doctor-info">
                <strong>Experience:</strong> {doc.experience}
              </p>

              <p className="visit-hours">
                <strong>Visiting Hours:</strong> {doc.hours}
              </p>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Doctors;
