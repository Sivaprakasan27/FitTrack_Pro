import React, { useEffect, useState } from "react";
import "./DietitianContacts.css";

const DietitianContacts = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("contactMessages")) || [];
    setMessages(stored);
  }, []);

  const handleDelete = (index) => {
    if (!window.confirm("Delete this message?")) return;
    const updated = messages.filter((_, i) => i !== index);
    setMessages(updated);
    localStorage.setItem("contactMessages", JSON.stringify(updated));
  };

  return (
    <section className="dietitian-contacts">
      <h2>📬 Contact Messages</h2>

      {messages.length === 0 ? (
        <p style={{ textAlign: "center" }}>No contact messages yet.</p>
      ) : (
        <div className="messages-grid">
          {messages.map((msg, index) => (
            <div className="message-card" key={index}>
              <h4>📧 From: {msg.name}</h4>
              <p><strong>Email:</strong> {msg.email}</p>
              <p className="msg-text">{msg.message}</p>
              <small>🕒 Sent on: {msg.date}</small>
              <button
                className="btn-delete"
                onClick={() => handleDelete(index)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default DietitianContacts;
