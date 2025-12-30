import { useEffect, useState } from "react";
import API from "../../services/api";
import usePageTitle from "../../utils/usePageTitle";
const AdminFeedback = () => {
  usePageTitle("Admin | Feedback");
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    API.get("/feedback").then(res => setFeedback(res.data));
  }, []);

  const deleteFeedback = async (id) => {
    await API.delete(`/feedback/${id}`);
    setFeedback(feedback.filter(f => f.id !== id));
  };

  return (
    <div className="admin-container">
      <h2>Patient Feedback</h2>

      {feedback.map(f => (
        <div key={f.id} className="admin-card">
          <b>{f.name}</b> ({f.phone})<br />
          {f.email && <small>{f.email}</small>}
          <p>{f.message}</p>
          <button onClick={() => deleteFeedback(f.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default AdminFeedback;
