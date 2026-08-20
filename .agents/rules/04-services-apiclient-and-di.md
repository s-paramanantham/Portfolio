# Rule 04: Services, Centralized API Client & Dependency Injection

Reference: [steering.md Section 5, 17, 18, 19, 27, 28](file:///c:/Users/Admin/OneDrive/Desktop/Parama-v2.0/Portfolio/Define/Artifacts/steering.md)

## 1. Service Abstraction Layer with BO & DTO

Services must be designed with strict interface segregation, DTO wire shapes, and BO domain models (zero `any`):

```text
src/services/<ServiceName>/
├── <ServiceName>.interface.ts
├── <ServiceName>ApiService.ts    ──► ApiClient ──► Backend REST API (Maps DTO ↔ BO)
├── Mock<ServiceName>.ts          ──► In-memory / Fixture Data (Returns BO)
├── dto/
│   └── <Entity>.dto.ts           ──► Wire transfer shape
└── bo/
    └── <Entity>.bo.ts            ──► Rich Domain Business Object & Mappers
```

- **ViewModel depends only on the Service Interface**, never directly on the concrete class.
- ViewModels should accept service instances via dependency injection or `ServiceFactory`.
- **Zero Mock Data in ViewModels**: ViewModels must never hardcode mock data; all mock data must reside in `Mock<ServiceName>.ts`.
- All method parameters and return types must be explicitly typed with BOs or TypeScript generics. **Never use `any`**.

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
- Mock services contain the complete data fixtures and mock business logic.
