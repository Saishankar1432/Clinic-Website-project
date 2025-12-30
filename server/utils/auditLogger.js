const db = require("../config/db");

const logActivity = ({ userType, userId, action, req }) => {
  const ip =
    req.headers["x-forwarded-for"] ||
    req.socket.remoteAddress ||
    "unknown";

  const userAgent = req.headers["user-agent"] || "unknown";

  const query = `
    INSERT INTO audit_logs (user_type, user_id, action, ip_address, user_agent)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(query, [userType, userId, action, ip, userAgent]);
};

module.exports = logActivity;
