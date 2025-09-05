# System Architecture Overview

```mermaid
graph TD;
    A[Client] --> B[Web Server];
    B --> C[Application Server];
    C --> D[Database];
    A --> E[API Gateway];
    E --> C;
```
