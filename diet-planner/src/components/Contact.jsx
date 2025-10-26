import React from 'react'
import "./Contact.css";

export const Contact = () => {
  return (
    <section id="contact" className="contact">
  <h2>Get in Touch</h2>
  <p>Have questions or feedback? Fill out the form below and we’ll get back to you soon.</p>

  <div className="contact-container">
    <form className="contact-form">
      <input type="text" placeholder="Your Name" required />
      <input type="email" placeholder="Your Email" required />
      <textarea placeholder="Your Message" rows="5" required></textarea>
      <button type="submit" className="btn">Send Message</button>
    </form>

    <div className="contact-info">
      <p>Or email us at <a href="mailto:support@dietplanner.com">support@dietplanner.com</a></p>
    </div>
  </div>
</section>

  )
}

export default Contact;