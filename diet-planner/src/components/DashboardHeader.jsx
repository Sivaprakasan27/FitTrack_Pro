import React from "react";
import "./DashboardHeader.css";

const DashboardHeader = ({ username, onLogout, onViewProfile, onViewSettings }) => {
  return (
    <header className="dashboard-header">
      <h1 className="dash-title">🥗 Dieter Dashboard</h1>

      <nav className="dashboard-nav">
        <ul>
          <li onClick={onViewProfile}>👁️ Profile</li>
          <li onClick={onViewSettings}>⚙️ Settings</li>
          <li onClick={onLogout} className="logout">🚪 Logout</li>
        </ul>
        <div className="nav-glow"></div>
      </nav>

      <div className="username-text">Welcome, {username}</div>
    </header>
  );
};

export default DashboardHeader;
