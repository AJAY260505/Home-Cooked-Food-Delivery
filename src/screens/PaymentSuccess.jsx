import React from "react";
import { Link } from "react-router-dom";
import "./PaymentSuccess.css";

export default function PaymentSuccess() {
  return (
    <div className="success-container">
      <div className="success-card">
        <div className="checkmark">✓</div>
        <h2>Payment Successful!</h2>
        <p>Your delicious food is on the way 🚀</p>

        <Link to="/myorder" className="track-btn">
          Track Order
        </Link>
      </div>
    </div>
  );
}
