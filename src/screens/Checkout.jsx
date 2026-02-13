import React, { useState } from "react";
import { useCart, useDispatchCart } from "../components/ContextReducer";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Checkout() {
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const cartItems = useCart();
  const dispatch = useDispatchCart();
  const navigate = useNavigate();

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + Number(item.price),
    0
  );

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (!address) {
      alert("Please enter delivery address");
      return;
    }

    if (totalAmount === 0) {
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
      // 🔥 Create Razorpay order from backend
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
 // ✅ from .env
        amount: orderData.amount,
        currency: "INR",
        name: "ComfortEats",
        description: "Food Order Payment",
        order_id: orderData.id,

        handler: async function (response) {
          // ✅ Save order after payment success
          await fetch("http://localhost:5000/api/orderData", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              order_data: cartItems,
              email: localStorage.getItem("userEmail"),
              order_date: new Date().toLocaleString(),
              address: address,
              payment_id: response.razorpay_payment_id,
            }),
          });

          dispatch({ type: "DROP" });
          alert("Payment Successful 🎉 Order Placed!");
          navigate("/");
        },

        prefill: {
          name: localStorage.getItem("userName") || "Customer",
          email: localStorage.getItem("userEmail"),
        },

        theme: {
          color: "#3399cc",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Something went wrong!");
    }

    setLoading(false);
  };

  return (
    <>
      <Navbar />

      <div className="container py-5">
        <h2>Checkout</h2>

        <div className="mb-4">
          <label>Delivery Address</label>
          <textarea
            className="form-control"
            rows="3"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <h4>Total Amount: ₹{totalAmount}</h4>

        <button
          className="btn btn-success mt-3"
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
