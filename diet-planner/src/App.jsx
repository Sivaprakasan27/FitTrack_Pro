import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Features from "./components/Features";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Register from "./components/Register";
import Hero from "./components/Hero";
import DieterDashboard from "./components/DieterDashboard";
import DietitianDashboard from "./components/DietitianDashboard";

const HomePage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }
  }, [location.state]);

  return (
    <>
      <Hero />
      <Features />
      <About />
      <Contact />
    </>
  );
};

const Layout = ({ children }) => {
  const location = useLocation();

  // Hide Navbar on dashboard routes
  const hideNavbar =
    location.pathname === "/dieter-dashboard" ||
    location.pathname === "/dietitian-dashboard";

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<HomePage />} />

          {/* Auth Pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Dashboards */}
          <Route path="/dieter-dashboard" element={<DieterDashboard />} />
          <Route path="/dietitian-dashboard" element={<DietitianDashboard />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
