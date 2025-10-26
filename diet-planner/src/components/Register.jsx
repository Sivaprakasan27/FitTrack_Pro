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
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={handleChange}
          required
        />

        <select
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
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="height"
              placeholder="Height (cm)"
              value={formData.height}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="weight"
              placeholder="Weight (kg)"
              value={formData.weight}
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
