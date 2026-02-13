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

  const calculateTotal = (items) => {
    return items.reduce((acc, item) => acc + item.price, 0);
  };

  return (
    <>
      <Navbar />

      <div className="myorder-wrapper">
        <div className="container py-5">
          <h2 className="text-center mb-5 fw-bold">My Orders</h2>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" />
              <p className="mt-3">Loading your delicious history...</p>
            </div>
          ) : error ? (
            <div className="alert alert-danger text-center">{error}</div>
          ) : Object.keys(groupedOrders).length === 0 ? (
            <div className="empty-orders">
              <h5>No past orders found</h5>
              <p>Start exploring our menu and place your first order!</p>
            </div>
          ) : (
            Object.entries(groupedOrders)
              .reverse()
              .map(([date, items], index) => {
                const total = calculateTotal(items);
                const orderId = `ORD-${index + 1001}`;

                return (
                  <div key={index} className="order-box shadow-sm">
                    
                    {/* ORDER HEADER */}
                    <div
                      className="order-header"
                      onClick={() =>
                        setExpandedOrder(
                          expandedOrder === date ? null : date
                        )
                      }
                    >
                      <div>
                        <h6 className="mb-1 fw-semibold">
                          Order ID: {orderId}
                        </h6>
                        <small className="text-muted">
                          {date}
                        </small>
                      </div>

                      <div className="order-summary">
                        <span className="badge bg-success">
                          Delivered
                        </span>
                        <h6 className="mb-0 fw-bold text-primary">
                          ₹{total}
                        </h6>
                      </div>
                    </div>

                    {/* ORDER ITEMS (Expandable) */}
                    {expandedOrder === date && (
                      <div className="order-items">
                        <div className="row g-4 mt-2">
                          {items.map((item, idx) => (
                            <div
                              key={idx}
                              className="col-12 col-sm-6 col-md-4 col-lg-3"
                            >
                              <div className="order-card">
                                <img
                                  src={item.img}
                                  alt={item.name}
                                />
                                <div className="order-card-body">
                                  <h6>{item.name}</h6>
                                  <p>
                                    Qty: {item.qty} | Size: {item.size}
                                  </p>
                                  <span className="price">
                                    ₹{item.price}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
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
