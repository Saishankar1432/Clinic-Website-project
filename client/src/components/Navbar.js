import React, { useState } from "react";
import "../styles/Navbar.css";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [active, setActive] = useState("home");

  const scrollToSection = (id) => {
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="navbar">
      {/* LEFT BLOCK */}
      <div className="navbar-left">
        <div className="logo-wrapper">
          <img src={logo} alt="Paidi's Clinic Logo" className="nav-logo" />
        </div>

        <div className="nav-info">
          <div className="nav-text">
            <span className="nav-title">Paidi's Clinic</span>
            <span className="nav-tagline">Compasionate Care for All Generation</span>
          </div>

          {/* SEARCH NEAR TITLE */}
          <input
            type="text"
            className="nav-search"
            placeholder="Search services..."
          />
        </div>
      </div>

      {/* RIGHT MENU */}
      <ul className="navbar-menu">
        {["home", "about", "services", "appointment", "contact"].map(item => (
          <li
            key={item}
            className={active === item ? "active" : ""}
            onClick={() => scrollToSection(item)}
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
