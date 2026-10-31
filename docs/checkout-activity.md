# Checkout Activity Diagram

```mermaid
flowchart TD
    A[Customer submits cart] --> B[Order Service reads cart]
    B --> C[Inventory Service checks and reserves stock]
    C --> D{Stock available?}
    D -- No --> E[Reject checkout and show unavailable items]
    D -- Yes --> F[Payment Service records simulated payment]
    F --> G{Payment successful?}
    G -- No --> H[Release inventory reservation]
    H --> I[Mark order as failed]
    G -- Yes --> J[Confirm order]
    J --> K[Delivery Service creates simulated shipment]
    K --> L[Notification Service sends confirmation]
    L --> M[Show order confirmation]
```

## Decision outcomes

- If stock is unavailable, checkout stops before payment.
- If simulated payment fails, the reservation is released and the order is marked failed.
- If payment succeeds, the order is confirmed and delivery and notification steps follow.
