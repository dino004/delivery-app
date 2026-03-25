const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI =
  "mongodb+srv://dino_db_user:XWTPcE437RLicooz@cluster0.s3qkrlq.mongodb.net/delivery_app?appName=Cluster0";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ УРА! База данных успешно подключена!"))
  .catch((err) => console.error("❌ Ошибка подключения к БД:", err));

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  shop: String,
});

const Product = mongoose.model("Product", productSchema);

app.get("/api/products", async (req, res) => {
  try {
    const { shop } = req.query;

    const query = shop ? { shop: shop } : {};
    const products = await Product.find(query);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на порту ${PORT}`);
});
