import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-container d-flex flex-column min-vh-100">
      <Navbar />

      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-overlay"></div>

        <div className="hero-content text-center">
          <h1>Fresh. Homemade. Delivered.</h1>
          <p>Discover delicious meals crafted with love.</p>

          <a href="/menu" className="btn btn-primary btn-lg mt-4">
            Explore Menu
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
}
