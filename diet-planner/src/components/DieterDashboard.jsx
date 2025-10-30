import React, { useState, useEffect } from "react";
import "./DieterDashboard.css";
import DashboardHeader from "./DashboardHeader"; // ✅ Added header import
import BMICard from "./BMICard";
import GoalTracker from "./GoalTracker";
import WorkoutPlanSlider from "./WorkoutPlanSlider";
import WorkoutStats from "./WorkoutStats";
import MealPlanGrid from "./MealPlanGrid";
import { useNavigate } from "react-router-dom";
import DieterProfile from "./DieterProfile";
import DieterSettings from "./DieterSettings";
import WelcomeSection from "./WelcomeSection";

const DieterDashboard = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("Guest");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showWorkout, setShowWorkout] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser?.username) setUsername(currentUser.username);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <div className="dieter-dashboard">
      {/* ===== Reusable Header ===== */}
      <DashboardHeader
        username={username}
        onLogout={handleLogout}
        onViewProfile={() => setShowProfile(true)}
        onViewSettings={() => setShowSettings(true)}
      />
      <div className="welcome-msg">
        <WelcomeSection />
        
      </div>
      {/* ===== Overview Section ===== */}
      <section className="overview-section">
        <div className="overview-card">
          <h4>📊 BMI & Body Insights</h4>
          <BMICard
            onCategorySelect={(category, showWorkoutPlan = false) => {
              setSelectedCategory(category);
              setShowWorkout(showWorkoutPlan);
            }}
          />
        </div>

        <div className="overview-card">
          <h4>🎯 Goal Tracker</h4>
          <GoalTracker />
        </div>
      </section>

      {/* ===== Meal Plan Section ===== */}
      <section className="meal-section">
        <h3>🍱 Personalized Meal Plan</h3>
        <div className="horizontal-scroll">
          <div className="module">
            <MealPlanGrid category={selectedCategory} />
          </div>
        </div>
      </section>

      {/* ===== Workout Section ===== */}
      {showWorkout && (
        <section className="workout-section">
          <h3>💪 Workout Overview</h3>
          <div className="workout-grid">
            <div className="workout-card">
              <WorkoutPlanSlider bmiCategory={selectedCategory} />
            </div>
            <div className="workout-card">
              <WorkoutStats />
            </div>
          </div>
        </section>
      )}

      {/* ===== Popups ===== */}
    {showProfile && (
  <DieterProfile user={JSON.parse(localStorage.getItem("currentUser"))} onClose={() => setShowProfile(false)} />
)}

{showSettings && (
  <DieterSettings user={JSON.parse(localStorage.getItem("currentUser"))} onClose={() => setShowSettings(false)} />
)}

    </div>
  );
};

export default DieterDashboard;
