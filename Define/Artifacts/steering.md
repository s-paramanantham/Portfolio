# React MVVM Architecture — Steering Rules

## 1. Purpose

This document defines the mandatory architecture, naming conventions, folder structure, styling standards, TypeScript typing rules, service abstraction, API communication, error handling, logging, configuration, and testing standards for the React application.

The application follows the **MVVM (Model–View–ViewModel)** architectural pattern.

The primary goals are:

* Clear separation of concerns
* Maintainable and scalable code
* Testable business logic
* Reusable UI components styled exclusively with **Tailwind CSS**
* Strict **TypeScript typing with zero `any` declarations**
* Replaceable service implementations
* Centralized API communication
* Predictable application behavior
* Consistent naming and structure

These rules are mandatory unless explicitly overridden by the project owner.

---

# 2. Core MVVM Architecture

The application must follow:

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

The View must not directly communicate with APIs or contain business logic.

## View

The View is responsible for:

* Rendering UI using **Tailwind CSS** classes with **full Mobile + Web responsive design**
* Receiving user interactions
* Binding UI state from ViewModel
* Calling ViewModel actions
* Displaying loading states
* Displaying error states
* Displaying empty states
* Displaying successful results

The View should primarily contain presentation logic and styling.

## ViewModel

The ViewModel is responsible for:

* UI-related state
* Application logic
* Business logic required by the screen
* Calling services to retrieve data
* **Zero mock data hardcoded in ViewModels** — all mock fixtures must reside in `Mock<ServiceName>.ts`
* Transforming service responses into UI-friendly data
* Loading state management
* Error state management
* User actions
* Coordinating multiple service calls
* Validation required by the UI

The ViewModel must not contain JSX, CSS/Tailwind classes, or DOM manipulation.

## Service-Level BO and DTO Architecture

Domain entities are organized inside each respective service folder:

* **DTO (`src/services/<ServiceName>/dto/<Entity>.dto.ts`)**: Represents raw network/API request and response payload shapes.
* **BO (`src/services/<ServiceName>/bo/<Entity>.bo.ts`)**: Represents the rich domain business objects and client models consumed by ViewModels and Views, including mapper methods (`toBo()`, `toDto()`).
* Services transform incoming DTOs into BOs for ViewModel consumption.
* Standalone root `models/` folders are replaced by this Service-level BO/DTO structure for cohesive domain encapsulation.

---

# 3. Dependency Direction

Dependencies must flow in one direction.

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

The reverse dependency direction is prohibited.

### Prohibited

```text
❌ View → Axios
❌ View → API
❌ View → Service implementation
❌ Service → React component
❌ Model → React
❌ API Client → ViewModel
```

### Preferred

```text
✅ View → ViewModel
✅ ViewModel → Service Interface
✅ Service → API Client
✅ API Client → Axios
```

---

# 4. Styling Architecture — Tailwind CSS (Mandatory)

All UI styling in the application must strictly use **Tailwind CSS**.

## 4.1 Tailwind CSS Rules

* **Must use Tailwind CSS utility classes** for all layout, spacing, typography, colors, borders, flexbox, grid, animations, and transitions.
* **Prohibited**: Creating ad-hoc vanilla `.css` files for individual components or screens.
* **Prohibited**: Inline `style={{ ... }}` attributes, except for dynamic computed runtime properties (e.g. cursor mouse coordinates on canvas).
* **Theme Tokens**: Colors, fonts, shadows, and custom animations must be defined in `tailwind.config.js` and referenced via standard Tailwind classes (e.g. `bg-slate-900`, `text-indigo-400`, `border-slate-800`).
* **Dark Mode**: Must utilize Tailwind's dark class or dark-first classes (`dark:...` or dark-first default theme).
* **Mandatory Mobile + Web Responsive Design**: Every screen and component must provide first-class responsive user experiences across all viewport tiers:
  * Mobile (<640px): Single-column layouts, touch targets >= 44x44px, hamburger drawer navigation, collapsible accordions.
  * Tablet (640px – 1024px): 2-column grids, optimized spacing.
  * Laptop / Desktop (>1024px): Multi-column grids, rich hover interactions, full horizontal navigation.
  * Must utilize Tailwind responsive utility prefixes (`sm:`, `md:`, `lg:`, `xl:`, `2xl:`). All layouts must prevent unwanted horizontal overflow.

---

# 5. TypeScript & Zero `any` Policy (Mandatory)

The codebase must strictly enforce full TypeScript typing with an absolute ban on `any`.

## 5.1 Zero `any` Rules

* **Never declare `any`** (`no-explicit-any` rule enforced).
* Prohibited:
  ```ts
  // ❌ FORBIDDEN
  let data: any;
  const handleChange = (e: any) => {};
  const [state, setState] = useState<any>(null);
  catch (err: any) {}
  ```
