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

          <p>{contact.address}</p>
<p>{contact.phone}</p>
<p>{contact.email}</p>
<p>{contact.hours}</p>

<p className="emergency">
  {contact.emergency}
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
