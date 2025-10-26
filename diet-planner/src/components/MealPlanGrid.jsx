
import React, { useState } from "react";
import mealPlans from "./mealPlans";
import "./MealPlanGrid.css";


const MealPlanGrid = ({ category }) => {
  
  
  
  if (!category || !mealPlans[category]) {


    return (
      <div className="no-plan card">
        <h3>Meal Plan</h3>
        <p>Select a BMI category (calculate BMI and click 'View Meal Plan').</p>
      </div>
    );
  }

  const plan = mealPlans[category];

  return (
    <div>
      <h2 className="plan-title">{plan.title}</h2>
      <div className="mealplan-grid">
        {plan.days.map((dayPlan, idx) => (
          <div className="meal-card" key={idx}>
            <h3 className="meal-day">{dayPlan.day}</h3>

            <ul className="meal-list">
              <li><strong>Breakfast:</strong> {dayPlan.breakfast}</li>
              <li><strong>Lunch:</strong> {dayPlan.lunch}</li>
              <li><strong>Evening:</strong> {dayPlan.evening}</li>
              <li><strong>Dinner:</strong> {dayPlan.dinner}</li>
            </ul>

            <div className="nutrition">
              <div><strong>Calories:</strong> {dayPlan.calories} kcal</div>
              <div><strong>Energy:</strong> {dayPlan.energy} kJ</div>
              <div><strong>Proteins:</strong> {dayPlan.proteins} g</div>
            </div>
          </div>
        ))}
      </div>
     
    </div>
  );
};

export default MealPlanGrid;
