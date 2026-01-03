import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import API from "../services/api";

const Feedback = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: ""
  });

  // ✅ ADD THIS STATE
  const [captchaToken, setCaptchaToken] = useState(null);

  const submitFeedback = async (e) => {
    e.preventDefault();

    // ✅ CAPTCHA CHECK
    if (!captchaToken) {
      alert("Please verify captcha");
      return;
    }

    try {
      await API.post("/feedback", {
        ...form,
        captchaToken
      });

      alert("Thank you for your feedback!");

      // reset form
      setForm({ name: "", phone: "", email: "", message: "" });
      setCaptchaToken(null);
    } catch (error) {
      alert("Captcha verification failed or server error");
    }
  };

  return (
    <form className="appointment-form" onSubmit={submitFeedback}>
      <h3>Patient Feedback</h3>

      <input
        placeholder="Your Name *"
        required
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        placeholder="Phone Number *"
        required
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />

      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <textarea
        placeholder="Write your feedback... *"
        required
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
      />

      {/* ✅ GOOGLE CAPTCHA */}
      <div style={{ margin: "15px 0" }}>
        <ReCAPTCHA
  sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
  onChange={(token) => setCaptchaToken(token)}
/>

      </div>

      <button type="submit">Submit Feedback</button>
    </form>
  );
};

export default Feedback;
