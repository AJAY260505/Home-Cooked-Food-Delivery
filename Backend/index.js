// index.js
require("dotenv").config(); // Load environment variables

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const mongoDB = require("./db");

const app = express();

// Use environment port if deployed, otherwise 5000
const port = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://192.168.38.20:3000",
    ],
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use("/api", require("./Routes/Createuser"));
app.use("/api", require("./Routes/DisplayData"));
app.use("/api", require("./Routes/OrderData"));
app.use("/api", require("./Routes/FoodManagement"));
app.use("/api/payment", require("./Routes/Payment"));


// Root Route
app.get("/", (req, res) => {
  res.status(200).send("Backend is running 🚀");
});

// Connect to MongoDB and then start server
const startServer = async () => {
  try {
    await mongoDB(); // Connect DB

    // Make database accessible inside routes if needed
    app.locals.db = mongoose.connection.db;

    app.listen(port, () => {
      console.log(`✅ Server started on port ${port}`);
    });
  } catch (err) {
    console.error("❌ Failed to connect to MongoDB:", err.message);
    process.exit(1); // Exit if DB fails
  }
};

startServer();
