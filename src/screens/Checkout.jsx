import React, { useState } from "react";
import { useCart, useDispatchCart } from "../components/ContextReducer";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Checkout.css";

export default function Checkout() {
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  const cartItems = useCart();
  const dispatch = useDispatchCart();
  const navigate = useNavigate();

  /* ================================
     SAFE CALCULATIONS
  ================================= */

  const subtotal = cartItems.reduce((acc, item) => {
    const price = Number(item.unitPrice || item.price || 0);
    const qty = Number(item.qty || 1);
    return acc + price * qty;
  }, 0);

  const FREE_DELIVERY_LIMIT = 299;

  const deliveryFee =
    subtotal > 0 && subtotal < FREE_DELIVERY_LIMIT ? 40 : 0;

  const remainingForFree =
    subtotal < FREE_DELIVERY_LIMIT
      ? FREE_DELIVERY_LIMIT - subtotal
      : 0;

  const deliveryProgress = Math.min(
    (subtotal / FREE_DELIVERY_LIMIT) * 100,
    100
  );

  const gst = subtotal * 0.05;

  const totalAmount = Math.max(
    subtotal + deliveryFee + gst - discount,
    0
  );

  /* ================================
     COUPON SYSTEM
  ================================= */

  const applyCoupon = () => {
    const code = coupon.trim().toUpperCase();

    if (code === "SAVE10") {
      setDiscount(subtotal * 0.1);
    } else if (code === "FLAT50") {
      setDiscount(50);
    } else if (code === "WELCOME") {
      setDiscount(subtotal * 0.05);
    } else {
      alert("Invalid coupon");
      setDiscount(0);
    }
  };

  /* ================================
     RAZORPAY LOADER
  ================================= */

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  /* ================================
     HANDLE PAYMENT
  ================================= */

  const handlePayment = async () => {
    if (!address.trim()) {
      alert("Please enter delivery address");
      return;
    }

    if (totalAmount <= 0) {
      alert("Cart is empty");
      return;
    }

    setLoading(true);

    const sdkLoaded = await loadRazorpay();
    if (!sdkLoaded) {
      alert("Razorpay SDK failed to load");
      setLoading(false);
      return;
    }

    try {
      const orderRes = await fetch(
        "http://localhost:5000/api/payment/create-order",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: totalAmount }),
        }
      );

      const orderData = await orderRes.json();

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: "INR",
        name: "ComfortEats",
        description: "Food Order Payment",
        order_id: orderData.id,

        handler: async function (response) {
          await fetch("http://localhost:5000/api/orderData", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              order_data: cartItems,
              email: localStorage.getItem("userEmail"),
              order_date: new Date().toLocaleString(),
              address,
              payment_id: response.razorpay_payment_id,
              total: totalAmount,
            }),
          });

          dispatch({ type: "DROP" });
          navigate("/payment-success");
        },

        prefill: {
          name: localStorage.getItem("userName") || "Customer",
          email: localStorage.getItem("userEmail"),
        },

        theme: {
          color: "#ff6b35",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      console.error(err);
      alert("Payment failed");
    }

    setLoading(false);
  };

  /* ================================
     UI
  ================================= */

  return (
    <>
      <Navbar />

      <div className="container py-5">
        <h2 className="mb-4">Checkout</h2>

        {/* ADDRESS */}
        <div className="mb-4">
          <label className="form-label">Delivery Address</label>
          <textarea
            className="form-control"
            rows="3"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        {/* FREE DELIVERY PROGRESS */}
        {subtotal > 0 && (
          <div className="free-delivery-box">
            {remainingForFree > 0 ? (
              <>
                <p>
                  Add ₹{remainingForFree.toFixed(2)} more for
                  <strong> FREE Delivery 🚚</strong>
                </p>

                <div className="progress-bar-wrapper">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${deliveryProgress}%` }}
                  ></div>
                </div>
              </>
            ) : (
              <p className="free-unlocked">
                🎉 Free Delivery Unlocked!
              </p>
            )}
          </div>
        )}

        {/* COUPON */}
        <div className="d-flex gap-2 mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="Enter coupon"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
          />
          <button className="btn btn-dark" onClick={applyCoupon}>
            Apply
          </button>
        </div>

        {/* SUMMARY */}
        <div className="border rounded p-4 bg-light shadow-sm">
          <div className="d-flex justify-content-between">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>

          <div className="d-flex justify-content-between">
            <span>Delivery Fee</span>
            <span>₹{deliveryFee.toFixed(2)}</span>
          </div>

          <div className="d-flex justify-content-between">
            <span>GST (5%)</span>
            <span>₹{gst.toFixed(2)}</span>
          </div>

          {discount > 0 && (
            <div className="d-flex justify-content-between text-success">
              <span>Discount</span>
              <span>- ₹{discount.toFixed(2)}</span>
            </div>
          )}

          <hr />

          <div className="d-flex justify-content-between fw-bold fs-5">
            <span>Total</span>
            <span>₹{totalAmount.toFixed(2)}</span>
          </div>
        </div>

        <button
          className="btn btn-success mt-4 w-100"
          onClick={handlePayment}
          disabled={loading}
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </div>

      <Footer />
    </>
  );
}
