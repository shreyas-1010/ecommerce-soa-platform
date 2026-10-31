# Architecture Decision: Modular Monolith

- **Status:** Accepted
- **Decision:** Organize the backend as one application with separate modules for each business service.

## Context

The project demonstrates how an e-commerce platform's business capabilities can be identified as services and connected through defined interfaces. Running many independent servers would add setup and deployment work that is outside the assignment's main focus.

## Decision

The first version will use one backend application. Each service will have its own responsibility and interface. The Order Service will coordinate the checkout flow by calling the relevant service interfaces.

## Consequences

- The project is simpler to set up and explain.
- Service boundaries and interactions remain visible in the design.
- The modules are deployed together, so this is not a distributed microservices deployment.
- Independent deployment and scaling of each service are outside the current scope.
- A future version could extract modules into separate services if needed.
