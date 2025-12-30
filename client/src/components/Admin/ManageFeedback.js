import { useEffect, useState } from "react";
import API from "../../services/api";

const ManageFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      const res = await API.get("/feedback");
      setFeedbacks(res.data);
    } catch (err) {
      console.error("Failed to load feedback");
    }
  };

  return (
    <div className="admin-card">
      <h2>📝 Patient Feedback</h2>
      <button
      onClick={() => window.open("http://localhost:5000/api/feedback/export/csv")}
      className="export-btn"
    >
      ⬇ Export CSV
    </button>

      {feedbacks.length === 0 ? (
        <p>No feedback submitted yet.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Message</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map(f => (
              <tr key={f.id}>
                <td>{f.name}</td>
                <td>{f.phone}</td>
                <td>{f.email || "-"}</td>
                <td>{f.message}</td>
                <td>{new Date(f.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageFeedback;
