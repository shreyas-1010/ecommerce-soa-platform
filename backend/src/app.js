const express = require("express");
const productService = require("./services/productService");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    name: "E-Commerce SOA API",
    status: "running"
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy"
  });
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

module.exports = app;
