# Service Interaction: Placing an Order

```mermaid
sequenceDiagram
    actor Customer
    participant UI as Web Frontend
    participant Order as Order Service
    participant Cart as Cart Service
    participant Inventory as Inventory Service
    participant Payment as Payment Service
    participant Delivery as Delivery Service
    participant Notify as Notification Service

    Customer->>UI: Submit checkout
    UI->>Order: Place order
    Order->>Cart: Get cart items
    Cart-->>Order: Items and quantities
    Order->>Inventory: Check and reserve stock
    Inventory-->>Order: Reservation result
    Order->>Payment: Record simulated payment
    Payment-->>Order: Payment result
    Order->>Delivery: Create shipment
    Delivery-->>Order: Tracking details
    Order->>Notify: Send order confirmation
    Order-->>UI: Order confirmation
    UI-->>Customer: Show confirmation
