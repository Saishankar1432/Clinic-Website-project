import React, { useEffect, useState } from "react";
import "../styles/Footer.css";
import API from "../services/api";

const Footer = () => {
  const [footer, setFooter] = useState({});

  useEffect(() => {
    API.get("/footer")
      .then(res => setFooter(res.data))
      .catch(err => console.error("Footer fetch error", err));
  }, []);

  return (
    <footer className="footer">
      <div className="footer-container">

        {/* CLINIC INFO */}
        <div>
          <h3>{footer.clinic_name}</h3>
          <p>{footer.description}</p>
        </div>

        {/* QUICK LINKS (STATIC) */}
        <div>
          <h4>Quick Links</h4>
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Services</li>
            <li>Doctors</li>
            <li>Appointment</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* SERVICES (STATIC LIST) */}
        <div>
          <h4>Our Services</h4>
          <ul>
            <li>Doctor Consultation</li>
            <li>Lab Tests</li>
            <li>Home Sample Collection</li>
            <li>Pharmacy</li>
            <li>Ambulance Service</li>
          </ul>
        </div>

        {/* CONTACT (DYNAMIC) */}
        <div>
          <h4>Contact</h4>
          <p>📍 {footer.address}</p>
          <p>📞 {footer.phone}</p>
          <p>📧 {footer.email}</p>
        </div>

      </div>

      <div className="footer-bottom">
        {footer.copyright}
      </div>
    </footer>
  );
};

export default Footer;
