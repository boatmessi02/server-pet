const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Product = require("./models/productModel");
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "DELETE","PUT"],
    credentials: true,
  })
);
//ใช้สำหรับ set json ของ middleware
app.use(express.json());

//ใช้สำหรับ set from ของ middleware
app.use(express.urlencoded({ extended: false }));

mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://admin:mata78100@devadminapi.8rqofun.mongodb.net/Node-API?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connecting to Mongodb");
    app.listen(3001, () => {
      console.log("Node api app is running 3001");
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/products", async (req, res) => {
  try {
    const product = await Product.find({});
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
});

//update product
app.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    if (!product) {
      return res.status(404).json({ message: `Product not found ${id}` });
    }
    const updateProduct = await Product.findById(id);
    res.status(200).json(updateProduct);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
});

//delete product
app.delete("/products/:id", async function (req, res) {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: `Product not found ${id}` });
    }
    res.status(200).json(product);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
});
