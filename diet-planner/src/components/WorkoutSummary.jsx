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
    let totalCalories = 0;
    let completed = 0;
    const totalDays = Object.keys(progressData).length;

    Object.values(progressData).forEach((entry) => {
      if (entry.completion === 100) {
        completed++;
        totalCalories += entry.calories || 0;
      }
    });

    setSummary({
      calories: totalCalories,
      duration: completed * 30,
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
    <div className="workout-summary-card">
      <h3>🔥 Workout Summary</h3>
      <p className="summary-sub">
        Your daily workout snapshot — stay on track and crush your goals!
      </p>

      <div className="summary-grid">
        <div className="summary-item">
          <h4>Calories Burned</h4>
          <p className="highlight">{summary.calories} kcal</p>
        </div>

        <div className="summary-item">
          <h4>Total Duration</h4>
          <p className="highlight">{summary.duration} mins</p>
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
