
import React, { useState, useEffect } from "react";
import "./WorkoutCard.css";

const WorkoutCard = ({ day, image, title, exercises, calories }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("workoutProgress")) || {};
    if (savedData[day]) setProgress(savedData[day].completion);
  }, [day]);

  const handleComplete = () => {
    const newProgress = progress < 100 ? 100 : 0; // toggle complete/reset
    setProgress(newProgress);

    const savedData = JSON.parse(localStorage.getItem("workoutProgress")) || {};
    savedData[day] = {
      completion: newProgress,
      calories,
      updatedAt: new Date().toISOString(),
    };

    localStorage.setItem("workoutProgress", JSON.stringify(savedData));

    // Trigger a window event for other components to update
    window.dispatchEvent(new Event("workoutUpdated"));
  };

  return (
    <div className="workout-card">
      <h3 className="workout-day">{day}</h3>
      <div className="workout-image">
        <img src={image} alt={`${day} workout`} />
      </div>

      <div className="workout-details">
        <h4>{title}</h4>
        <ul className="exercise-list">
          {exercises.map((ex, i) => (
            <li key={i}>
              <strong>{ex.name}</strong> — {ex.sets} sets × {ex.reps} reps ({ex.time})
            </li>
          ))}
        </ul>
      </div>

      <div className="workout-footer">
        <p><strong>🔥 Calories:</strong> {calories} kcal</p>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
        <p>Completion: {progress}%</p>
        <button className="btn-complete" onClick={handleComplete}>
          {progress === 100 ? "Reset 🔄" : "Mark Complete ✅"}
        </button>
      </div>
    </div>
  );
};

export default WorkoutCard;
