import React, { useState, useEffect } from "react";
import "./WorkoutPlanSlider.css";
import WorkoutCard from "./WorkoutCard";
import sampleWorks from "./sampleWorks";

const WorkoutPlanSlider = ({ bmiCategory }) => {
  const [current, setCurrent] = useState(0);
  const [workouts, setWorkouts] = useState([]);

  // Load workouts based on BMI category
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const category = bmiCategory || user?.bmiCategory;
    if (category && sampleWorks[category]) {
      setWorkouts(sampleWorks[category].days);
    } else {
      setWorkouts([]);
    }
  }, [bmiCategory]);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % workouts.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + workouts.length) % workouts.length);

  // ✅ Reset All Workouts + Live Update Broadcast
  const resetAllWorkouts = () => {
    const saved = JSON.parse(localStorage.getItem("workoutProgress")) || {};
    Object.keys(saved).forEach((k) => {
      saved[k].completion = 0;
      saved[k].updatedAt = new Date().toISOString();
    });
    localStorage.setItem("workoutProgress", JSON.stringify(saved));

    // 🔔 Notify all WorkoutCards immediately
    window.dispatchEvent(new CustomEvent("resetAllWorkouts"));
    window.dispatchEvent(new Event("workoutUpdated"));
  };

  if (!workouts.length) {
    return (
      <div className="workout-slider-card">
        <h3>🏋️ No Workout Plan Found</h3>
        <p>Calculate your BMI to unlock personalized weekly workouts.</p>
      </div>
    );
  }

  return (
    <div className="workout-slider-wrapper">
      <h3 className="slider-heading">💪 Your Weekly Workout Plan</h3>

      <div className="slider-container">
        <button className="slider-btn prev" onClick={prevSlide}>⟵</button>

        <div className="slider-window">
          <div
            className="slider-track"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {workouts.map((w, index) => (
              <div className="slide" key={index}>
                <WorkoutCard {...w} />
              </div>
            ))}
          </div>
        </div>

        <button className="slider-btn next" onClick={nextSlide}>⟶</button>
      </div>

      <div className="slider-dots">
        {workouts.map((_, i) => (
          <span
            key={i}
            className={`dot ${i === current ? "active" : ""}`}
            onClick={() => setCurrent(i)}
          ></span>
        ))}
      </div>

      <div className="reset-all-container">
        <button
          className="reset-all-btn"
          onClick={() => {
            if (window.confirm("Reset all workouts?")) resetAllWorkouts();
          }}
        >
          🔄 Reset All Workouts
        </button>
      </div>
    </div>
  );
};

export default WorkoutPlanSlider;
