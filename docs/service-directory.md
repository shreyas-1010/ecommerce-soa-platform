# Service Directory

| Service | Responsibility | Example API endpoints |
|---|---|---|
| User | Customer accounts and profiles | `POST /api/users/register`, `POST /api/users/login` |
| Product | Product catalog and search | `GET /api/products`, `GET /api/products/:productId` |
| Cart | Selected products and quantities | `GET /api/cart`, `POST /api/cart/items` |
| Inventory | Stock checks and reservations | `GET /api/inventory/:productId`, `POST /api/inventory/reservations` |
| Order | Order creation and history | `POST /api/orders`, `GET /api/orders/:orderId` |
| Payment | Simulated payment status | `POST /api/payments`, `GET /api/payments/:paymentId` |
| Delivery | Simulated shipment and tracking | `GET /api/deliveries/:orderId` |
| Notification | Customer order messages | `GET /api/notifications` |

## Request flow

The frontend sends HTTP requests to the backend. The Order Service coordinates checkout by requesting cart details, reserving inventory, recording a simulated payment result, and then arranging simulated delivery and notification.

For this assignment, these are planned service boundaries in one backend application. They are not separate deployed servers.