* Preferred:
  ```ts
  // ✅ PREFERRED
  let data: UserProfile;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {};
  const [state, setState] = useState<UserProfile | null>(null);
  catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
  }
  ```
* **Strict Typing Everywhere**:
  * Component Props must be defined with explicit TypeScript interfaces (`export interface ButtonProps { ... }`).
  * ViewModel return types must be explicitly typed with interfaces (`export interface UseUserProfileViewModelReturn { ... }`).
  * Service method signatures, parameters, and return Promises must have explicit types (`Promise<UserProfile>`).
  * Unknown API payloads or error boundaries must use `unknown` with runtime type guards (e.g., `typeof`, `instanceof`, or Zod/validation helpers), never `any`.

---

# 6. Naming Conventions

Naming must be consistent, explicit, meaningful, and predictable.

## 6.1 File Naming

All source files must use **PascalCase**.

Examples:

```text
UserProfile.tsx
UserProfile.vm.ts
UserProfile.test.tsx

UserService.ts
UserService.interface.ts
MockUserService.ts

ApiClient.ts
ErrorBoundary.tsx
Logger.ts
Config.ts
```

Do not use:

```text
❌ user-profile.tsx
❌ userProfile.tsx
❌ userprofile.tsx
❌ Userprofile.tsx
❌ user_profile.tsx
```

### React Component

```text
UserProfile.tsx
```

### ViewModel

```text
UserProfile.vm.ts
```

### Test

```text
UserProfile.test.tsx
```

### Service

```text
UserService.ts
```

### Service Interface

```text
UserService.interface.ts
```

### Mock Service

```text
MockUserService.ts
```

---

# 7. Folder Naming

Component and module folders must also use **PascalCase**.

Example:

```text
UI/
├── screens/
│   └── UserProfile/
│
└── reusable/
    ├── base/
    │   └── Button/
    │
    └── feature/
        └── UserSelector/
```

Avoid:

```text
❌ user-profile/
❌ userProfile/
❌ user_profile/
```

Use:

```text
✅ UserProfile/
```

---

# 8. Variable Naming

Variables must use `camelCase`.

Examples:

```ts
const userProfile: UserProfile = ...;
const selectedUserId: string = ...;
const isLoading: boolean = ...;
const userPermissions: readonly Permission[] = ...;
```

Boolean variables must clearly communicate boolean intent:

```ts
isLoading
isAuthenticated
hasPermission
canSubmit
shouldRefresh
```

Avoid ambiguous names:

```ts
loading
auth
permission
submit
```

---

# 9. Function Naming

Functions must use `camelCase`.

Function names must clearly describe their behavior:

```ts
getUserProfile(): Promise<UserProfile>
updateUserProfile(profile: UserProfile): Promise<UserProfile>
loadDashboard(): Promise<void>
handleSubmit(event: React.FormEvent<HTMLFormElement>): void
validateUser(user: UserProfile): boolean
deleteUser(userId: string): Promise<void>
refreshData(): Promise<void>
```

Event handlers should normally use:

```text
handle + Action
```

Examples:

```ts
handleSubmit()
handleDelete()
handleUserSelection()
handleSearch()
```

---

# 10. Type, Interface, Enum, and Class Naming

Types, interfaces, enums, and classes must use **PascalCase**.

Examples:

```ts
UserProfile
UserProfileResponse
UserService
UserServiceInterface
DashboardViewModel
ApplicationConfig
ApiResponse<T>
```

Avoid unnecessary abbreviations or `any` fallbacks.

---

# 11. Constants

Constants should use a consistent convention based on their scope.

Application-level immutable configuration values may use `UPPER_SNAKE_CASE`:

```ts
MAX_RETRY_COUNT
DEFAULT_PAGE_SIZE
REQUEST_TIMEOUT
```

Local constants may use `camelCase`:

```ts
const apiConfig: ApiConfig = ...;
const defaultUser: UserProfile = ...;
```

---

# 12. Required Folder Structure

The application must follow this structure:

```text
root/
└── src/
    ├── helpers/
    ├── config/
    ├── apiclient/
    ├── services/
    │   ├── <ServiceName>/
    │   │   ├── <ServiceName>.interface.ts
    │   │   ├── <ServiceName>ApiService.ts
    │   │   ├── Mock<ServiceName>.ts
    │   │   ├── dto/
    │   │   │   └── <Entity>.dto.ts
    │   │   └── bo/
    │   │       └── <Entity>.bo.ts
    │   └── ServiceFactory.ts
    │
    ├── UI/
    │   ├── screens/
    │   │   └── UserProfile/
    │   │       ├── UserProfile.tsx
    │   │       ├── UserProfile.vm.ts
    │   │       └── UserProfile.test.tsx
    │   │
    │   └── reusable/
    │       ├── base/
    │       │   └── Button/
    │       │       ├── Button.tsx
    │       │       ├── Button.vm.ts
    │       │       └── Button.test.tsx
    │       │
    │       └── feature/
    │           └── UserSelector/
    │               ├── UserSelector.tsx
    │               ├── UserSelector.vm.ts
    │               └── UserSelector.test.tsx
    │
    └── other-dependent-folders/
```

