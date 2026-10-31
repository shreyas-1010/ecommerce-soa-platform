# Service Responsibility and Dependency Matrix

| Service | Owns or manages | Depends on | Used by |
|---|---|---|---|
| User | Customer profiles and account operations | None in this model | Cart, Order, Notification |
| Product | Product details, categories, and search | None in this model | Cart, Order |
| Cart | A customer's selected product IDs and quantities | User, Product | Order |
| Inventory | Available stock and temporary reservations | Product | Order |
| Order | Order records and order status | User, Cart, Inventory, Payment, Delivery, Notification | Frontend |
| Payment | Simulated payment status | Order request data | Order |
| Delivery | Simulated shipment and tracking status | Confirmed order details | Order, Frontend |
| Notification | Customer-facing messages | User, Order events | Order, Frontend |

## Dependency notes

- The Order Service coordinates checkout and calls the other services through their interfaces.
- Cart and Product provide the item details needed to prepare an order.
- Inventory checks and reserves stock during checkout.
- Payment records a simulated outcome; it does not contact a payment provider.
- Delivery creates simulated tracking information after an order is confirmed.
- Notification sends messages after account or order events.

## Design principle

Each service has one main business responsibility. A service should request information or actions through another service's interface instead of directly changing that service's data.
