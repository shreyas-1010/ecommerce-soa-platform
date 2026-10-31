# E-Commerce Platform Using Service-Oriented Architecture

A college project that identifies the business services in an e-commerce platform and models how they interact using Service-Oriented Architecture (SOA).

## Project objective

Analyze common e-commerce capabilities, assign them to services with clear responsibilities, and show how they coordinate during order placement.

## Architecture

The backend is organized as a modular monolith using Express. It contains business service modules with clear responsibilities and interfaces, demonstrating SOA service boundaries in a manageable application.

## Services

- User
- Product
- Cart
- Inventory
- Order
- Payment
- Delivery
- Notification

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
- `backend/` — Express backend

## Technology stack

- Frontend: React
- Backend: Node.js and Express
- Database: MongoDB
- Frontend-to-backend communication: REST-style HTTP APIs

## Project status

The project includes SOA architecture and service design documentation, along with an Express backend starter.

## Academic demonstration

Payment and delivery are simulated for demonstration. The project does not process real payments or arrange real shipments.
