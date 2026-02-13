import React from "react";
import { Link } from "react-router-dom";
import "./PaymentSuccess.css";

export default function PaymentSuccess() {

  const orderId = "ORD-" + Math.floor(100000 + Math.random() * 900000);

  return (
    <div className="success-wrapper">

      <div className="success-card">

        <div className="success-animation">
          <div className="circle">
            <span className="tick">✓</span>
          </div>
        </div>

        <h2>Payment Successful 🎉</h2>
        <p>Your order has been placed successfully.</p>

        <div className="order-info">
          <span>Order ID</span>
          <strong>{orderId}</strong>
        </div>

        <div className="success-buttons">
          <Link to="/myorder" className="primary-btn">
            Track Order
          </Link>

          <Link to="/" className="secondary-btn">
            Back to Home
          </Link>
        </div>

      </div>
    </div>
  );
}
