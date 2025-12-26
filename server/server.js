const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/clinic", require("./routes/clinicRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/doctors", require("./routes/doctorRoutes"));
app.use("/api/services", require("./routes/serviceRoutes"));
app.use("/api/about", require("./routes/aboutRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));
app.use("/api/footer", require("./routes/footerRoutes"));
app.use("/api/pages", require("./routes/pagesRoute")); 
app.use("/api/appointments", require("./routes/appointmentRoutes"));


app.listen(5000, () => {
  console.log("Backend running on port 5000");
});
