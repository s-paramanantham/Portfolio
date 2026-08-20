# Rule 01: Core MVVM Architecture & Dependency Direction

Reference: [steering.md Section 2, 3, 4, 5, 29](file:///c:/Users/Admin/OneDrive/Desktop/Parama-v2.0/Portfolio/Define/Artifacts/steering.md)

## Layer Responsibilities

```text
DTO (Data Transfer Object) ──[Network / API Wire Shape]
       ↓
BO (Business Object)       ──[Domain Model & Business Rules]
       ↓
Service / Repository       ──[Interface & Implementations]
       ↓
ViewModel                  ──[UI State, Actions & Orchestration]
       ↓
View                       ──[Presentation & User Binding with Tailwind CSS]
```

### 1. View (`*.tsx`)
- Responsible for: Rendering UI using **Tailwind CSS** with **full Mobile + Web responsive design**, receiving user events, binding UI state, invoking ViewModel actions, displaying loading/error/empty/success states.
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
  - NO mock data hardcoded directly inside ViewModels — all mock fixtures must reside in `Mock<ServiceName>.ts`.
  - NO JSX or React component returns.
  - NO direct DOM manipulation.
  - NO direct Axios or fetch calls.
  - NO hardcoded API URLs.
  - NO UI styling, Tailwind class strings, or CSS.
  - NO `any` types in state, parameters, return types, or catch blocks.

### 3. Service-Level BO and DTO
- **DTO (`src/services/<Service>/dto/`)**: Raw network/API transfer request and response shapes.
- **BO (`src/services/<Service>/bo/`)**: Rich domain business objects, mappers (`toBo()`, `toDto()`), and presentation entities.
- **Prohibitions**:
  - NO standalone top-level `models/` folders — domain models belong inside their respective service.
  - NO React imports or React hooks in BOs or DTOs.
  - NO `any` types.

## Strict Dependency Direction

```text
UI / View
   ↓
ViewModel
   ↓
Service Interface
   ↓
Service Implementation (transforms DTO ↔ BO)
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
- ❌ `ViewModel` → Hardcoded Mock Data (must use `MockService`)
- ❌ `Service` → `React component`
- ❌ `BO / DTO` → `React`
- ❌ `API Client` → `ViewModel`
- ❌ `any` in TypeScript across any layer
