require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Product = require("./models/Product.js");
const Order = require("./models/Order.js");

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("The database has been connected successfully!"))
  .catch((err) => console.error("Error connecting to the database", err));

app.get("/api/products", async (req, res) => {
  try {
    const { shop } = req.query;

    const query = shop ? { shop: shop } : {};
    const products = await Product.find(query);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error while receiving goods" });
  }
});

app.post("/api/orders", async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res
      .status(201)
      .json({ message: "Order created successfully!", order: newOrder });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating order", error: error.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на порту ${PORT}`);
});
