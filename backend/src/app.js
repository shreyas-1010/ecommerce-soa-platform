const express = require("express");

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

module.exports = app;
