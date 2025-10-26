import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (id) => {
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: id } });
    } else {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="header">
      <nav className="navbar">
        <div className="logo">🍱Diet & Workout Planner</div>
        <ul className="nav-links">
          <li><button onClick={() => handleNavClick("home")}>Home</button></li>
          <li><button onClick={() => handleNavClick("features")}>Features</button></li>
          <li><button onClick={() => handleNavClick("about")}>About</button></li>
          <li><button onClick={() => handleNavClick("contact")}>Contact</button></li>
        </ul>
        <div className="nav-butt">
          <Link to="/login" className="btn-out">Login</Link>
          <Link to="/register" className="btn-reg">Register</Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