---

# 13. Screen Structure

Every screen/module should follow:

```text
UserProfile/
├── UserProfile.tsx
├── UserProfile.vm.ts
└── UserProfile.test.tsx
```

## UserProfile.tsx

Contains:

* UI rendering with **Tailwind CSS** classes
* Component composition
* User interaction binding
* ViewModel consumption
* Presentation logic

## UserProfile.vm.ts

Contains:

* Screen state (strictly typed, zero `any`)
* Application logic
* Service calls to retrieve data
* **Zero mock data hardcoded in ViewModels** — all mock data must come from `Mock<ServiceName>.ts`
* Data transformation (DTO ↔ BO)
* Validation
* UI actions

## UserProfile.test.tsx

Contains tests for:

* Rendering & snapshot expectations
* User interactions
* Loading behavior
* Error behavior
* Successful behavior
* Important screen behavior

---

# 14. Reusable UI Architecture

Reusable UI components are divided into:

```text
Base Components
        ↓
Feature Components
        ↓
Screens
```

---

# 15. Base Components

Base components are generic UI building blocks styled with Tailwind CSS.

Examples:

```text
Button
Input
Select
Modal
Card
Table
Loader
Checkbox
Typography
Dropdown
```

Location:

```text
src/UI/reusable/base/
```

Example:

```text
Button/
├── Button.tsx
├── Button.vm.ts
└── Button.test.tsx
```

Base components must:

* Be generic and reusable
* Use Tailwind CSS for all styling
* Avoid business-specific behavior
* Avoid API communication
* Avoid application-specific service dependencies
* Use strict TypeScript interfaces for all Props

---

# 16. Feature Components

Feature components are reusable application-level UI capabilities.

Examples:

```text
UserSelector
SearchFilter
FileUploader
Pagination
UserProfileCard
NotificationPanel
```

Location:

```text
src/UI/reusable/feature/
```

Example:

```text
UserSelector/
├── UserSelector.tsx
├── UserSelector.vm.ts
└── UserSelector.test.tsx
```

Feature components may compose multiple base components and style layouts with Tailwind CSS.

---

# 17. Service Architecture

Services must use an abstraction layer.

The architecture must support:

```text
Service Interface
      ↓
Service Implementation
      ↓
API Client
```

and:

```text
Service Interface
      ↓
Mock Service
```

Example:

```ts
export interface UserService {
  getUserProfile(userId: string): Promise<UserProfile>;
  updateUserProfile(
    userId: string,
    profile: UserProfile
  ): Promise<UserProfile>;
}
```

Actual service:

```ts
export class UserApiService implements UserService {
  constructor(private apiClient: ApiClientInterface = ApiClient) {}

  async getUserProfile(userId: string): Promise<UserProfile> {
    return this.apiClient.get<UserProfile>(`/users/${userId}`);
  }

  async updateUserProfile(userId: string, profile: UserProfile): Promise<UserProfile> {
    return this.apiClient.put<UserProfile>(`/users/${userId}`, profile);
  }
}
```

Mock service:

```ts
export class MockUserService implements UserService {
  async getUserProfile(userId: string): Promise<UserProfile> {
    return { id: userId, name: "Mock User", email: "mock@example.com" };
  }

  async updateUserProfile(userId: string, profile: UserProfile): Promise<UserProfile> {
    return profile;
  }
}
```

---

# 18. API Client

All HTTP communication must go through a centralized **Axios-based API Client**.

The API client is responsible for:

* Axios instance creation
* Base URL configuration
* Request configuration
* Common headers
* Authentication handling
* Request interceptors
* Response interceptors
* Common response handling
* Common error handling

---

# 19. Axios Interceptors

Axios interceptors must be centralized within the API client layer.

## Request Interceptor

* Authentication token injection
* Common headers
* Request metadata
* Correlation IDs

## Response Interceptor

* Common response processing
* Error normalization
* Authentication failures
* Logging

---

# 20. Error Boundary

The application must provide a reusable **Error Boundary**.

Location:

```text
src/UI/reusable/base/ErrorBoundary/
├── ErrorBoundary.tsx
├── ErrorBoundary.vm.ts
└── ErrorBoundary.test.tsx
```

The router must invoke and compose the Error Boundary structure:

```text
Router
   ↓
ErrorBoundary
   ↓
Route
   ↓
Screen
```

---

# 21. Routing

Routing must remain centralized.

The router is responsible for:

