const express = require("express");
const productService = require("./services/productService");
const cartService = require("./services/cartService");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    name: "E-Commerce SOA API",
    status: "running"
  });
});

app.get("/api/health", (req, res) => {
  res.json({ status: "healthy" });
});

app.get("/api/products", (req, res) => {
  const products = productService.listProducts(req.query.search || "");
  res.json({ data: products });
});

app.get("/api/products/:productId", (req, res) => {
  const product = productService.findProductById(req.params.productId);

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  res.json({ data: product });
});

app.get("/api/cart", (req, res) => {
  const customerId = req.header("x-customer-id") || "guest";
  res.json({ data: cartService.getCartWithProducts(customerId) });
});

app.post("/api/cart/items", (req, res) => {
  const customerId = req.header("x-customer-id") || "guest";
  const { productId, quantity } = req.body;

  const result = cartService.addItem(customerId, productId, quantity);

  if (result.error) {
    const status = result.error === "Product not found" ? 404 : 400;
    return res.status(status).json({ error: result.error });
  }

  res.status(201).json(result);
});

app.delete("/api/cart/items/:productId", (req, res) => {
  const customerId = req.header("x-customer-id") || "guest";
  const cart = cartService.removeItem(customerId, req.params.productId);
  res.json({ data: cart });
});

module.exports = app;
