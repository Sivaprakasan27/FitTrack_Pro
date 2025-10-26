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

    // Save to localStorage
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const updated = users.map(u =>
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

    // Notify parent
    onCategorySelect(bmiCategory, true);
  };

  return (
    <div className="card bmi-card">
      <h3>My BMI</h3>
      <input
        type="number"
        placeholder="Height (cm)"
        value={height}
        onChange={e => setHeight(e.target.value)}
      />
      <input
        type="number"
        placeholder="Weight (kg)"
        value={weight}
        onChange={e => setWeight(e.target.value)}
      />
      <button className="btn-primary" onClick={calculateBMI}>
        Calculate
      </button>

      {bmi && (
        <div className="bmi-result">
          <p>Your BMI: <strong>{bmi}</strong></p>
          <p>Category: <strong>{category}</strong></p>
         
        </div>
      )}
    </div>
  );
};

export default BMICard;
