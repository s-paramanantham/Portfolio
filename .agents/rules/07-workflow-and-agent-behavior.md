# Rule 07: Implementation Workflow & Agent Behavior

Reference: [steering.md Section 4, 5, 30, 31, 32](file:///c:/Users/Admin/OneDrive/Desktop/Parama-v2.0/Portfolio/Define/Artifacts/steering.md)

## Implementation Workflow (6 Steps)

1. **Step 1 — Inspect**:
   - Inspect existing folder structure, related Views, ViewModels, services, interfaces, mock services, ApiClient, helpers, configs, tests, and routing before writing code.
2. **Step 2 — Identify Reuse**:
   - Search for existing base components, feature components, ViewModels, services, interfaces, helpers, and API methods to avoid duplicate code.
3. **Step 3 — Define Architecture**:
   - Define Model (strictly typed, zero `any`) -> Service Interface -> Service Implementation -> Mock Service -> ViewModel -> View (Tailwind CSS) -> Tests.
4. **Step 4 — Implement**:
   - Implement layers following strict dependency direction: `View` -> `ViewModel` -> `Service Interface` -> `Service Implementation` -> `ApiClient` -> `Axios`.
   - Style all UI using **Tailwind CSS**.
   - Enforce **strict TypeScript with zero `any`** declarations.
5. **Step 5 — Test**:
   - Test rendering, user interaction, loading states, error handling, empty states, success flow, and service mocking.
6. **Step 6 — Validate**:
   - Run `tsc --noEmit` to verify zero TypeScript errors and zero `any` types.
   - Verify linter status, test suite, and routing/ErrorBoundary integration.

## Agent Behavior Mandate

1. Always review and adhere to `Define/Artifacts/steering.md` before making changes.
2. **Always use Tailwind CSS for all UI styling.**
3. **Never declare or use `any` in TypeScript.**
4. Never silently bypass an architectural rule.
5. Report unavoidable architectural deviations to the user with clear rationale.
6. Make the smallest appropriate change; avoid unnecessary refactoring or modifying unrelated files.
