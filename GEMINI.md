# React MVVM Architecture — Mandatory Agent Guidelines

All code in this project must strictly adhere to the steering rules defined in [steering.md](file:///c:/Users/Admin/OneDrive/Desktop/Parama-v2.0/Portfolio/Define/Artifacts/steering.md) and the rules in `.agents/rules/`.

## Core Architectural Rules

1. **MVVM Pattern**:
   - **Model**: Domain entities & types only (React-independent, no API calls, no JSX).
   - **Service Interface / Implementation**: Abstracted services (`UserService.interface.ts`, `UserService.ts`, `MockUserService.ts`).
   - **ApiClient**: Centralized Axios client (`ApiClient.ts`) with request/response interceptors.
   - **ViewModel**: UI state, UI business logic, service calls, data transformation, validation (`*.vm.ts`). **No JSX or DOM access in ViewModels**.
   - **View**: Presentation and binding only (`*.tsx`). **No direct API calls, no Axios, no business logic in Views**.

2. **Strict Dependency Flow**:
   `View` → `ViewModel` → `Service Interface` → `Service Implementation` → `ApiClient` → `Axios` → `API`.
   *Reverse or direct bypass dependencies (e.g. View → Axios, ViewModel → Axios, View → Service) are strictly prohibited.*

3. **Styling with Tailwind CSS (Mandatory)**:
   - **Must use Tailwind CSS** for all UI components, screens, layouts, utilities, animations, and responsive designs.
   - Ad-hoc vanilla CSS files and inline style overrides are prohibited where Tailwind utilities apply.

4. **Strict TypeScript & Zero `any` Policy (Mandatory)**:
   - **Must use TypeScript** across all source files, models, services, ViewModels, Views, and tests.
   - **Never declare `any`** (`no-explicit-any`). Always use explicit types, interfaces, generics, discriminated unions, or `unknown` with runtime type narrowing / type guards.

5. **Naming & Structure**:
   - Files & Folders: **PascalCase** (`UserProfile.tsx`, `UserProfile.vm.ts`, `UserProfile.test.tsx`, `Button/`, `UserProfile/`).
   - Variables & Functions: **camelCase** (`isLoading`, `getUserProfile()`, `handleSubmit()`).
   - Types, Interfaces, Classes: **PascalCase** (`UserProfile`, `UserServiceInterface`).
   - Constants: `UPPER_SNAKE_CASE` for global configs, `camelCase` for local constants.

6. **Component Hierarchy**:
   - `src/UI/reusable/base/` (Generic: Button, Input, Modal, Loader)
   - `src/UI/reusable/feature/` (Feature-specific: UserSelector, SearchFilter)
   - `src/UI/screens/` (Screen-level modules)

7. **Centralized Infrastructure**:
   - `src/config/`: Centralized environment configuration (`config.api.baseUrl`).
   - `src/helpers/Logger.ts`: Centralized logging (`logger.info`, `logger.error`). No scattered `console.log`.
   - `src/UI/reusable/base/ErrorBoundary/`: Reusable ErrorBoundary integrated with centralized routing.

8. **Testing & Validation**:
   - Every screen and reusable component must have a corresponding `.test.tsx` file.
   - Mock services must implement the same interface as production services for testability.
   - Always run TypeScript checks (`tsc --noEmit`) and linting before completing work with zero `any` and zero type errors.

---
*For detailed specifications, see individual rule files in `.agents/rules/` and the master steering document at [steering.md](file:///c:/Users/Admin/OneDrive/Desktop/Parama-v2.0/Portfolio/Define/Artifacts/steering.md).*
