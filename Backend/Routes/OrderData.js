const express = require("express");
const router = express.Router();
const Order = require("../models/Orders");

/* ================= CREATE ORDER ================= */

router.post("/orderData", async (req, res) => {
  try {
    const { order_data, email, address, payment_id } = req.body;

    if (!order_data || !email) {
      return res.status(400).json({
        success: false,
        message: "Missing order data or email",
      });
    }

    // 🔥 Generate proper unique order ID
    const orderId = "ORD-" + Date.now();

    // 🔥 SAFE subtotal calculation
    const subtotal = order_data.reduce((acc, item) => {
      const price = Number(item.unitPrice || item.price || 0);
      const qty = Number(item.qty || 1);

      if (isNaN(price) || isNaN(qty)) return acc;

      return acc + price * qty;
    }, 0);

    const delivery = subtotal > 0 && subtotal < 299 ? 40 : 0;
    const gst = subtotal * 0.05;
    const total = subtotal + delivery + gst;

    // 🔥 Store clean structured items
    const cleanedItems = order_data.map((item) => ({
      id: item.id,
      name: item.name,
      qty: Number(item.qty || 1),
      size: item.size,
      price: Number(item.unitPrice || item.price || 0), // store correct price
      img: item.img,
    }));

    const newOrder = new Order({
      orderId,
      email,
      items: cleanedItems,
      subtotal,
      delivery,
      gst,
      total,
      address,
      paymentId: payment_id,
      status: "Delivered",
    });

    await newOrder.save();

    res.json({
      success: true,
      orderId,
    });

  } catch (error) {
    console.error("Order creation error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});


/* ================= GET MY ORDERS ================= */

router.post("/myOrderData", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email required",
      });
    }

    const orders = await Order.find({ email })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      orders,
    });

  } catch (error) {
    console.error("Fetch orders error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

module.exports = router;
