import React, { useState, useEffect } from "react";
import "./WorkoutSummary.css";

const WorkoutSummary = () => {
  const [summary, setSummary] = useState({
    calories: 0,
    duration: 0,
    completion: 0,
    lastActive: "—",
  });

  const calculateSummary = () => {
    const progressData = JSON.parse(localStorage.getItem("workoutProgress")) || {};
    const today = new Date().toLocaleDateString();
    let totalCalories = 0;
    let completed = 0;
    let totalDays = Object.keys(progressData).length;

    Object.values(progressData).forEach((entry) => {
      if (entry.completion === 100) {
        completed++;
        totalCalories += entry.calories;
      }
    });

    setSummary({
      calories: totalCalories,
      duration: completed * 30, // assume each workout ≈ 30 min
      completion: totalDays ? Math.round((completed / totalDays) * 100) : 0,
      lastActive: new Date().toLocaleString(),
    });
  };

  useEffect(() => {
    calculateSummary();
    window.addEventListener("workoutUpdated", calculateSummary);
    return () => window.removeEventListener("workoutUpdated", calculateSummary);
  }, []);

  return (
    <div className="workout-summary card">
      <h2>🔥 Today's Summary</h2>
      <div className="summary-grid">
        <div className="summary-item">
          <h4>Calories Burned</h4>
          <p className="highlight">{summary.calories} kcal</p>
        </div>
        <div className="summary-item">
          <h4>Workout Duration</h4>
          <p className="highlight">{summary.duration} min</p>
        </div>
        <div className="summary-item">
          <h4>Completion</h4>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${summary.completion}%` }}
            ></div>
          </div>
          <p className="highlight">{summary.completion}%</p>
        </div>
        <div className="summary-item">
          <h4>Last Active</h4>
          <p className="highlight">{summary.lastActive}</p>
        </div>
      </div>
    </div>
  );
};

export default WorkoutSummary;
