import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import "./About.css";

export default function About() {
  return (
    <>
      <Navbar />

      <div className="about-wrapper">

        {/* HERO SECTION */}
        <section className="about-hero text-center">
          <div className="container">
            <h1>🍽️ About ComfortEats</h1>
            <p>
              Delivering homemade happiness to your doorstep with love,
              freshness, and authenticity.
            </p>
          </div>
        </section>

        {/* OUR STORY */}
        <section className="container py-5">
          <div className="row align-items-center">
            <div className="col-md-6">
              <img
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5"
                alt="Our Kitchen"
                className="img-fluid rounded shadow"
              />
            </div>
            <div className="col-md-6 mt-4 mt-md-0">
              <h2>Our Story</h2>
              <p>
                ComfortEats started with a simple idea — bring the warmth of
                home-cooked meals to busy lives. What began as a small kitchen
                operation has grown into a trusted food brand serving
                thousands of happy customers.
              </p>
              <p>
                Every dish is crafted with carefully selected ingredients,
                traditional recipes, and a whole lot of passion.
              </p>
            </div>
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="why-section py-5">
          <div className="container text-center">
            <h2 className="mb-4">Why Choose Us?</h2>

            <div className="row g-4">
              <div className="col-md-4">
                <div className="about-card">
                  <h4>🌿 Fresh Ingredients</h4>
                  <p>
                    We source the freshest ingredients to ensure quality
                    and authentic taste.
                  </p>
                </div>
              </div>

              <div className="col-md-4">
                <div className="about-card">
                  <h4>🚀 Fast Delivery</h4>
                  <p>
                    Hot and delicious meals delivered quickly to your
                    doorstep.
                  </p>
                </div>
              </div>

              <div className="col-md-4">
                <div className="about-card">
                  <h4>❤️ Homemade Taste</h4>
                  <p>
                    Every recipe carries the warmth and comfort of
                    home-style cooking.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STATS SECTION */}
        <section className="stats-section py-5 text-center">
          <div className="container">
            <div className="row g-4">
              <div className="col-md-3">
                <h2>10K+</h2>
                <p>Happy Customers</p>
              </div>
              <div className="col-md-3">
                <h2>50+</h2>
                <p>Delicious Dishes</p>
              </div>
              <div className="col-md-3">
                <h2>5+</h2>
                <p>Years Experience</p>
              </div>
              <div className="col-md-3">
                <h2>4.8⭐</h2>
                <p>Customer Rating</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="about-cta text-center py-5">
          <div className="container">
            <h2>Ready to Experience the Taste?</h2>
            <p>
              Explore our delicious menu and satisfy your cravings today.
            </p>
            <Link to="/menu" className="btn btn-success px-4 py-2">
              Explore Menu
            </Link>
          </div>
        </section>

      </div>

      <Footer />
    </>
  );
}
