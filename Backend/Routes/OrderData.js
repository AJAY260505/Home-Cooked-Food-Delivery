const express = require("express");
const router = express.Router();
const Order = require("../models/Orders");

/* ================= CREATE ORDER ================= */

router.post("/orderData", async (req, res) => {
  try {
    const {
      order_data,
      email,
      address,
      payment_id,
      total,
    } = req.body;

    if (!order_data || !email) {
      return res.status(400).json({ success: false });
    }

    // Generate real order ID
    const orderId = "ORD-" + Date.now();

    // Calculate properly
    const subtotal = order_data.reduce(
      (acc, item) =>
        acc + Number(item.price || 0) * Number(item.qty || 1),
      0
    );

    const delivery = subtotal < 299 ? 40 : 0;
    const gst = subtotal * 0.05;

    const newOrder = new Order({
      orderId,
      email,
      items: order_data,
      subtotal,
      delivery,
      gst,
      total: subtotal + delivery + gst,
      address,
      paymentId: payment_id,
      status: "Delivered",
    });

    await newOrder.save();

    res.json({ success: true });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false });
  }
});

/* ================= GET MY ORDERS ================= */

router.post("/myOrderData", async (req, res) => {
  try {
    const { email } = req.body;

    const orders = await Order.find({ email })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false });
  }
});

module.exports = router;
