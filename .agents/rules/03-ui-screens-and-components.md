# Rule 03: UI Screens, Reusable Components & Responsive Styling Standards

Reference: [steering.md Section 4, 13, 14, 15, 16, 20, 21, 25, 26](file:///c:/Users/Admin/OneDrive/Desktop/Parama-v2.0/Portfolio/Define/Artifacts/steering.md)

## 1. Triad Structure for Screens and Components

Every screen and reusable component must be organized as a 3-file module:

```text
ComponentName/
├── ComponentName.tsx       # View: JSX rendering, UI binding, Tailwind CSS styling
├── ComponentName.vm.ts     # ViewModel: Hook with state, actions, services (Zero any, Zero mock data)
└── ComponentName.test.tsx  # Unit & Integration Tests
```

## 2. Mandatory Mobile + Web View Responsive UI & Tailwind CSS

- **All UI components and screens must be styled exclusively using Tailwind CSS utility classes.**
- **Mandatory Responsive Design**: Every screen and component must provide first-class support for:
  - Mobile (<640px): Single-column grids, touch targets >= 44x44px, hamburger drawer navigation.
  - Tablet (640-1024px): 2-column layouts, adaptive spacing.
  - Laptop / Desktop (>1024px): Multi-column grids, hover enhancements, full horizontal navigation.
  - Must use Tailwind responsive prefixes (`sm:`, `md:`, `lg:`, `xl:`, `2xl:`).
  - No horizontal scrolling overflow on mobile viewports.
- Do NOT create separate `.css` or `.module.css` files for components.
- Do NOT use inline `style={{ ... }}` attributes for static styles.

## 3. Strict TypeScript (Zero `any`)

- All component props must be typed with explicit interfaces (`export interface ButtonProps { ... }`).
- All event handler signatures must use standard React event types (e.g. `React.MouseEvent<HTMLButtonElement>`).
- Never use `any` for props, callbacks, or children.

## 4. Reusable UI Hierarchy

```text
Base Components (src/UI/reusable/base/)
        ↓
Feature Components (src/UI/reusable/feature/)
        ↓
Screens (src/UI/screens/)
```

### Base Components (`src/UI/reusable/base/`)
- Generic building blocks (e.g., `Button`, `Input`, `Select`, `Modal`, `Card`, `Table`, `Loader`, `Checkbox`, `Typography`, `GlassSurface`).
- Must be generic, domain-agnostic, and styled with Tailwind CSS.
- **Forbidden**: Business-specific behavior, API calls, application service dependencies.

### Feature Components (`src/UI/reusable/feature/`)
- Reusable domain-aware capabilities (e.g., `NavigationBar`, `ProjectCard`, `MetricCard`, `TimelineMilestone`, `CapabilityDrawer`, `ContactModal`).
- May compose multiple Base Components.
- Must not turn into full screens.

## 5. Centralized Routing & ErrorBoundary

- Routing must remain centralized in the routing configuration.
- Screens must not define application-level routing behavior.
- Reusable ErrorBoundary (`src/UI/reusable/base/ErrorBoundary/`) must wrap routed screens:

```text
Router
   ↓
ErrorBoundary
   ↓
Route
   ↓
Screen
```
