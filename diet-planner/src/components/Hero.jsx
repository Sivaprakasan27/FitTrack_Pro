import React from "react";
import { Link } from "react-router-dom";
import "./Hero.css";

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <h1>
          Plan Your <span className="highlight-green">Meals</span> &{" "}
          <span className="highlight-blue">Workouts</span> Smarter
        </h1>
        <p>
          Get personalized diet and workout guidance based on your BMI level.
          Stay healthy, fit, and motivated every day!
        </p>

        {/* ✅ FIX: use Link instead of <a> */}
        <Link to="/register" className="btn">
          Get Started
        </Link>

        <ul className="hero-list">
          <li>🍎 Healthy Meals - Balanced diet plan crafted by experts.</li>
          <li>💪 Easy Workouts - Step-by-step fitness routines for all levels.</li>
          <li>📊 Track Progress - Monitor BMI and improve over time.</li>
          <li>⚡ Quick setup - Start with just your height & weight.</li>
        </ul>
      </div>
    </section>
  );
};

export default Hero;
