const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));


let products = [
  { id: 1, name: "Laptop", price: 55000 },
  { id: 2, name: "Smartphone", price: 20000 },
  { id: 3, name: "Headphones", price: 1500 }
];
y)
let cart = [];

// Get all products
app.get("/api/products", (req, res) => {
  res.json(products);
});


app.get("/api/cart", (req, res) => {
  res.json(cart);
});

app.post("/api/cart", (req, res) => {
  const { productId } = req.body;
  const product = products.find(p => p.id === productId);
  if (!product) return res.status(404).json({ error: "Product not found" });

  const item = cart.find(c => c.product.id === productId);
  if (item) {
    item.quantity += 1;
  } else {
    cart.push({ product, quantity: 1 });
  }
  res.json(cart);
});

app.delete("/api/cart/:id", (req, res) => {
  const id = parseInt(req.params.id);
  cart = cart.filter(c => c.product.id !== id);
  res.json(cart);
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Online Store running → http://localhost:${PORT}`));
