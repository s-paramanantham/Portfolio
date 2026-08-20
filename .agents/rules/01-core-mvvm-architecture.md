# Rule 01: Core MVVM Architecture & Dependency Direction

Reference: [steering.md Section 2, 3, 4, 5, 29](file:///c:/Users/Admin/OneDrive/Desktop/Parama-v2.0/Portfolio/Define/Artifacts/steering.md)

## Layer Responsibilities

```text
Model
   ↓
Service Interface / Repository
   ↓
ViewModel
   ↓
View
```

### 1. View (`*.tsx`)
- Responsible for: Rendering UI using **Tailwind CSS**, receiving user events, binding UI state, invoking ViewModel actions, displaying loading/error/empty/success states.
- Presentation logic only.
- **Prohibitions**:
  - NO direct API calls (e.g. `axios.get`, `fetch`).
  - NO direct service instantiation or service calls.
  - NO complex business calculations or data transformations in JSX.
  - NO raw CSS files or inline style blocks where Tailwind CSS applies.
  - NO `any` types in props or event handlers.

### 2. ViewModel (`*.vm.ts`)
- Responsible for: UI-related state, screen business logic, calling service interfaces, transforming service responses for UI consumption, loading/error state management, validation.
- Custom hook pattern: `useUserProfileViewModel()`.
- **Prohibitions**:
  - NO JSX or React component returns.
  - NO direct DOM manipulation.
  - NO direct Axios or fetch calls.
  - NO hardcoded API URLs.
  - NO UI styling, Tailwind class strings, or CSS.
  - NO `any` types in state, parameters, return types, or catch blocks.

### 3. Model
- Responsible for: Domain entities, strict TypeScript interfaces/types, request/response contracts, data structures.
- **Prohibitions**:
  - NO React imports or React hooks.
  - NO UI state management.
  - NO API calls.
  - NO dependencies on ViewModels or Views.
  - NO `any` types.

## Strict Dependency Direction

```text
UI / View
   ↓
ViewModel
   ↓
Service Interface
   ↓
Service Implementation
   ↓
API Client
   ↓
External API
```

### Prohibited Dependencies
- ❌ `View` → `Axios`
- ❌ `View` → `API`
- ❌ `View` → `Service implementation`
- ❌ `ViewModel` → `Axios`
- ❌ `Service` → `React component`
- ❌ `Model` → `React`
- ❌ `API Client` → `ViewModel`
- ❌ `any` in TypeScript across any layer
