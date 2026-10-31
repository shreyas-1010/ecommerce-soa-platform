# E-Commerce Platform Using Service-Oriented Architecture

A college project that models an e-commerce platform as business services with clear responsibilities and interfaces.

## Project objective

Identify the main business capabilities of an e-commerce platform, organize them into services, and demonstrate how they coordinate during order placement.

## Architecture

The backend is a modular monolith built with Node.js and Express. It runs as one application with separate modules for Product, Cart, Inventory, Order, Payment, Delivery, and Notification services.

The modules communicate through JavaScript interfaces within the backend. The frontend-facing API uses REST-style HTTP endpoints.

## Services

- **Product Service** — lists and searches products and retrieves product details.
- **Cart Service** — adds, views, and removes cart items.
- **Inventory Service** — checks stock and reserves or confirms inventory.
- **Order Service** — coordinates checkout and provides order history.
- **Payment Service** — records a simulated payment result.
- **Delivery Service** — creates simulated delivery and tracking details.
- **Notification Service** — creates and lists order notifications.

Customer identity uses the `x-customer-id` request header for this academic demonstration; it is not production authentication.

## Repository contents

- [SOA architecture](docs/architecture.md)
- [Architecture decision](docs/architecture-decision.md)
- [API catalog](docs/api-catalog.md)
- [Order interaction diagram](docs/service-interaction.md)
- [Checkout activity diagram](docs/checkout-activity.md)
- [Project scope](docs/project-scope.md)
- [Service responsibility matrix](docs/service-matrix.md)
- [Service directory](docs/service-directory.md)
- [SOA glossary](docs/glossary.md)
- `backend/src/app.js` — Express application and API routes
- `backend/src/server.js` — starts the HTTP server
- `backend/src/services/` — business service modules

## Technology stack

- Backend: Node.js and Express
- API: REST-style HTTP
- Data storage: in-memory sample data

## Run locally

From the `backend/` directory:

```bash
npm install
npm start