* Route definitions
* Screen mapping
* Route-level error handling
* Error Boundary integration
* Route-level composition

---

# 22. Logging

The application must use a centralized logger.

Location:

```text
src/helpers/Logger.ts
```

Logging must be dynamically controlled based on configuration/environment:

```ts
Logger.debug(...)
Logger.info(...)
Logger.warn(...)
Logger.error(...)
```

Avoid scattered `console.log`, `console.error`, `console.warn`.

---

# 23. Configuration

Environment-specific configuration must be centralized under `src/config/Config.ts`.

---

# 24. Helpers

Helpers belong under `src/helpers/`. Helpers must be pure, framework-independent, independently testable, and strictly typed with zero `any`.

---

# 25. ViewModel Rules

Every ViewModel must have a clear responsibility.

A ViewModel must not contain:

```text
❌ JSX
❌ Direct DOM manipulation
❌ Hardcoded API URLs
❌ Raw Axios calls
❌ UI styling / Tailwind classes
❌ any types
```

---

# 26. View Rules

Views must remain declarative and styled with Tailwind CSS.

A View must not contain:

```text
❌ Direct API / Axios calls
❌ Business calculations in JSX
❌ Direct service instantiation
❌ any types in props
```

---

# 27. Model Rules

Models must remain independent from React, containing domain interfaces and types with zero `any`.

---

# 28. Testing

Every screen and reusable component must have an associated `*.test.tsx` file.
Tests must cover rendering, user interactions, ViewModel behavior, loading states, error states, and mock services.

---

# 29. Forbidden Patterns

The following patterns are strictly prohibited:

## Direct API access
```text
❌ View → Axios
❌ View → fetch()
❌ View → API endpoint
❌ ViewModel → Axios
```

## Styling Violations
```text
❌ Creating ad-hoc vanilla .css files instead of using Tailwind CSS
❌ Inline style={{ ... }} attributes for static styles
```

## TypeScript Violations
```text
❌ Declaring or using any types anywhere in the codebase (no-explicit-any)
❌ Unchecked type assertions without type guards
```

## Architecture Violations
```text
❌ Large business calculations in JSX
❌ Concrete service dependencies inside ViewModels (must use interfaces)
❌ console.log() / console.error() in application code (must use Logger.ts)
❌ Hardcoded API URLs (must use config.api.baseUrl)
```

---

# 30. Implementation Workflow

1. **Step 1 — Inspect**: Check existing structure, components, services, and models.
2. **Step 2 — Identify Reuse**: Reuse existing Base/Feature components and helpers.
3. **Step 3 — Define Architecture**: Define Model → Service Interface → Service Impl → Mock Service → ViewModel → View (Tailwind CSS) → Tests.
4. **Step 4 — Implement**: Follow strict unidirectional flow with TypeScript strict typing (zero `any`).
5. **Step 5 — Test**: Verify unit tests with mock services.
6. **Step 6 — Validate**: Run `tsc --noEmit` to confirm zero TypeScript errors and zero `any` usage.

---

# 31. Definition of Done

A feature is complete only when:

* [ ] MVVM separation is maintained.
* [ ] **Tailwind CSS** is used for all UI styling (no ad-hoc CSS files).
* [ ] **TypeScript strict typing** is enforced with **ZERO `any` declarations**.
* [ ] File names follow PascalCase.
* [ ] Component folders follow PascalCase.
* [ ] Variables and functions use camelCase.
* [ ] Types/interfaces/classes use PascalCase.
* [ ] Correct folder structure is used.
* [ ] View contains presentation concerns.
* [ ] ViewModel contains application/UI logic.
* [ ] Models remain React-independent.
* [ ] Services are accessed through interfaces.
* [ ] Mock services are available and tested.
* [ ] API communication uses the centralized Axios API client.
* [ ] Centralized logging (`Logger.ts`) is used.
* [ ] Error Boundary is integrated with routing.
* [ ] Tests are implemented and passing.
* [ ] TypeScript validation passes (`tsc --noEmit`) with zero errors.
* [ ] Linting passes with zero errors.

---

# 32. Agent Behavior

When working on this project, the coding agent must:

1. Read and follow this steering document before implementing changes.
2. **Always use Tailwind CSS for styling** UI components and screens.
3. **Never declare or use `any` in TypeScript**; use explicit types or `unknown` with type narrowing.
4. Inspect existing code before creating new files.
5. Search for reusable functionality before creating duplicates.
6. Maintain MVVM boundaries.
7. Follow PascalCase file and folder naming.
8. Follow camelCase variable and function naming.
9. Use service interfaces instead of concrete service dependencies.
10. Use the centralized Axios API client and Logger.
11. Create tests for new screens and reusable components.
12. Validate TypeScript compilation (`tsc --noEmit`) with zero errors before concluding work.

---
# End of Steering Rules
