import React from "react";
import { useCart, useDispatchCart } from "../components/ContextReducer";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import "./Cart.css";

export default function Cart() {
  const data = useCart();
  const dispatch = useDispatchCart();
  const navigate = useNavigate();

  // ✅ Proper calculation using unitPrice * qty
  const subtotal = data.reduce(
    (total, item) => total + item.unitPrice * item.qty,
    0
  );

  const deliveryFee = subtotal > 0 ? 40 : 0;
  const total = subtotal + deliveryFee;

  const handleCheckOut = () => {
    navigate("/checkout");
  };

  const increaseQty = (index, item) => {
    dispatch({
      type: "UPDATE_QTY",
      index,
      qty: item.qty + 1,
    });
  };

  const decreaseQty = (index, item) => {
    if (item.qty > 1) {
      dispatch({
        type: "UPDATE_QTY",
        index,
        qty: item.qty - 1,
      });
    }
  };

  if (data.length === 0) {
    return (
      <div className="cart-container">
        <div className="empty-cart">
          <div className="empty-icon">🛒</div>
          <h3>Your cart feels lonely 😢</h3>
          <p>Add something delicious to make it happy!</p>
          <button
            className="browse-btn"
            onClick={() => navigate("/menu")}
          >
            Browse Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-wrapper">

        {/* LEFT SIDE - ITEMS */}
        <div className="cart-items">
          <h2>Your Cart</h2>

          {data.map((item, index) => (
            <div key={index} className="cart-item-card">

              <img
                src={item.img}
                alt={item.name}
                className="cart-item-img"
              />

              <div className="cart-item-details">
                <h4>{item.name}</h4>
                <p>Size: {item.size}</p>

                <div className="qty-controls">
                  <button onClick={() => decreaseQty(index, item)}>
                    -
                  </button>

                  <span>{item.qty}</span>

                  <button onClick={() => increaseQty(index, item)}>
                    +
                  </button>
                </div>
              </div>

              <div className="cart-item-right">
                <h5>₹{item.unitPrice * item.qty}</h5>

                <button
                  className="delete-btn"
                  onClick={() => dispatch({ type: "REMOVE", index })}
                >
                  <DeleteIcon />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT SIDE - SUMMARY */}
        <div className="cart-summary">
          <h3>Order Summary</h3>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>

          <div className="summary-row">
            <span>Delivery Fee</span>
            <span>₹{deliveryFee}</span>
          </div>

          <hr />

          <div className="summary-row total">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <button className="checkout-btn" onClick={handleCheckOut}>
            Proceed to Checkout →
          </button>
        </div>
      </div>
    </div>
  );
}
