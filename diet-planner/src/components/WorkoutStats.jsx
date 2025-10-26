
import React, { useState, useEffect } from "react";
import "./WorkoutStats.css";

const WorkoutStats = () => {
  const [stats, setStats] = useState({
    totalCalories: 0,
    avgCompletion: 0,
    activeDay: "—",
    consistency: 0,
  });

  const calculateStats = () => {
    const progressData = JSON.parse(localStorage.getItem("workoutProgress")) || {};
    const days = Object.keys(progressData);
    if (days.length === 0) return;

    let totalCalories = 0;
    let totalCompletion = 0;
    let activeDay = "";
    let mostRecent = 0;

    days.forEach((day) => {
      const entry = progressData[day];
      totalCalories += entry.calories || 0;
      totalCompletion += entry.completion || 0;

      const updated = new Date(entry.updatedAt).getTime();
      if (updated > mostRecent) {
        mostRecent = updated;
        activeDay = day;
      }
    });

    setStats({
      totalCalories,
      avgCompletion: Math.round(totalCompletion / days.length),
      activeDay,
      consistency: Math.min(5, Math.round(days.filter(d => progressData[d].completion === 100).length / 2)),
    });
  };

  useEffect(() => {
    calculateStats();
    window.addEventListener("workoutUpdated", calculateStats);
    return () => window.removeEventListener("workoutUpdated", calculateStats);
  }, []);

  return (
    <div className="workout-stats card">
      <h2>📈 Weekly Stats</h2>
      <div className="stats-grid">
        <div className="stat-item">
          <h4>Total Calories Burned</h4>
          <p className="highlight">{stats.totalCalories} kcal</p>
        </div>
        <div className="stat-item">
          <h4>Average Completion</h4>
          <p className="highlight">{stats.avgCompletion}%</p>
        </div>
        <div className="stat-item">
          <h4>Most Active Day</h4>
          <p className="highlight">{stats.activeDay} 🟢</p>
        </div>
        <div className="stat-item">
          <h4>Consistency</h4>
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={i < stats.consistency ? "star filled" : "star"}
              >
                ★
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutStats;
