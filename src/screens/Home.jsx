import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-container">
      <Navbar />

      {/* ================= HERO ================= */}
      <section className="hero-section">
        <div className="hero-overlay"></div>

        <div className="hero-content">
          <h1>Fresh. Homemade. Delivered.</h1>
          <p>
            Experience comfort food crafted with love and delivered
            straight to your doorstep.
          </p>

          <div className="hero-buttons">
            <Link to="/menu" className="btn-primary">
              Explore Menu
            </Link>

            <Link to="/about" className="btn-outline">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* ================= FEATURED CATEGORIES ================= */}
      <section className="categories-section container">
        <h2 className="section-title">Popular Categories</h2>

        <div className="categories-grid">

          <Link
            to="/menu?category=North Indian"
            className="category-card"
          >
            <img
              src="https://images.unsplash.com/photo-1604908176997-125f25cc6f3d"
              alt="North Indian"
            />
            <h3>North Indian</h3>
          </Link>

          <Link
            to="/menu?category=South Indian"
            className="category-card"
          >
            <img
              src="https://images.unsplash.com/photo-1605478371310-a9f1e96b4ff4"
              alt="South Indian"
            />
            <h3>South Indian</h3>
          </Link>

          <Link
            to="/menu?category=Chinese"
            className="category-card"
          >
            <img
              src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1"
              alt="Chinese"
            />
            <h3>Chinese</h3>
          </Link>

          <Link
            to="/menu?category=Desserts"
            className="category-card"
          >
            <img
              src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
              alt="Desserts"
            />
            <h3>Desserts</h3>
          </Link>

        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="why-section">
        <div className="container why-grid">
          <div className="why-item">
            <h3>🍲 Fresh Ingredients</h3>
            <p>We use only fresh, high-quality ingredients in every dish.</p>
          </div>

          <div className="why-item">
            <h3>🚀 Fast Delivery</h3>
            <p>Hot meals delivered quickly to your doorstep.</p>
          </div>

          <div className="why-item">
            <h3>❤️ Homemade Taste</h3>
            <p>Authentic flavors that feel like home.</p>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="cta-section">
        <div className="container text-center">
          <h2>Ready to Order?</h2>
          <p>Browse our full menu and satisfy your cravings today.</p>

          <Link to="/menu" className="btn-primary">
            View Full Menu
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
