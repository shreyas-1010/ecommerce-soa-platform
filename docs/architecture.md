# SOA Architecture

## Overview

The platform is organized around business services. Each service owns a specific responsibility and exposes operations that other parts of the system can use.

For this academic project, the services are modeled as modules in one backend application. They have separate responsibilities and API boundaries; they are not deployed as separate servers.

## Services

| Service | Responsibility | Example operations |
|---|---|---|
| User | Registration, login, and customer profiles | Register, log in, view profile |
| Product | Product details, categories, and search | List products, view product, search |
| Cart | A customer's selected products | View cart, add item, update quantity, remove item |
| Inventory | Available product quantities | Check stock, reserve stock, release reservation |
| Order | Order creation and order history | Place order, view order, list customer orders |
| Payment | Demonstration payment status | Record payment result, view payment status |
| Delivery | Shipment and tracking information | Create shipment, view tracking status |
| Notification | Order and account messages | Send order confirmation, send status update |

## Example: placing an order

1. The customer submits the cart to the Order Service.
2. The Order Service asks the Inventory Service to check and reserve the requested quantities.
3. The Order Service asks the Payment Service to record a demonstration payment result.
4. If payment succeeds, the Order Service confirms the order and asks the Delivery Service to create a shipment.
5. The Notification Service sends an order confirmation.
6. If payment fails, the Order Service asks Inventory to release the reservation and marks the order as failed.

## Communication

The frontend communicates with the backend through REST-style HTTP endpoints. Backend services communicate through internal module interfaces. This keeps the first version simple while making service responsibilities and interactions explicit.

## Scope and limitations

This project is an academic model. Payment results are simulated; the system does not process real payments or arrange real deliveries. Database persistence and authentication can be added in later phases.
