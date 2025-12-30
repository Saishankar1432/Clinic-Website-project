import React, { useEffect, useState } from "react";
import "../styles/About.css";
import API from "../services/api";
import doctorImage from "../assets/doctor.jpg"; // static image


const About = () => {
  
  
  const [about, setAbout] = useState({});

  useEffect(() => {
    API.get("/pages/about").then(res => setAbout(res.data));
  }, []);

  return (
    <section className="about-section" id="about">
      <div className="about-container">

        {/* IMAGE */}
        <div className="about-image">
          <img src={doctorImage} alt="Doctor" />
        </div>

        {/* CONTENT */}
        <div className="about-content">
          <h2>{about.title}</h2>

          <p className="about-text">{about.content}</p>

          <h3 className="doctor-name">{about.founder}</h3>

          <p className="doctor-qualification">
            {about.qualification}
          </p>

          <ul className="about-points">
            {about.bullets?.split("|").map((b, i) => (
              <li key={i}>✔ {b}</li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
};

export default About;
