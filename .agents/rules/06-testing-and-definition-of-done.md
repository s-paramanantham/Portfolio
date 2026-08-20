# Rule 06: Testing & Definition of Done

Reference: [steering.md Section 4, 5, 28, 31](file:///c:/Users/Admin/OneDrive/Desktop/Parama-v2.0/Portfolio/Define/Artifacts/steering.md)

## 1. Testing Standards

- Every screen and reusable component must have a corresponding `*.test.tsx` file in the same folder.
- All tests must use strict TypeScript without `any` (use mock data objects conforming to domain interfaces).
- Tests must cover:
  - Component rendering, Tailwind CSS classes, and DOM expectations.
  - User interactions and event firing.
  - ViewModel state transitions (loading, error, empty, success).
  - Service interaction using mock services.
  - ErrorBoundary fallback rendering.
- Real external APIs must never be called during automated testing.

## 2. Definition of Done Checklist

A feature is complete only when all items are verified:

- [ ] **MVVM Separation**: View has no business logic/APIs; ViewModel has no JSX; Model has no React.
- [ ] **Tailwind CSS Mandatory**: All UI styling is implemented using Tailwind CSS utility classes; no ad-hoc CSS files created.
- [ ] **TypeScript Strict Typing (Zero `any`)**: Zero `any` types across all source code, models, ViewModels, Views, and tests.
- [ ] **Naming Conventions**: Files and folders are `PascalCase`; variables/functions are `camelCase`; types/interfaces are `PascalCase`.
- [ ] **Folder Structure**: Clean placement in `src/UI/screens/`, `src/UI/reusable/base/`, `src/UI/reusable/feature/`, `src/services/`, etc.
- [ ] **Service Abstraction**: Service accessed via Interface; Mock service implemented.
- [ ] **API Client**: HTTP calls route exclusively through centralized `ApiClient.ts`.
- [ ] **Logging & Config**: Uses `Logger.ts` (no `console.log`), uses `src/config/` (no hardcoded URLs).
- [ ] **ErrorBoundary & Routing**: Centralized routing wraps views with ErrorBoundary.
- [ ] **Testing**: Unit/Integration tests present in `*.test.tsx` and passing.
- [ ] **TypeScript & Linter**: `tsc --noEmit` passes with zero errors, zero linter errors.
- [ ] **Scope Integrity**: No unrelated files modified; no prohibited architecture patterns introduced.
