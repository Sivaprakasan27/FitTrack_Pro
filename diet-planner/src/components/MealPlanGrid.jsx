import React, { useEffect, useState } from "react";
import "./MealPlanGrid.css";

const MealPlanGrid = ({ category }) => {
  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);

  useEffect(() => {
    const mealData = {
      Underweight: [
        {
          meal: "Breakfast",
          item: "Peanut butter toast & milk",
          calories: 450,
          ingredients: ["Whole wheat bread", "Peanut butter", "Milk", "Honey"],
          nutrition: "High in protein and healthy fats for muscle gain.",
        },
        {
          meal: "Lunch",
          item: "Rice, dal & chicken curry",
          calories: 650,
          ingredients: ["Rice", "Lentils", "Chicken", "Spices"],
          nutrition: "Balanced carbs and protein for steady energy.",
        },
        {
          meal: "Snack",
          item: "Banana smoothie",
          calories: 300,
          ingredients: ["Banana", "Milk", "Honey", "Oats"],
          nutrition: "Rich in potassium and helps boost energy.",
        },
        {
          meal: "Dinner",
          item: "Roti with paneer curry",
          calories: 550,
          ingredients: ["Whole wheat flour", "Paneer", "Tomato gravy"],
          nutrition: "Great protein source before sleep.",
        },
      ],
      Normal: [
        {
          meal: "Breakfast",
          item: "Oats with fruits",
          calories: 350,
          ingredients: ["Oats", "Banana", "Berries", "Honey"],
          nutrition: "Boosts digestion and sustained energy.",
        },
        {
          meal: "Lunch",
          item: "Rice, veggies & dal",
          calories: 500,
          ingredients: ["Brown rice", "Mixed vegetables", "Dal"],
          nutrition: "A light and balanced meal with good protein.",
        },
        {
          meal: "Snack",
          item: "Nuts & yogurt",
          calories: 250,
          ingredients: ["Almonds", "Cashews", "Low-fat yogurt"],
          nutrition: "Healthy fats and probiotics for better gut health.",
        },
        {
          meal: "Dinner",
          item: "Grilled chicken & salad",
          calories: 450,
          ingredients: ["Chicken breast", "Lettuce", "Olive oil", "Lemon"],
          nutrition: "Lean protein and fiber-rich greens.",
        },
      ],
      Overweight: [
        {
          meal: "Breakfast",
          item: "Green smoothie",
          calories: 200,
          ingredients: ["Spinach", "Apple", "Cucumber", "Chia seeds"],
          nutrition: "Detox-friendly and rich in micronutrients.",
        },
        {
          meal: "Lunch",
          item: "Brown rice & grilled fish",
          calories: 400,
          ingredients: ["Brown rice", "Fish", "Broccoli"],
          nutrition: "High protein, low-fat meal to aid fat loss.",
        },
        {
          meal: "Snack",
          item: "Apple slices & nuts",
          calories: 150,
          ingredients: ["Apple", "Walnuts", "Cinnamon"],
          nutrition: "Low-calorie snack that keeps you full longer.",
        },
        {
          meal: "Dinner",
          item: "Soup & multigrain toast",
          calories: 300,
          ingredients: ["Vegetable soup", "Wholegrain bread"],
          nutrition: "Light dinner for improved digestion.",
        },
      ],
      Obese: [
        {
          meal: "Breakfast",
          item: "Oats + egg whites",
          calories: 180,
          ingredients: ["Oats", "Egg whites", "Flaxseeds"],
          nutrition: "Low-calorie protein-packed start.",
        },
        {
          meal: "Lunch",
          item: "Steamed veggies & salad",
          calories: 250,
          ingredients: ["Broccoli", "Carrot", "Cabbage", "Lettuce"],
          nutrition: "Fiber-rich and detoxifying.",
        },
        {
          meal: "Snack",
          item: "Cucumber + green tea",
          calories: 120,
          ingredients: ["Cucumber", "Green tea"],
          nutrition: "Refreshes and reduces bloating.",
        },
        {
          meal: "Dinner",
          item: "Soup + grilled tofu",
          calories: 220,
          ingredients: ["Tofu", "Mushroom soup"],
          nutrition: "Light yet protein-dense for weight control.",
        },
      ],
    };

    if (category && mealData[category]) setMeals(mealData[category]);
    else setMeals([]);
  }, [category]);

  if (!category) {
    return (
      <div className="meal-empty">
        <h3>Select your BMI category to view meal plans 🍴</h3>
      </div>
    );
  }

  return (
    <div className="meal-grid">
      <h2 className="meal-title">🥗 {category} Meal Plan</h2>
      <div className="meal-cards">
        {meals.map((m, index) => (
          <div
            className="meal-card"
            key={index}
            onClick={() => setSelectedMeal(m)}
          >
            <h4>{m.meal}</h4>
            <p className="meal-item">{m.item}</p>
            <p className="meal-calories">🔥 {m.calories} kcal</p>
          </div>
        ))}
      </div>

      {/* Meal Modal */}
      {selectedMeal && (
        <div className="meal-modal">
          <div className="meal-modal-content">
            <span
              className="close-modal"
              onClick={() => setSelectedMeal(null)}
            >
              ✖
            </span>
            <h3>{selectedMeal.item}</h3>
            <p className="meal-subtitle">({selectedMeal.meal})</p>
            <h4>🍽 Ingredients</h4>
            <ul>
              {selectedMeal.ingredients.map((ing, i) => (
                <li key={i}>{ing}</li>
              ))}
            </ul>
            <h4>💡 Nutrition Info</h4>
            <p>{selectedMeal.nutrition}</p>
            <p className="meal-calories-modal">
              🔥 Calories: {selectedMeal.calories} kcal
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealPlanGrid;
