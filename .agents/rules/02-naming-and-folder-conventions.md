# Rule 02: Naming & Folder Conventions

Reference: [steering.md Section 6, 7, 8, 9, 10, 11, 12](file:///c:/Users/Admin/OneDrive/Desktop/Parama-v2.0/Portfolio/Define/Artifacts/steering.md)

## 1. File Naming (PascalCase)

All source files must use **PascalCase**.

- React Component: `UserProfile.tsx`
- ViewModel: `UserProfile.vm.ts`
- Test: `UserProfile.test.tsx`
- Service: `UserService.ts`
- Service Interface: `UserService.interface.ts`
- Mock Service: `MockUserService.ts`
- DTO: `UserProfile.dto.ts`
- BO: `UserProfile.bo.ts`
- Infrastructure: `ApiClient.ts`, `ErrorBoundary.tsx`, `Logger.ts`, `Config.ts`

*Never use kebab-case (`user-profile.tsx`), lower camelCase (`userProfile.tsx`), or snake_case (`user_profile.tsx`).*

## 2. Folder Naming (PascalCase)

Component, module, and service directories must use **PascalCase** (subdirectories like `dto/` and `bo/` use lowercase).
- `src/UI/screens/UserProfile/`
- `src/UI/reusable/base/Button/`
- `src/UI/reusable/feature/UserSelector/`
- `src/services/PortfolioService/`
  - `src/services/PortfolioService/dto/`
  - `src/services/PortfolioService/bo/`

## 3. Variable & Function Naming (camelCase)

- Variables: `const userProfile: UserProfileBo = ...`, `const selectedUserId: string = ...`
- Booleans: Must communicate clear intent: `isLoading`, `isAuthenticated`, `hasPermission`, `canSubmit`, `shouldRefresh`.
- Functions: `getUserProfile()`, `updateUserProfile()`, `loadDashboard()`, `validateUser()`.
- Event Handlers: `handle` + Action (`handleSubmit()`, `handleDelete()`, `handleSearch()`).

## 4. Types, Interfaces, Enums, & Classes (PascalCase)

- Examples: `UserProfileBo`, `UserProfileDto`, `UserService`, `UserServiceInterface`, `ApplicationConfig`.
- **Zero `any`**: All types must be explicitly defined. Never use `any` as a type or fallback.

## 5. Constants

- Global / Environment Immutable Config: `UPPER_SNAKE_CASE` (e.g. `MAX_RETRY_COUNT`, `DEFAULT_PAGE_SIZE`, `REQUEST_TIMEOUT`).
- Local constants: `camelCase` (e.g. `const apiConfig: ApiConfig = ...`).

## 6. Required Folder Structure

```text
src/
├── helpers/                   # Independent utility functions & Logger.ts
├── config/                    # Environment & runtime configuration
├── apiclient/                 # Centralized Axios client & interceptors
├── services/                  # Service interfaces, implementations, mocks, DTOs & BOs
│   ├── PortfolioService/
│   │   ├── PortfolioService.interface.ts
│   │   ├── PortfolioApiService.ts
│   │   ├── MockPortfolioService.ts
│   │   ├── dto/
│   │   └── bo/
│   ├── ContactService/
│   │   ├── ContactService.interface.ts
│   │   ├── ContactApiService.ts
│   │   ├── MockContactService.ts
│   │   ├── dto/
│   │   └── bo/
│   └── ServiceFactory.ts
├── UI/
│   ├── screens/               # Screen-level modules (e.g. UserProfile/)
│   │   └── UserProfile/
│   │       ├── UserProfile.tsx        # Styled with Tailwind CSS (Mobile + Web Responsive)
│   │       ├── UserProfile.vm.ts      # ViewModel with strict TypeScript (Zero mock data)
│   │       └── UserProfile.test.tsx
│   │
│   └── reusable/
│       ├── base/              # Generic UI building blocks (Button, Input, Modal)
│       │   └── Button/
│       │       ├── Button.tsx         # Styled with Tailwind CSS
│       │       ├── Button.vm.ts
│       │       └── Button.test.tsx
│       │
│       └── feature/           # Domain/feature UI components (UserSelector)
│           └── UserSelector/
│               ├── UserSelector.tsx   # Styled with Tailwind CSS
│               ├── UserSelector.vm.ts
│               └── UserSelector.test.tsx
└── other-dependent-folders/
```
