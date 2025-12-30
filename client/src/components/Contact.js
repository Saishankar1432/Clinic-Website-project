import React, { useEffect, useState } from "react";
import "../styles/Contact.css";
import API from "../services/api";
import Feedback from "../components/Feedback";
const Contact = () => {
  const [contact, setContact] = useState({});

  useEffect(() => {
    API.get("/pages/contact").then(res => setContact(res.data));
  }, []);

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">

        {/* LEFT SIDE – CONTACT INFO */}
        <div className="contact-info">
          <h2>{contact.title || "Contact Us"}</h2>

          {contact.content?.split("|").map((line, i) => (
            <p key={i}>{line}</p>
          ))}

          <p className="emergency">
            🚑 <strong>Emergency:</strong> 24/7 Ambulance Available
          </p>
        </div>

        {/* RIGHT SIDE – FEEDBACK FORM */}
        <div className="contact-feedback">
          <Feedback />
        </div>

      </div>
    </section>
  );
};

export default Contact;
