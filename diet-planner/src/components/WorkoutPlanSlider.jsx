import React, { useState, useEffect } from "react";
import "./WorkoutPlanSlider.css";
import WorkoutCard from "./WorkoutCard";
import sampleWorks from "./sampleWorks";

const WorkoutPlanSlider = ({ bmiCategory }) => {
  const [current, setCurrent] = useState(0);
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const category = bmiCategory || user?.bmiCategory;

    if (category && sampleWorks[category]) {
      setWorkouts(sampleWorks[category].days);
    } else {
      setWorkouts([]);
    }
  }, [bmiCategory]);

  const nextSlide = () => setCurrent((current + 1) % workouts.length);
  const prevSlide = () => setCurrent((current - 1 + workouts.length) % workouts.length);

  if (!workouts.length) {
    return (
      <div className="workout-slider card">
        <h3>No workout plan available</h3>
        <p>Calculate your BMI to unlock your weekly plan.</p>
      </div>
    );
  }

  return (
    <div className="workout-slider">
      <h2 className="slider-title">
        {sampleWorks[bmiCategory]?.title || "Weekly Workout Plan"}
      </h2>

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

      <div className="dots">
        {workouts.map((_, i) => (
          <span
            key={i}
            className={`dot ${i === current ? "active" : ""}`}
            onClick={() => setCurrent(i)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default WorkoutPlanSlider;
