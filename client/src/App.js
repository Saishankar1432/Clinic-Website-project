import { Routes, Route } from "react-router-dom";

/* ===== PUBLIC WEBSITE ===== */
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Services from "./components/Services";
import Doctors from "./components/Doctors";
import Appointment from "./components/Appointment";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

/* ===== CHECK-IN ===== */
import CheckIn from "./components/CheckIn";
import ReceptionCheckin from "./components/ReceptionCheckin";

/* ===== ADMIN ===== */
import AdminLogin from "./components/Admin/AdminLogin";
import AdminDashboard from "./components/Admin/AdminDashboard";

function PublicLayout() {
  return (
    <>
      <Navbar />
      <Home />
      <About />
      <Services />
      <Doctors />
      <Appointment />
      <Contact />
      <Footer />
    </>
  );
}

function App() {
  return (
    <Routes>

      {/* PUBLIC WEBSITE */}
      <Route path="/" element={<PublicLayout />} />

      {/* ADMIN */}
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />

      {/* RECEPTION CHECK-IN (QR + CAMERA) */}
      <Route path="/checkin" element={<ReceptionCheckin />} />

      {/* MANUAL CHECK-IN (BACKUP) */}
      <Route path="/checkin/manual" element={<CheckIn />} />

      


    </Routes>
  );
}

export default App;
