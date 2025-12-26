import React, { useEffect, useState } from "react";
import "../styles/Home.css";
import API from "../services/api";
import logo from "../assets/logo.png";
import clinicImage from "../assets/clinic.jpg";

const Home = () => {
  const [clinic, setClinic] = useState(null);

  useEffect(() => {
    API.get("/clinic").then(res => setClinic(res.data));
  }, []);

  if (!clinic) return null;

  return (
    <section className="home-section" id="home">
      <div className="home-wrapper">

        {/* LEFT SIDE */}
        <div className="home-left">
          <img
            src={logo}
            alt="Paidi's Clinic Logo"
            className="home-logo"
          />

          <h1 className="home-title">{clinic.name}</h1>
          <h2 className="home-tagline">{clinic.tagline}</h2>

          <p className="home-description">{clinic.about}</p>

          <div className="home-buttons">
            <button
  className="btn-primary"
  onClick={() => {
    const section = document.getElementById("appointment");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }}
>
  Book Appointment
</button>


            <a href={`tel:${clinic.phone}`} className="btn-secondary">
              Call Now
            </a>
          </div>

          <div className="home-info">
            <div className="info-box">
  <strong>Working Hours</strong>
  <span>Mon – Sat: 10:00 AM – 9:00 PM</span>
  <span> Sunday: Consultation Holiday </span>
  <span className="emergency-text">Emergency: 24/7</span>
</div>


            <div className="info-box emergency">
              <strong>Emergency</strong>
              <span>{clinic.phone}</span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="home-right">
          <img src={clinicImage} alt="Clinic" />
        </div>

      </div>
    </section>
  );
};

export default Home;
