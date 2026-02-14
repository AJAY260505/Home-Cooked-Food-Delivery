import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "./MyOrder.css";

export default function MyOrder() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userEmail = localStorage.getItem("userEmail");
        if (!userEmail) {
          setError("Please login first");
          return;
        }

        const res = await fetch("http://localhost:5000/api/myOrderData", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: userEmail }),
        });

        const result = await res.json();

        if (result.success) {
          setOrders(result.orders);
        } else {
          setError("No orders found");
        }

      } catch (err) {
        console.error(err);
        setError("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <>
      <Navbar />

      <div className="myorder-wrapper">
        <div className="container py-5">
          <h2 className="text-center mb-5 fw-bold">
            🧾 My Orders
          </h2>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" />
            </div>
          ) : error ? (
            <div className="alert alert-danger text-center">{error}</div>
          ) : orders.length === 0 ? (
            <div className="empty-orders text-center">
              <h5>No past orders found</h5>
            </div>
          ) : (
            orders.map((order) => (
              <div key={order._id} className="order-box shadow-sm">

                {/* HEADER */}
                <div
                  className="order-header"
                  onClick={() =>
                    setExpandedOrder(
                      expandedOrder === order._id ? null : order._id
                    )
                  }
                >
                  <div>
                    <h6 className="fw-bold text-dark">
                      {order.orderId}
                    </h6>
                    <small className="text-muted">
                      {new Date(order.createdAt).toLocaleString()}
                    </small>
                  </div>

                  <div className="order-summary">
                    <span className="status delivered">
                      {order.status}
                    </span>
                    <h6 className="fw-bold text-success">
                      ₹{order.total.toFixed(2)}
                    </h6>
                  </div>
                </div>

                {/* DETAILS */}
                {expandedOrder === order._id && (
                  <div className="order-details">

                    <div className="row g-4 mt-3">
                      {order.items.map((item, idx) => {
                        const itemTotal =
                          Number(item.price || 0) *
                          Number(item.qty || 1);

                        return (
                          <div key={idx} className="col-md-3">
                            <div className="order-card">
                              <img src={item.img} alt={item.name} />
                              <div className="order-card-body">
                                <h6>{item.name}</h6>
                                <p>
                                  Qty: {item.qty} | Size: {item.size}
                                </p>
                                <span className="price">
                                  ₹{itemTotal.toFixed(2)}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* BILL */}
                    <div className="bill-summary mt-4">
                      <div>
                        <span>Subtotal</span>
                        <span>₹{order.subtotal.toFixed(2)}</span>
                      </div>
                      <div>
                        <span>Delivery</span>
                        <span>₹{order.delivery.toFixed(2)}</span>
                      </div>
                      <div>
                        <span>GST (5%)</span>
                        <span>₹{order.gst.toFixed(2)}</span>
                      </div>
                      <hr />
                      <div className="fw-bold">
                        <span>Total Paid</span>
                        <span>₹{order.total.toFixed(2)}</span>
                      </div>
                    </div>

                  </div>
                )}

              </div>
            ))
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
