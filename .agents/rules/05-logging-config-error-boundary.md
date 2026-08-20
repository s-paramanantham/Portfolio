# Rule 05: Logging, Configuration & Helpers

Reference: [steering.md Section 20, 21, 22](file:///c:/Users/Admin/OneDrive/Desktop/Parama-v2.0/Portfolio/Define/Artifacts/steering.md)

## 1. Centralized Logger (`src/helpers/Logger.ts`)

- All logging must go through `Logger.ts` (`logger.debug`, `logger.info`, `logger.warn`, `logger.error`).
- **Forbidden**: Direct `console.log()`, `console.warn()`, `console.error()` in application code.
- Dynamic environment control:
  - Development: Verbose logging.
  - Production: Controlled logging.
- **Security**: Never log sensitive data (auth tokens, passwords, secrets, PII, sensitive payloads).

## 2. Centralized Configuration (`src/config/`)

- Environment variables and application configuration must be centralized under `src/config/`.
- **Forbidden**: Hardcoding API URLs or environment-specific values in components or services.
- Access via `config.api.baseUrl`, `config.app.environment`, etc.

## 3. Helpers (`src/helpers/`)

- Must be pure, framework-independent, and free of React dependencies where possible.
- Independently testable with single responsibilities.
- Must not contain business or domain logic (business logic belongs in ViewModels or Services).
