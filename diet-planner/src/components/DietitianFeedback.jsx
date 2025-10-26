import React, { useEffect, useState } from "react";
import "./DietitianFeedback.css";

const DietitianFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const storedFeedback =
      JSON.parse(localStorage.getItem("dieterFeedback")) || [];
    setFeedbacks(storedFeedback.reverse());
  }, []);

  const handleDelete = (index) => {
    const updated = feedbacks.filter((_, i) => i !== index);
    setFeedbacks(updated);
    localStorage.setItem("dieterFeedback", JSON.stringify(updated));
  };

  return (
    <div className="feedback-section">
      <h2>💬 Dieter Feedback</h2>

      {feedbacks.length === 0 ? (
        <p className="no-feedback">No feedback received yet.</p>
      ) : (
        <div className="feedback-grid">
          {feedbacks.map((fb, i) => (
            <div className="feedback-card" key={i}>
              <div className="feedback-header">
                <h3>{fb.user || "Unknown User"}</h3>
                <span className="feedback-date">{fb.date}</span>
              </div>

              <p className="feedback-message">{fb.message}</p>

              <div className="feedback-actions">
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(i)}
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DietitianFeedback;
