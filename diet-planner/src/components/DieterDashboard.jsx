import React, { useState } from "react";
import DashboardHeader from "./DashboardHeader";
import WelcomeSection from "./WelcomeSection";
import DieterProfile from "./DieterProfile";
import DieterSettings from "./DieterSettings";
import "./DieterDashboard.css";
import BMICard from "./BMICard";
import MealPlanGrid from "./MealPlanGrid";
import WorkoutSummary from "./WorkoutSummary";
import WorkoutPlanSlider from "./WorkoutPlanSlider";
import WorkoutStats from "./WorkoutStats";
import GoalTracker from "./GoalTracker";

const DieterDashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showWorkout, setShowWorkout] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const username = currentUser?.username || "Guest";

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    window.location.href = "/login";
  };

  return (
    <div className="dieter-dashboard">
      <DashboardHeader
        username={username}
        onLogout={handleLogout}
        onViewProfile={() => setShowProfile(true)}
        onViewSettings={() => setShowSettings(true)}
      />

      <WelcomeSection username={username} />

      {showProfile && (
        <DieterProfile
          user={currentUser}
          onClose={() => setShowProfile(false)}
        />
      )}

      {showSettings && (
        <DieterSettings
          user={currentUser}
          onClose={() => setShowSettings(false)}
        />
      )}

      <section className="card-grid">
        <div className="left-column">
          <BMICard
            onCategorySelect={(category, showWorkoutPlan = false) => {
              setSelectedCategory(category);
              setShowWorkout(showWorkoutPlan);
            }}
          />
          <GoalTracker />

          {showWorkout && (
            <section className="workout-section">
              <WorkoutSummary />
              <WorkoutPlanSlider />
              <WorkoutStats />
            </section>
          )}
        </div>

        <div className="right-column">
          <MealPlanGrid category={selectedCategory} />
        </div>
      </section>
    </div>
  );
};

export default DieterDashboard;
