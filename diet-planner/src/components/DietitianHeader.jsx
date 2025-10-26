
import React, { useState } from "react";
import "./DietitianHeader.css";

const DietitianHeader = ({
  username,
  onLogout,
  onViewProfile,
  onViewSettings,
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (onNavigate) onNavigate(tab);
  };

  return (
    <header className="dietitian-header">
      {/* Logo Section */}
      <div className="dietitian-logo">
        🥗 <span>Dietitian Dashboard</span>
      </div>

      {/* Navigation */}
      <nav className="dietitian-nav">
        <ul>
          <li
            className={activeTab === "dashboard" ? "active" : ""}
            onClick={() => handleTabClick("dashboard")}
          >
            Dashboard
          </li>
          <li
            className={activeTab === "clients" ? "active" : ""}
            onClick={() => handleTabClick("clients")}
          >
            Clients
          </li>
          <li
            className={activeTab === "reports" ? "active" : ""}
            onClick={() => handleTabClick("reports")}
          >
            Reports
          </li>
          <li
            className={activeTab === "feedback" ? "active" : ""}
            onClick={() => handleTabClick("feedback")}
          >
            Feedback
          </li>
        </ul>
      </nav>

      {/* Profile Section */}
      <div
        className="dietitian-profile"
        onMouseEnter={() => setDropdownOpen(true)}
        onMouseLeave={() => setDropdownOpen(false)}
      >
        <button className="dietitian-profile-btn">👩‍⚕️ {username}</button>

        {dropdownOpen && (
          <div className="dietitian-dropdown">
            <p onClick={onViewProfile}>Profile</p>
            <p onClick={onViewSettings}>Settings</p>
            <p className="logout" onClick={onLogout}>
              Logout
            </p>
          </div>
        )}
      </div>
    </header>
  );
};

export default DietitianHeader;
