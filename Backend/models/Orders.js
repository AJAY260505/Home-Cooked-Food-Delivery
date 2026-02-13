const mongoose = require("mongoose");

const { Schema } = mongoose;

const OrderSchema = new Schema({
  orderId: {
    type: String,
    required: true,
    unique: true,
  },

  email: {
    type: String,
    required: true,
  },

  items: [
    {
      id: String,
      name: String,
      qty: Number,
      size: String,
      price: Number, // unit price
      img: String,
    },
  ],

  subtotal: Number,
  delivery: Number,
  gst: Number,
  total: Number,

  address: String,
  paymentId: String,

  status: {
    type: String,
    default: "Delivered",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", OrderSchema);
