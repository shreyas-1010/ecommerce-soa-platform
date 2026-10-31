# E-Commerce Platform Using Service-Oriented Architecture

A college project that identifies the business services in an e-commerce platform and models how they interact using Service-Oriented Architecture (SOA).

## Project objective

Analyze common e-commerce capabilities, assign them to services with clear responsibilities, and describe how those services coordinate during order placement.

## Architecture

The project models a **modular monolith**: one backend application with distinct service modules and interfaces. This keeps the academic demonstration manageable while showing service boundaries and interactions.

## Planned services

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
- [API catalog](docs/api-catalog.md)
- [Order interaction diagram](docs/service-interaction.md)
- [Project scope](docs/project-scope.md)
- [Service responsibility matrix](docs/service-matrix.md)
- [SOA glossary](docs/glossary.md)
- `backend/` — Express backend starter

## Technology plan

- Frontend: React
- Backend: Node.js and Express
- Database: MongoDB
- Frontend-to-backend communication: REST-style HTTP APIs

## Project status

The SOA analysis and design documents are being prepared. The backend currently contains a starter API.

## Academic demonstration

Payment and delivery are modeled for demonstration only. This project does not process real payments or arrange real shipments.
