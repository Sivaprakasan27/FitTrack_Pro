import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    role: "",
    age: "",
    height: "",
    weight: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (!formData.role) {
      alert("Please select a role before registering!");
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some((u) => u.username === formData.username)) {
      alert("Username already exists. Please choose another one.");
      return;
    }

    const newUser = {
      name: formData.name,
      email: formData.email,
      username: formData.username,
      password: formData.password,
      role: formData.role,
      ...(formData.role === "Dieter" && {
        age: formData.age,
        height: formData.height,
        weight: formData.weight,
      }),
      bmi: null,
      bmiCategory: null,
      progress: [],
      goals: [],
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration Successful!");
    navigate("/login");
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        
        <label htmlFor="name">Full Name</label>
        <input
          id="name"
          type="text"
          name="name"
          placeholder="Enter your full name"
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Enter your email"
          onChange={handleChange}
          required
        />

        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          name="username"
          placeholder="Choose a username"
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="Enter password"
          onChange={handleChange}
          required
        />

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          name="confirmPassword"
          placeholder="Re-enter password"
          onChange={handleChange}
          required
        />

        <label htmlFor="role">Select Role</label>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
        >
          <option value="">Select your role</option>
          <option value="Dieter">Dieter</option>
          <option value="Dietitian">Dietitian</option>
        </select>

        {formData.role === "Dieter" && (
          <>
            <label htmlFor="age">Age</label>
            <input
              id="age"
              type="number"
              name="age"
              placeholder="Enter your age"
              value={formData.age}
              min={0}
              onChange={handleChange}
              required
            />

            <label htmlFor="height">Height (cm)</label>
            <input
              id="height"
              type="number"
              name="height"
              placeholder="Enter height in cm"
              value={formData.height}
              min={0}
              onChange={handleChange}
              required
            />

            <label htmlFor="weight">Weight (kg)</label>
            <input
              id="weight"
              type="number"
              name="weight"
              placeholder="Enter weight in kg"
              value={formData.weight}
              min={0}
              onChange={handleChange}
              required
            />
          </>
        )}

        <button type="submit" className="btn">Register</button>
      </form>

      <p>
        Already have an account?{" "}
        <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;
