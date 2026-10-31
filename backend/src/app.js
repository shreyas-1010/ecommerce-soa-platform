const express = require("express");
const productService = require("./services/productService");
const cartService = require("./services/cartService");
const inventoryService = require("./services/inventoryService");
const orderService = require("./services/orderService");
const paymentService = require("./services/paymentService");
const deliveryService = require("./services/deliveryService");
const notificationService = require("./services/notificationService");

const app = express();

app.use(express.json());

function getCustomerId(req) {
  return req.header("x-customer-id") || "guest";
}

app.get("/", (req, res) => {
  res.json({ name: "E-Commerce SOA API", status: "running" });
});

app.get("/api/health", (req, res) => {
  res.json({ status: "healthy" });
});

// Product Service
app.get("/api/products", (req, res) => {
  res.json({
    data: productService.listProducts(req.query.search || "")
  });
});

app.get("/api/products/:productId", (req, res) => {
  const product = productService.findProductById(req.params.productId);

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  res.json({ data: product });
});

// Cart Service
app.get("/api/cart", (req, res) => {
  res.json({ data: cartService.getCartWithProducts(getCustomerId(req)) });
});

app.post("/api/cart/items", (req, res) => {
  const { productId, quantity } = req.body;
  const result = cartService.addItem(
    getCustomerId(req),
    productId,
    quantity
  );

  if (result.error) {
    const status = result.error === "Product not found" ? 404 : 400;
    return res.status(status).json({ error: result.error });
  }

  res.status(201).json(result);
});

app.delete("/api/cart/items/:productId", (req, res) => {
  const data = cartService.removeItem(
    getCustomerId(req),
    req.params.productId
  );
  res.json({ data });
});

// Inventory Service
app.get("/api/inventory/:productId", (req, res) => {
  const result = inventoryService.checkStock(req.params.productId);

  if (result.error) {
    return res.status(404).json({ error: result.error });
  }

  res.json({ data: result });
});

app.post("/api/inventory/reservations", (req, res) => {
  const result = inventoryService.reserveStock(req.body.items || []);

  if (result.error) {
    return res.status(409).json(result);
  }

  res.status(201).json(result);
});

app.delete("/api/inventory/reservations/:reservationId", (req, res) => {
  res.json({
    data: inventoryService.releaseReservation(req.params.reservationId)
  });
});

// Order Service
app.post("/api/orders", (req, res) => {
  const result = orderService.placeOrder(getCustomerId(req));

  if (result.error) {
    return res.status(result.status || 400).json(result);
  }

  res.status(201).json(result);
});

app.get("/api/orders", (req, res) => {
  res.json({ data: orderService.listOrders(getCustomerId(req)) });
});

app.get("/api/orders/:orderId", (req, res) => {
  const order = orderService.findOrderById(
    getCustomerId(req),
    req.params.orderId
  );

  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }

  res.json({ data: order });
});

// Payment Service
app.get("/api/payments/:paymentId", (req, res) => {
  const payment = paymentService.findPaymentById(req.params.paymentId);

  if (!payment) {
    return res.status(404).json({ error: "Payment not found" });
  }

  res.json({ data: payment });
});

// Delivery Service
app.get("/api/deliveries/:orderId", (req, res) => {
  const delivery = deliveryService.findDeliveryByOrderId(
    req.params.orderId,
    getCustomerId(req)
  );

  if (!delivery) {
    return res.status(404).json({ error: "Delivery not found" });
  }

  res.json({ data: delivery });
});

// Notification Service
app.get("/api/notifications", (req, res) => {
  res.json({
    data: notificationService.listNotifications(getCustomerId(req))
  });
});

app.patch("/api/notifications/:notificationId/read", (req, res) => {
  const notification = notificationService.markAsRead(
    getCustomerId(req),
    req.params.notificationId
  );

  if (!notification) {
    return res.status(404).json({ error: "Notification not found" });
  }

  res.json({ data: notification });
});

module.exports = app;
