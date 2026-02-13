import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Contact.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully! 🚀");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <>
      <Navbar />

      <div className="contact-wrapper">

        {/* HERO */}
        <section className="contact-hero text-center">
          <div className="container">
            <h1>📩 Contact ComfortEats</h1>
            <p>
              We'd love to hear from you. Reach out for support, feedback,
              or collaboration.
            </p>
          </div>
        </section>

        {/* CONTACT INFO + FORM */}
        <section className="contact-section container py-5">
          <div className="row g-5">

            {/* LEFT SIDE - INFO */}
            <div className="col-lg-5">
              <div className="contact-info-card">
                <h4>Get in Touch</h4>

                <div className="info-item">
                  <span>📧</span>
                  <p>hello@ComfortEats.com</p>
                </div>

                <div className="info-item">
                  <span>📞</span>
                  <p>+1 (123) 456-7890</p>
                </div>

                <div className="info-item">
                  <span>📍</span>
                  <p>123 Gourmet Street, Foodville</p>
                </div>

                <div className="social-icons mt-4">
                  <span>🌐</span>
                  <span>📸</span>
                  <span>🐦</span>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE - FORM */}
            <div className="col-lg-7">
              <div className="contact-form-card">
                <h4>Send Us a Message</h4>

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <textarea
                      name="message"
                      rows="4"
                      className="form-control"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>

                  <button type="submit" className="contact-btn">
                    Send Message →
                  </button>
                </form>
              </div>
            </div>

          </div>
        </section>

        {/* MAP SECTION */}
        <section className="map-section">
          <iframe
            title="ComfortEats Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.086004936188!2d-122.41941508468117!3d37.77492927975961!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c5f0b1f73%3A0x1234567890abcdef!2sFoodville!5e0!3m2!1sen!2sus!4v1616589078432!5m2!1sen!2sus"
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </section>

      </div>

      <Footer />
    </>
  );
}
