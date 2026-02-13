import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "./MyOrder.css";

export default function MyOrder() {
  const [groupedOrders, setGroupedOrders] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedOrder, setExpandedOrder] = useState(null);

  const fetchMyOrder = async () => {
    try {
      setLoading(true);

      const userEmail = localStorage.getItem("userEmail");
      if (!userEmail) {
        setError("You need to login first");
        setLoading(false);
        return;
      }

      const res = await fetch("http://localhost:5000/api/myOrderData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail }),
      });

      const result = await res.json();
      const nestedData = result.order_data || [];

      const grouped = {};

      nestedData.forEach((orderGroup) => {
        if (!Array.isArray(orderGroup)) return;

        let currentDate = null;

        orderGroup.forEach((item) => {
          if (item.Order_date) {
            currentDate = item.Order_date;
            if (!grouped[currentDate]) grouped[currentDate] = [];
          } else if (currentDate) {
            grouped[currentDate].push(item);
          }
        });
      });

      setGroupedOrders(grouped);
    } catch (err) {
      setError("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  /* ================= SAFE CALCULATION ================= */

  const calculateSubtotal = (items) => {
    return items.reduce((acc, item) => {
      const unitPrice = Number(item.unitPrice || item.price || 0);
      const qty = Number(item.qty || 1);

      if (isNaN(unitPrice) || isNaN(qty)) return acc;

      return acc + unitPrice * qty;
    }, 0);
  };

  return (
    <>
      <Navbar />

      <div className="myorder-wrapper">
        <div className="container py-5">
          <h2 className="text-center mb-5 fw-bold">🧾 My Orders</h2>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" />
            </div>
          ) : error ? (
            <div className="alert alert-danger text-center">{error}</div>
          ) : Object.keys(groupedOrders).length === 0 ? (
            <div className="empty-orders text-center">
              <h5>No past orders found</h5>
            </div>
          ) : (
            Object.entries(groupedOrders)
              .sort((a, b) => new Date(b[0]) - new Date(a[0]))
              .map(([date, items], index) => {

                const subtotal = calculateSubtotal(items);
                const delivery = subtotal < 299 ? 40 : 0;
                const gst = subtotal * 0.05;
                const total = subtotal + delivery + gst;

                const orderId = `ORD-${1000 + index + 1}`;

                return (
                  <div key={date} className="order-box shadow-sm">

                    {/* HEADER */}
                    <div
                      className="order-header"
                      onClick={() =>
                        setExpandedOrder(
                          expandedOrder === date ? null : date
                        )
                      }
                    >
                      <div>
                        <h6 className="fw-semibold mb-1">{orderId}</h6>
                        <small className="text-muted">{date}</small>
                      </div>

                      <div className="order-summary">
                        <span className="status delivered">
                          Delivered
                        </span>
                        <h6 className="fw-bold text-primary mb-0">
                          ₹{total.toFixed(2)}
                        </h6>
                      </div>
                    </div>

                    {/* DETAILS */}
                    {expandedOrder === date && (
                      <div className="order-details">

                        {/* ITEMS */}
                        <div className="row g-4 mt-3">
                          {items.map((item, idx) => {

                            const unitPrice = Number(item.unitPrice || item.price || 0);
                            const qty = Number(item.qty || 1);
                            const itemTotal = unitPrice * qty;

                            return (
                              <div key={idx} className="col-md-3">
                                <div className="order-card">
                                  <img src={item.img} alt={item.name} />
                                  <div className="order-card-body">
                                    <h6>{item.name}</h6>
                                    <p>
                                      Qty: {qty} | Size: {item.size}
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
                            <span>₹{subtotal.toFixed(2)}</span>
                          </div>
                          <div>
                            <span>Delivery</span>
                            <span>₹{delivery.toFixed(2)}</span>
                          </div>
                          <div>
                            <span>GST (5%)</span>
                            <span>₹{gst.toFixed(2)}</span>
                          </div>
                          <hr />
                          <div className="fw-bold">
                            <span>Total Paid</span>
                            <span>₹{total.toFixed(2)}</span>
                          </div>
                        </div>

                      </div>
                    )}
                  </div>
                );
              })
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
