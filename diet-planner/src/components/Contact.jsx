import React, { useState } from "react";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newMessage = {
      ...formData,
      date: new Date().toLocaleString(),
    };

    const stored = JSON.parse(localStorage.getItem("contactMessages")) || [];
    stored.push(newMessage);
    localStorage.setItem("contactMessages", JSON.stringify(stored));

    alert("Message sent successfully!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="contact">
      <h2>Get in Touch</h2>
      <p>
        Have questions or feedback? Fill out the form below and we’ll get back
        to you soon.
      </p>

      <div className="contact-container">
        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit" className="btn">
            Send Message
          </button>
        </form>

        <div className="contact-info">
          <p>
            Or email us at{" "}
            <a href="mailto:support@dietplanner.com">
              support@dietplanner.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
