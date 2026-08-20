---
name: generate-solution-document
description: >-
  Generates or updates the Solution Document (SD) by reading the Requirement, Template, Prototype, and steering rules. Prompts for or verifies file paths for Requirement, Template, and Prototype before generating. Enforces mandatory Tailwind CSS styling and strict TypeScript (zero any) across all technical specifications.
---

# Solution Document (SD) Generation Skill

This skill guides the agent in generating a comprehensive **Solution Document (SD)** based on the project's requirements, visual/UX prototype, standard SD template, and mandatory steering/architecture rules.

---

## 1. File Path Inputs & Verification

Before generating the Solution Document, verify or prompt the user for the 3 required source files:

1. **Requirement File**: (Default: [Requirement.md](file:///c:/Users/Admin/OneDrive/Desktop/Parama-v2.0/Portfolio/Design/Requirement/Requirement.md))
2. **Template File**: (Default: [Template.md](file:///c:/Users/Admin/OneDrive/Desktop/Parama-v2.0/Portfolio/Design/Solution%20Document/Template.md))
3. **Prototype / UX File**: (Default: [Prototype.md](file:///c:/Users/Admin/OneDrive/Desktop/Parama-v2.0/Portfolio/Design/Protype/Prototype.md))
4. **Steering Rules**: (Mandatory: [steering.md](file:///c:/Users/Admin/OneDrive/Desktop/Parama-v2.0/Portfolio/Define/Artifacts/steering.md) and [.agents/rules/](file:///c:/Users/Admin/OneDrive/Desktop/Parama-v2.0/Portfolio/.agents/rules/))

---

## 2. Generation Procedure

1. **Read All Sources**:
   - Read the **Requirement** file to extract business context, scope, metrics, tech stack, and constraints.
   - Read the **Prototype** file to extract visual hierarchy, user journey, hero/experience sections, interaction design, and UX expectations.
   - Read the **Template** file to ensure every template section and table is populated.
   - Read **`Define/Artifacts/steering.md`** to ensure the technical architecture section adheres to React MVVM, PascalCase naming, centralized ApiClient, logger, error boundary, mandatory **Tailwind CSS** styling, and strict **TypeScript with zero `any`** standards.

2. **Map & Synthesize Content**:
   - **Section 1 (Doc Info)**: Project name, version, author, date.
   - **Section 2 (Problem Statement)**: Current limitations vs. target modern engineering portfolio/application.
   - **Section 3 (Proposed Solution & Architecture)**: MVVM high-level diagram (`View -> ViewModel -> Service Interface -> Service Impl -> ApiClient`), component hierarchy (`Base`, `Feature`, `Screens`), Tailwind CSS styling architecture, and strict TypeScript types (zero `any`).
   - **Section 4 (Functional Requirements)**: FR-001 through FR-00N covering Hero, Experience, Career Journey, Scale Metrics, Featured Projects (Genomics, Migration, AI Chatbot), Capabilities, Contact CTA, etc.
   - **Section 5 (Non-Functional Requirements)**: Performance, smooth 60fps animations, Core Web Vitals, dark mode, responsive design via Tailwind breakpoints.
   - **Section 6 (Accessibility)**: WCAG 2.1/2.2 AA, keyboard navigation, screen reader labels, color contrast.
   - **Section 7 (Security)**: Safe contact forms, no exposed credentials/secrets, sanitized inputs.
   - **Section 8 & 9 (Data & Integration)**: Data models, API contracts, third-party integrations (Stitch, WebSockets, SSE where applicable).
   - **Sections 10–25**: In-scope, out-of-scope, assumptions, risks/mitigations, testing strategy (unit/integration/E2E), rollback, decision logs.

3. **Write the Output**:
   - Save the completed document to `Design/Solution Document/Solution_Document.md` (or the user-specified destination).
   - Verify that no placeholders (e.g. `<Describe...>`) remain unfilled.
   - Verify that Tailwind CSS and strict TypeScript with zero `any` are explicitly documented in the architectural specifications.
