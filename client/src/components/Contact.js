import React, { useEffect, useState } from "react";
import "../styles/Contact.css";
import API from "../services/api";

const Contact = () => {
  const [contact, setContact] = useState({});

  useEffect(() => {
    API.get("/pages/contact").then(res => setContact(res.data));
  }, []);

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">

        {/* LEFT SIDE */}
        <div className="contact-info">
          <h2>{contact.title}</h2>

          {contact.content?.split("|").map((line, i) => (
            <p key={i}>{line}</p>
          ))}

          <p className="emergency">
            🚑 <strong>Emergency:</strong> 24/7 Ambulance Available
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="contact-form">
          <h3>Patient Feedback</h3>

          <form>
            <input type="text" placeholder="Your Name *" required />
            <input type="tel" placeholder="Phone Number *" required />
            <input type="email" placeholder="Email" />
            <textarea placeholder="Write your feedback..." required />
            <button type="submit">Submit Feedback</button>
          </form>
        </div>

      </div>
    </section>
  );
};

export default Contact;
