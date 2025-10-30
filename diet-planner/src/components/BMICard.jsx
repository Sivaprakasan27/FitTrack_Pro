import React, { useState } from "react";
import "./BMICard.css";

const BMICard = ({ onCategorySelect }) => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");

  const calculateBMI = () => {
    if (!height || !weight) return;
    const result = (weight / ((height / 100) ** 2)).toFixed(2);
    setBmi(result);

    let bmiCategory = "";
    if (result < 18.5) bmiCategory = "Underweight";
    else if (result >= 18.5 && result < 24.9) bmiCategory = "Normal";
    else if (result >= 25 && result < 29.9) bmiCategory = "Overweight";
    else bmiCategory = "Obese";

    setCategory(bmiCategory);

    // Save in localStorage
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const updated = users.map((u) =>
        u.username === currentUser.username
          ? { ...u, bmi: result, bmiCategory }
          : u
      );
      localStorage.setItem("users", JSON.stringify(updated));
      localStorage.setItem(
        "currentUser",
        JSON.stringify({ ...currentUser, bmi: result, bmiCategory })
      );
    }

    onCategorySelect(bmiCategory, true);
  };

  return (
    <div className="bmi-card">
      <h3>📊 Calculate Your BMI</h3>
      <p className="bmi-sub">Know your body status and get personalized plans</p>

      <div className="bmi-inputs">
        <input
          type="number"
          placeholder="Height (cm)"
          value={height}
          min={0}
          onChange={(e) => setHeight(e.target.value)}
        />
        <input
          type="number"
          placeholder="Weight (kg)"
          value={weight}
          min={0}
          onChange={(e) => setWeight(e.target.value)}
        />
      </div>

      <button className="bmi-btn" onClick={calculateBMI}>
        Calculate BMI
      </button>

      {bmi && (
        <div className="bmi-result">
          <div className="bmi-value">
            <h2>{bmi}</h2>
            <p>BMI Value</p>
          </div>
          <div className={`bmi-category ${category.toLowerCase()}`}>
            <p>Category:</p>
            <h4>{category}</h4>
          </div>
        </div>
      )}
    </div>
  );
};

export default BMICard;
