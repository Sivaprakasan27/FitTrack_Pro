import React, { useEffect, useState } from "react";
import "./DietitianProfile.css";

const DietitianProfile = ({ onClose }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) setUser(currentUser);
  }, []);

  return (
    <div className="profile-overlay">
      <div className="profile-modal">
        <h2>👩‍⚕️ Dietitian Profile</h2>

        <div className="profile-details">
          <p><strong>Name:</strong> {user.name || "N/A"}</p>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> Dietitian</p>
        </div>

        <div className="btn-row">
          <button className="btn-close" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default DietitianProfile;
