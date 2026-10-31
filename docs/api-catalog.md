# API Catalog

These REST-style endpoints describe the planned interface between the frontend and backend. They are a design catalog; implementation will be added incrementally.

Base path: `/api`

## User Service

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/users/register` | Register a customer |
| POST | `/users/login` | Sign in |
| GET | `/users/me` | View the signed-in customer's profile |

## Product Service

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/products` | List products |
| GET | `/products/:productId` | View a product |
| GET | `/products?search=:query` | Search products |

## Cart Service

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/cart` | View the customer's cart |
| POST | `/cart/items` | Add a product and quantity |
| PATCH | `/cart/items/:itemId` | Change item quantity |
| DELETE | `/cart/items/:itemId` | Remove an item |

## Inventory Service

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/inventory/:productId` | Check available quantity |
| POST | `/inventory/reservations` | Reserve quantities for an order |
| DELETE | `/inventory/reservations/:reservationId` | Release a reservation |

## Order Service

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/orders` | Place an order from the cart |
| GET | `/orders` | List the customer's orders |
| GET | `/orders/:orderId` | View order details |

## Payment Service

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/payments` | Record a simulated payment result |
| GET | `/payments/:paymentId` | View payment status |

## Delivery Service

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/deliveries/:orderId` | View shipment and tracking status |

## Notification Service

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/notifications` | List customer notifications |
| PATCH | `/notifications/:notificationId/read` | Mark a notification as read |

## Notes

- `:parameter` denotes a path parameter.
- Customer-specific endpoints assume an authenticated customer.
- Payment operations are for demonstration only and do not contact a payment provider.
- Error responses should use suitable HTTP status codes and a JSON body, for example: `{ "error": "Product not found" }`.
