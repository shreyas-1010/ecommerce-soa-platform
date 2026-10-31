# API Catalog

All endpoints are served by the Express backend. Customer-specific routes use the `x-customer-id` request header; if omitted, the API uses `guest`.

These endpoints use in-memory data for this academic demonstration. Data resets when the server restarts.

## Health

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/` | Return API name and status |
| GET | `/api/health` | Check API health |

## Product Service

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/products` | List all products |
| GET | `/api/products?search=:query` | Search products by text |
| GET | `/api/products/:productId` | Retrieve one product |

## Cart Service

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/cart` | View the customer's cart |
| POST | `/api/cart/items` | Add a product and quantity |
| DELETE | `/api/cart/items/:productId` | Remove a product from the cart |

### Add cart item request

```json
{
  "productId": "p-1001",
  "quantity": 2
}
