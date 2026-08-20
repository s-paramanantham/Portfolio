# Rule 04: Services, Centralized API Client & Dependency Injection

Reference: [steering.md Section 5, 17, 18, 19, 27, 28](file:///c:/Users/Admin/OneDrive/Desktop/Parama-v2.0/Portfolio/Define/Artifacts/steering.md)

## 1. Service Abstraction Layer

Services must be designed with strict interface segregation and strong TypeScript types (zero `any`):

```text
Service Interface (e.g. UserService.interface.ts)
      ├── Production Implementation (UserService.ts -> ApiClient)
      └── Mock Implementation (MockUserService.ts -> in-memory/fixture data)
```

- **ViewModel depends only on the Service Interface**, never directly on the concrete class.
- ViewModels should accept service instances via dependency injection or a service factory.
- All method parameters and return types must be explicitly typed with domain models or TypeScript generics. **Never use `any`**.

## 2. Centralized Axios API Client (`src/apiclient/`)

All HTTP communication in the entire application must go through the centralized `ApiClient.ts`.
- Direct Axios instantiation in individual services is prohibited.
- `ApiClient` methods (`get<T>`, `post<T>`, `put<T>`, `delete<T>`) must use TypeScript generics, never `any`.
- `ApiClient` handles:
  - Axios instance creation
  - Base URL configuration (`config.api.baseUrl`)
  - Request Interceptors: Auth token injection, correlation IDs, common headers.
  - Response Interceptors: Error normalization, auth token expiration/refresh, logging.

## 3. Mock Services

- Every service must provide a corresponding `Mock*.ts` implementation implementing the exact same interface.
- Allows seamless switching between production API and unit/integration testing or offline development.
