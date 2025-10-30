import React, { useState, useEffect } from "react";
import "./WorkoutCard.css";

const WorkoutCard = ({ day, image, title, exercises, calories }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("workoutProgress")) || {};
    if (saved[day]) setProgress(saved[day].completion);
    const handleResetAll = () => setProgress(0);
  window.addEventListener("resetAllWorkouts", handleResetAll);

  return () => window.removeEventListener("resetAllWorkouts", handleResetAll);
  }, [day]);

  const handleComplete = () => {
    const newProgress = progress < 100 ? 100 : 0;
    setProgress(newProgress);

    const saved = JSON.parse(localStorage.getItem("workoutProgress")) || {};
    saved[day] = {
      completion: newProgress,
      calories,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem("workoutProgress", JSON.stringify(saved));
    window.dispatchEvent(new Event("workoutUpdated"));
  };

  return (
    <div className="workout-card-modern">
      <div className="workout-header">
        <h3>{day}</h3>
        <p className="workout-title">{title}</p>
      </div>

      <div className="workout-image">
        <img src={image} alt={`${day} workout`} />
      </div>

      <ul className="workout-exercise-list">
        {exercises.map((ex, i) => (
          <li key={i}>
            <strong>{ex.name}</strong> — {ex.sets} sets × {ex.reps} reps ({ex.time})
          </li>
        ))}
      </ul>

      <div className="workout-footer">
        <p className="calories">🔥 {calories} kcal</p>

        <div className="progress-wrapper">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className="progress-text">{progress}%</span>
        </div>

       {progress < 100 && (
  <button className="btn-complete-modern active" onClick={handleComplete}>
    Mark Complete ✅
  </button>
)}

      </div>
    </div>
  );
};

export default WorkoutCard;
