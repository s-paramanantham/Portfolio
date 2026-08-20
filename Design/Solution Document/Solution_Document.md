# Solution Document (SD)

> **Document Purpose:** Comprehensive solution specification, functional & non-functional requirements, technical architecture, UI/UX design specifications, security, accessibility, and implementation boundaries for the **Paramanantham S — Technical Portfolio & Digital Experience Platform**.

---

## 1. Document Information

| Field                      | Details                                                                    |
| -------------------------- | -------------------------------------------------------------------------- |
| **Project / Product Name** | Paramanantham S — Technical Portfolio & Digital Experience Platform        |
| **Feature / Module**       | Full Stack Interactive Portfolio Platform (React MVVM Architecture)         |
| **Document Version**       | `v1.0`                                                                     |
| **Author**                 | Paramanantham S / Engineering Team                                         |
| **Date**                   | 20-08-2026                                                                 |
| **Document Status**        | Approved for Implementation                                                |
| **Target Role Alignment**  | Full Stack Developer / Software Engineer (Enterprise & Modern Web Apps)    |

---

## 2. Problem Statement

### 2.1 Current Problem

Traditional developer portfolios and standard resume formats suffer from critical limitations that hinder effective technical evaluation by hiring managers, technical leads, and ATS screening systems:

* **Inability to Demonstrate Real Engineering Scale:** Traditional static portfolios rely on simple text lists and bullet points, failing to tangibly communicate large-scale achievements such as migrating 2TB+ of enterprise data across 100K+ conversations with zero throttling, or developing 100+ modules and 300+ production screens for a genomics healthcare platform.
* **Lack of Architectural Rigor in Showcases:** Most developer portfolios are built with ad-hoc code, messy component state, and tightly coupled API calls, failing to demonstrate production-grade architectural patterns such as MVVM (Model-View-ViewModel), Service Abstraction, Centralized API Clients, Dependency Injection, and robust testability.
* **Generic and Forgettable User Experience:** Standard templates follow monotonous layouts (Hero → Static About → Grid Skills → Generic Cards → Basic Form) without interactive visual storytelling, fluid micro-interactions, or responsive performance.
* **Inadequate Real-Time & Systems Visualization:** Complex full-stack capabilities (WebSockets, Server-Sent Events, AWS Bedrock AI integration, third-party enterprise integrations like EPIC EHR, Convesio Pay, LiveKit) are difficult to comprehend without interactive case-study panels and abstract systems visualizations.

### 2.2 Current State

* **Existing Portfolio Landscape:** Generic static resume pages built using basic templates with no reactive state management, inconsistent mobile layouts, poor accessibility (WCAG violations), and missing automated test suites.
* **Existing Architecture:** Scattered `fetch`/`axios` calls embedded directly inside JSX components, unorganized folder hierarchies, hardcoded configuration strings, and no separation between presentation and business logic.
* **Limitations:** High maintenance friction, zero mock-service testability, slow Core Web Vitals, absence of centralized logging and error boundaries, and poor recruiter engagement.
* **Manual Processes:** Manual resume formatting without ATS keyword harmony, manual data updates without structured domain models, and lack of automated CI/CD verification.

---

# 3. Proposed Solution

## 3.1 Solution Overview

The proposed solution is a **2026 high-end engineering/product portfolio and digital identity platform** built with **React, TypeScript, and strict MVVM (Model-View-ViewModel) architecture**. It delivers a dark-first cinematic visual identity, fluid micro-interactions, abstract systems visualizations (representing genomics workflows and data migration pipelines), an interactive career journey, an interactive capabilities matrix, and a centralized service layer with complete mock-service support for 100% offline and testable execution.

## 3.2 Solution Approach

1. **Strict React MVVM Architecture:** Decouple Presentation (Views) from Business Logic & UI State (ViewModels) and Domain Data (Models). All external communication flows through abstracted Service Interfaces, implemented by concrete API Services and Mock Services, powered by a centralized Axios `ApiClient`.
2. **Cinematic & Futuristic Visual Identity:** Implement a sophisticated dark-first design system with glassmorphism surfaces, subtle ambient lighting, dynamic cursor-reactive abstract digital environments, and fluid 60fps animations.
3. **Interactive Visual Storytelling:**
   * **Genomics-Based Healthcare Platform Showcase:** Abstract visualization of genetic patterns, real-time WebSocket/SSE streaming, and third-party healthcare integrations (EPIC EHR, Convesio Pay, Swell, LiveKit).
   * **Enterprise Migration Platform Case Study:** Dynamic interactive visualization showing the transition from Slack to Microsoft Teams across 500+ users, 100K+ conversations, 2TB+ data, and zero throttling incidents.
   * **Engineering Scale Analytics:** Animated counters and interactive data cards highlighting 100+ modules, 300+ screens, and 200+ API integrations.
4. **Interactive Capabilities Explorer:** Categorized capability matrices (Frontend, Backend, Cloud & Infra, AI & Intelligent Systems, Enterprise Integrations, Real-Time Systems, Testing & Quality) with drill-down case studies.
5. **Centralized Infrastructure:** Centralized environment configuration (`src/config/`), centralized logging (`src/helpers/Logger.ts`), and route-integrated Error Boundaries (`src/UI/reusable/base/ErrorBoundary/`).
6. **Strict Quality & Testing Standards:** Complete test coverage with Vitest and React Testing Library for all Views, ViewModels, and reusable components.

## 3.3 Solution Benefits

* **High-Impact Engineering Authority:** Immediately establishes the candidate's expertise as a Full Stack Engineer with 2 years of enterprise production experience.
* **Clean Code & Architectural Excellence:** Serves as a live, open-source reference implementation of React MVVM, SOLID principles, TypeScript strict typing, and automated testing.
* **Exceptional User Engagement & Accessibility:** Provides 60fps fluid interactions, full keyboard navigation, WCAG 2.1/2.2 AA compliance, and responsive layouts across Mobile, Tablet, Laptop, and Desktop.
* **100% Testability & Offline Independence:** Mock services ensure full functionality and comprehensive automated testing without dependency on external backends.

## 3.4 High-Level Architecture

### Architectural Dependency Flow

```text
+--------------------------------------------------------------------+
|                         Presentation (View)                        |
|   (src/UI/screens/*, src/UI/reusable/base/*, feature/*)            |
|   - Declarative JSX rendering, UI binding, User interactions        |
+---------------------------------+----------------------------------+
                                  |
                                  v consumes
+---------------------------------+----------------------------------+
|                       ViewModel Layer (*.vm.ts)                    |
|   - UI state, business logic, validation, data transformation      |
|   - No JSX, No DOM access, No direct Axios                         |
+---------------------------------+----------------------------------+
                                  |
                                  v depends on
+---------------------------------+----------------------------------+
|                    Service Interface Layer (*.interface.ts)        |
|   - Abstract domain contracts (PortfolioService, ContactService)   |
+---------------------------------+----------------------------------+
                                  |
            +---------------------+---------------------+
            |                                           |
            v implements                                v implements
+-----------+---------------+               +-----------+---------------+
|    Production API Service |               |      Mock Service         |
|   (src/services/*.ts)     |               |   (src/services/Mock*.ts) |
+-----------+---------------+               +---------------------------+
            |
            v calls
+-----------+---------------+
|     Centralized ApiClient |
|   (src/apiclient/         |
|    ApiClient.ts)          |
+-----------+---------------+
            |
            v uses
+-----------+---------------+
|       Axios Client        |
|  - Request Interceptors   |
|  - Response Interceptors  |
+-----------+---------------+
            |
            v calls
+-----------+-------------------------------------------------------+
| External APIs / Backend Services                                  |
| (Node.js/Express, Python/FastAPI, AWS Cognito, WebSockets, SSE)   |
+-------------------------------------------------------------------+
```

### Component Hierarchy

```text
src/
├── config/
│   └── Config.ts                        # Centralized Environment & Feature Flags
├── helpers/
│   ├── Logger.ts                        # Centralized Log Levels (debug, info, warn, error)
│   └── Formatters.ts                    # Number/Date Formatters & Sanitizers
├── apiclient/
│   ├── ApiClient.ts                     # Centralized Axios Client & Interceptors
│   └── ApiClient.interface.ts           # ApiClient Contract
├── services/
│   ├── PortfolioService.interface.ts    # Service Contract for Portfolio Data
│   ├── PortfolioApiService.ts           # Production API Service Implementation
│   ├── MockPortfolioService.ts          # Mock Service with Seed Data
│   ├── ContactService.interface.ts      # Contact Submission Service Contract
│   ├── ContactApiService.ts             # Contact API Implementation
│   └── MockContactService.ts            # Mock Contact Service
├── models/
│   ├── Project.model.ts                 # Domain Entities & Types
│   ├── CareerJourney.model.ts
│   ├── ScaleMetric.model.ts
│   ├── Capability.model.ts
│   └── ContactMessage.model.ts
└── UI/
    ├── reusable/
    │   ├── base/                        # Generic Building Blocks
    │   │   ├── Button/ (Button.tsx, Button.vm.ts, Button.test.tsx)
    │   │   ├── Card/
    │   │   ├── Badge/
    │   │   ├── Modal/
    │   │   ├── Input/
    │   │   ├── Textarea/
    │   │   ├── AnimatedCounter/
    │   │   ├── GlassSurface/
    │   │   └── ErrorBoundary/
    │   └── feature/                     # Application-Specific Compound Components
    │       ├── NavigationBar/
    │       ├── ProjectCard/
    │       ├── MetricCard/
    │       ├── TimelineMilestone/
    │       ├── CapabilityDrawer/
    │       └── ContactModal/
    └── screens/                         # Page/Screen Modules
        ├── HomeScreen/                  # Main Portfolio Orchestrator
        │   ├── HomeScreen.tsx
        │   ├── HomeScreen.vm.ts
        │   └── HomeScreen.test.tsx
        ├── HeroSection/
        ├── ExperienceIntroSection/
        ├── CareerJourneySection/
        ├── EngineeringScaleSection/
        ├── FeaturedProjectsSection/
        ├── GenomicsProjectSection/
        ├── MigrationProjectSection/
        ├── CapabilitiesSection/
        ├── AboutSection/
        └── ContactSection/
```

---

# 4. Functional Requirements

## FR-001 — Cinematic Hero & Interactive Abstract Digital Environment

**Description:**
The hero section serves as the primary visual anchor, presenting Paramanantham S, his core titles (*Full Stack Developer / Software Engineer*), and the supporting philosophy statement (*"Building production-grade digital experiences, enterprise platforms and intelligent applications."*). It renders an interactive, cursor-reactive abstract digital canvas representing connected systems, APIs, cloud infrastructure, and data streams.

**Actor:** Visitor / Recruiter / Hiring Manager

**Preconditions:**
* User navigates to the portfolio root URL.
* WebGL / Canvas / CSS hardware-accelerated rendering is available.

**Flow:**
1. System renders the hero container with dark-first atmospheric lighting and typography.
2. System initializes the abstract digital background animation.
3. User moves cursor across the hero area; the abstract particles/nodes respond dynamically to mouse coordinates with smooth damping.
4. User clicks primary CTA buttons: *"Explore My Work"*, *"View Experience"*, or *"Let's Connect"*.
5. System performs a smooth animated scroll to the target section or opens the contact interface.

**Expected Result:**
The hero creates an immediate high-end product impression with 60fps responsiveness and zero layout shift.

---

## FR-002 — Interactive Experience Intro & Animated Scale Counters

**Description:**
Replaces the traditional static "About Me" with an interactive introduction highlighting 2+ years of professional full-stack engineering experience. Key metrics animate upward smoothly when scrolling into the viewport.

**Acceptance Criteria:**
* [ ] Displays `2+ Years Experience`, `Production Applications`, `Enterprise Solutions`, `Full Stack Engineering`.
* [ ] Animated numerical counters trigger upon intersection observer activation.
* [ ] Floating ambient cards incorporate subtle parallax depth on scroll.
* [ ] Respects `prefers-reduced-motion` media query by rendering static final numbers immediately.

---

## FR-003 — Interactive Career Journey Timeline & Case-Study Expansion

**Description:**
Presents a non-linear, interactive career timeline detailing professional roles at AVASOFT (Trainee Engineer, Migration Engineer) and ZEB (Analyst / Full Stack Engineer). Each milestone expands into an interactive case-study panel.

**Actor:** Visitor / Recruiter

**Preconditions:**
* Career journey milestone data is loaded from `PortfolioService`.

**Flow:**
1. User scrolls to the Career Journey section.
2. System displays milestones with company branding, timeframes, and core responsibilities.
3. User hovers or clicks on a milestone (e.g., *ZEB — Genomics Platform* or *AVASOFT — Migration Platform*).
4. System smoothly expands the milestone panel, revealing architecture details, technical ownership, integrated technologies, and quantified impact.
5. User can collapse or switch between milestones seamlessly.

**Expected Result:**
Rich case-study exploration without page reloads or jarring layout shifts.

---

## FR-004 — Engineering Scale & Interactive Analytics Showcase

**Description:**
A dedicated product analytics-style section visualizing the massive scale of systems personally developed and delivered by Paramanantham S.

**Acceptance Criteria:**
* [ ] Highlights the following metrics with large typography and dynamic cards:
  * `100+` Application Modules Personally Developed
  * `300+` Production Screens Personally Developed
  * `200+` API Integrations
  * `500+` Users Supported in Enterprise Migrations
  * `100K+` Conversations / Chats Migrated
  * `2TB+` Enterprise Data Migrated
  * `2` US-based Organizations Migrated
  * `Zero` Throttling Incidents
* [ ] Cards feature subtle 3D tilt and glow transformations on cursor hover.
* [ ] Numbers smoothly count upward on viewport entry.

---

## FR-005 — Featured Projects Showcase & Interactive Gallery

**Description:**
An interactive project gallery showcasing key enterprise and personal full-stack projects:
1. **Genomics-Based Healthcare Platform** (Primary Enterprise Showcase)
2. **Slack → Microsoft Teams Migration Platform** (Enterprise Platform)
3. **Teams → Teams Migration Platform** (SharePoint & Teams Solution)
4. **Personal AI Chatbot** (Full Stack AI Application)
5. **Ticket Booking Application** (Full Stack Booking Engine)

**Acceptance Criteria:**
* [ ] Each project card displays project title, subtitle, technical stack tags, key metrics, and an *"Explore Project"* trigger.
* [ ] Hovering over project cards triggers smooth scale and atmospheric glow effects.
* [ ] Clicking a project opens an in-depth modal or drawer with architecture diagrams, technical challenges, and solution details.

---

## FR-006 — Genomics-Based Healthcare Platform Deep-Dive Showcase

**Description:**
A dedicated deep-dive section for the primary enterprise project at ZEB. Communicates medication recommendation intelligence based on genetic conditions through abstract visual representations of genetic sequences, decision systems, and real-time streaming data.

**Acceptance Criteria:**
* [ ] Visually presents the core tech stack: React, TypeScript, Tailwind CSS, Python, FastAPI, PostgreSQL, pgAdmin, AWS Cognito, AWS Bedrock, WebSockets, Server-Sent Events (SSE).
* [ ] Highlights direct personal ownership: 100+ modules, 300+ screens, 200+ APIs.
* [ ] Details third-party enterprise integrations: Convesio Pay, Swell, Pharmacy Profile, EPIC EHR, LiveKit.
* [ ] Explains real-time two-way WebSocket communication and one-way SSE streaming for medication intelligence.
* [ ] Complies with client confidentiality (no proprietary client names or confidential data).

---

## FR-007 — Enterprise Migration Platform Interactive Visualization

**Description:**
An interactive visual module demonstrating the enterprise migration solution developed at AVASOFT, migrating conversations, files, and channels from Slack to Microsoft Teams.

**Acceptance Criteria:**
* [ ] Visualizes the data pipeline: Slack Source → Node.js/TypeScript Engine + Azure + SQL Server → Microsoft Teams Destination.
* [ ] Displays quantified achievements: 500+ users, 100K+ conversations, 2TB+ data, large-scale file migration, 2 US organizations, zero throttling incidents.
* [ ] Illustrates rate-limiting and throttling mitigation strategies used during migration.

---

## FR-008 — Interactive Capabilities & Technical Skills Matrix

**Description:**
An interactive capabilities explorer replacing traditional static skill bars with categorized, clickable capability nodes.

**Acceptance Criteria:**
* [ ] Organizes skills into logical categories:
  * **Frontend Engineering:** React, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS.
  * **Backend Engineering:** Node.js, Express.js, Python, FastAPI, REST APIs.
  * **Databases & Storage:** PostgreSQL, pgAdmin, SQL Server, SSMS.
  * **Cloud & DevOps:** AWS (Cognito, Bedrock), Azure, Git, GitHub, CI/CD pipelines, DevSecOps, Azure Repositories.
  * **Real-Time & AI Systems:** WebSockets, Server-Sent Events (SSE), AWS Bedrock, RAG, Agentic AI.
  * **Testing & Quality:** Playwright, Automated Unit Testing, Vitest, React Testing Library.
  * **Scripting & Utilities:** PowerShell.
* [ ] Interactive filter tabs allow visitors to isolate specific skill domains.
* [ ] Clicking a skill reveals context on where and how it was applied in production projects.

---

## FR-009 — Concise Personal Narrative & About Section

**Description:**
A high-impact, editorial-style introduction emphasizing engineering philosophy: *"Engineer. Builder. Problem Solver."* Details 2 years of professional experience, education (B.Sc. Computer Science, 84%), and technical mindset.

**Acceptance Criteria:**
* [ ] Concise, punchy typography without walls of text.
* [ ] Highlights education: B.Sc. Computer Science (2020–2023, 84%, Government Arts & Science College, Kadayanallur).
* [ ] Emphasizes core values: production readiness, maintainability, architectural cleanliness, and rapid problem-solving.

---

## FR-010 — Cinematic Contact CTA & Communication Gateway

**Description:**
A compelling closing section with a cinematic call to action: *"Have something worth building? Let's build it."* Provides direct communication channels and an accessible contact message form with client-side validation.

**Actor:** Visitor / Recruiter / Collaborator

**Preconditions:**
* User is on the Contact section.

**Flow:**
1. User views direct contact links: Email (`Paramanantham.S@outlook.com`, `spananth1205@gmail.com`), Phone (`+91 9092079167`), Location (`Chennai, Tamil Nadu, India`), LinkedIn, and GitHub.
2. User fills out the quick message form (Name, Email, Subject, Message).
3. `ContactViewModel` validates inputs using domain validation rules.
4. User clicks *"Send Message"*.
5. `ContactViewModel` invokes `ContactService.sendMessage()`.
6. UI displays loading spinner followed by an animated success confirmation.

**Expected Result:**
Accessible, validated message transmission with graceful error handling and zero data loss.

---

## FR-011 — Minimal Floating Glassmorphism Navigation

**Description:**
A sticky, floating navigation bar with backdrop blur that adapts dynamically as the user scrolls.

**Acceptance Criteria:**
* [ ] Navigation links: `Home`, `Experience`, `Scale`, `Work`, `Genomics`, `Migration`, `Capabilities`, `About`, `Contact`.
* [ ] Active section highlighting based on scroll spy / IntersectionObserver.
* [ ] Smooth scrolling on link clicks with appropriate offset.
* [ ] Mobile drawer menu with touch-optimized tap targets (>= 44x44px).
* [ ] Background elevates from transparent to glassmorphic dark surface on scroll.

---

## FR-012 — Minimal Footer & Identity

**Description:**
A clean, minimal footer displaying copyright, identity information, location (Chennai, India), and social navigation links.

**Acceptance Criteria:**
* [ ] Displays `Paramanantham S — Full Stack Developer / Software Engineer`.
* [ ] Contains clickable links for LinkedIn, GitHub, Email, and resume download.
* [ ] Responsive multi-column layout on desktop, stacked on mobile.

---

## 4.1 Functional Requirement Summary

| ID     | Requirement Name                     | Priority | Actor     | Status   | Target Component / Module   |
| ------ | ------------------------------------ | -------- | --------- | -------- | --------------------------- |
| FR-001 | Cinematic Hero & Abstract Canvas     | High     | Visitor   | Approved | `HeroSection`               |
| FR-002 | Interactive Experience Intro         | High     | Visitor   | Approved | `ExperienceIntroSection`    |
| FR-003 | Career Journey & Case-Study Panels   | High     | Visitor   | Approved | `CareerJourneySection`      |
| FR-004 | Engineering Scale Analytics          | High     | Visitor   | Approved | `EngineeringScaleSection`   |
| FR-005 | Featured Projects Gallery            | High     | Visitor   | Approved | `FeaturedProjectsSection`   |
| FR-006 | Genomics Platform Deep Dive          | High     | Visitor   | Approved | `GenomicsProjectSection`    |
| FR-007 | Enterprise Migration Visualization   | High     | Visitor   | Approved | `MigrationProjectSection`   |
| FR-008 | Capabilities & Skills Matrix         | High     | Visitor   | Approved | `CapabilitiesSection`       |
| FR-009 | Concise About & Education            | Medium   | Visitor   | Approved | `AboutSection`              |
| FR-010 | Cinematic Contact CTA & Form         | High     | Visitor   | Approved | `ContactSection`            |
| FR-011 | Floating Glassmorphism Navigation    | High     | Visitor   | Approved | `NavigationBar`             |
| FR-012 | Minimal Footer & Social Links        | Low      | Visitor   | Approved | `Footer`                    |

---

# 5. Non-Functional Requirements

## 5.1 Performance

* **Initial Page Load:** Largest Contentful Paint (LCP) < `1.2s` on 4G networks.
* **Interaction Latency:** First Input Delay (FID) / Interaction to Next Paint (INP) < `50ms`.
* **Visual Stability:** Cumulative Layout Shift (CLS) < `0.02`.
* **Frame Rate:** All interactive animations, scrolling, and hover transitions must maintain a rock-solid `60 FPS`.
* **Bundle Size:** Initial JavaScript bundle < `150KB` gzip through code-splitting and dynamic imports.
* **Asset Optimization:** SVGs and images optimized with responsive WebP/AVIF formatting and lazy loading.

## 5.2 Scalability

* **Static Delivery:** Platform build deployable to edge CDNs (Vercel, AWS CloudFront/S3, Firebase App Hosting) with global caching.
* **Extensible Data Model:** Modular domain models allow adding new projects, case studies, and skills via JSON configuration without refactoring UI components.
* **Component Reusability:** Layered component hierarchy (`base` → `feature` → `screens`) ensures reusable UI blocks across future subpages.

## 5.3 Availability

* Target uptime: `99.99%` via globally distributed CDN edge locations.
* Zero single point of failure for static assets.
* Offline fallback capability using service worker / cached assets where applicable.

## 5.4 Reliability

* **Graceful Degradation:** If WebGL or advanced CSS features are unsupported, the platform falls back gracefully to CSS gradient animations.
* **Mock Service Fallback:** If live API endpoints are unreachable, `MockPortfolioService` provides immediate fallback data with zero UI breakage.
* **Global Error Boundary:** Any unexpected component render failure is caught by `ErrorBoundary`, displaying a graceful recovery UI without crashing the entire page.

## 5.5 Maintainability

* **Strict MVVM Pattern:** 100% separation of concerns. Views contain zero Axios or business logic; ViewModels contain zero JSX or DOM references.
* **TypeScript Strict Mode:** `strict: true` enabled across all source files with zero `any` types.
* **PascalCase Naming:** All files, folders, classes, types, and components strictly adhere to PascalCase naming conventions.
* **Comprehensive Test Suite:** Unit and integration tests for all ViewModels, Views, and Base Components with minimum 80% code coverage.

## 5.6 Compatibility

* **Modern Browsers:** Google Chrome (latest 2 versions), Microsoft Edge (latest 2 versions), Mozilla Firefox (latest 2 versions), Apple Safari (iOS 15+, macOS 12+).
* **Responsive Breakpoints:**
  * Mobile: `320px – 640px`
  * Tablet: `641px – 1024px`
  * Laptop: `1025px – 1440px`
  * Desktop / Ultra-wide: `1441px+`
* **Operating Systems:** Windows 10/11, macOS, Linux, Android, iOS.

## 5.7 Observability

* **Centralized Logger:** All application logging routed through `src/helpers/Logger.ts`.
* **Environment-Controlled Log Levels:**
  * Development: `debug`, `info`, `warn`, `error`
  * Production: `warn`, `error` (zero sensitive data or credential leakage)
* **Error Telemetry Hooks:** Integrated hooks in `ApiClient` and `ErrorBoundary` for capturing unhandled runtime exceptions.

---

# 6. Accessibility Requirements

The platform is designed to achieve **WCAG 2.1 / 2.2 Level AA** compliance.

## 6.1 Keyboard Accessibility

* Complete keyboard navigation support (`Tab`, `Shift+Tab`, `Enter`, `Space`, `Esc`, `Arrow keys`).
* Highly visible, styled `:focus-visible` focus rings on all interactive elements (buttons, links, inputs, cards).
* Logical DOM tab order matching visual flow.
* `Esc` key closes all active modals, drawers, and mobile menus, returning focus to the triggering element.

## 6.2 Screen Reader Support

* Semantic HTML5 landmark structure (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
* Accessible `aria-label` attributes for icon-only buttons (e.g., social links, menu toggles).
* `aria-expanded` and `aria-controls` attributes on accordions, drawers, and mobile navigation toggles.
* `aria-live="polite"` regions for dynamic counters and contact form status messages.
* Meaningful `alt` text for all informative visual assets and `aria-hidden="true"` for purely decorative shapes.

## 6.3 Visual Accessibility

* High contrast dark theme meeting WCAG AA contrast ratio of at least `4.5:1` for standard text and `3:1` for large text and UI controls.
* Information is never conveyed through color alone (icons, text labels, and underlines accompany color cues).
* Support for browser zoom up to `200%` without text truncation or horizontal layout overflow.
* Full respect for `prefers-reduced-motion` media queries by disabling parallax, smoothing transitions, and showing static numerical values.

## 6.4 Forms and Validation

* Every form control (`Input`, `Textarea`) is programmatically associated with an explicit `<label>`.
* Inline validation errors are announced via `aria-describedby` and styled with accessible color contrast and helper icons.
* Clear visual indication of required vs. optional fields.

## 6.5 Accessibility Acceptance Criteria

* [ ] Full keyboard navigation across all sections without mouse dependency.
* [ ] Screen readers (NVDA, VoiceOver) read all section headings, case-study contents, and metrics accurately.
* [ ] Color contrast passes axe-core automated audits with zero violations.
* [ ] Focus indicators are clearly visible in high-contrast and standard modes.
* [ ] `prefers-reduced-motion` disables heavy particle canvas animations and instant-loads counters.

---

# 7. Security Requirements

## 7.1 Authentication & Authorization

* **Public Access:** The portfolio platform is publicly accessible without mandatory login for general exploration.
* **AWS Cognito Integration Pattern:** The architecture includes client-side authentication contracts in `src/services/` modeling the AWS Cognito token-handling patterns implemented in the Genomics Healthcare project.
* **Secure Token Handling:** When auth tokens are handled, they are stored securely in memory / HTTP-only cookies, never exposed in local storage or logged to console.

## 7.2 Authorization Matrix

| Role            | Capabilities                                                                 |
| --------------- | ---------------------------------------------------------------------------- |
| **Public User** | View portfolio, explore case studies, interact with demos, send contact messages |
| **Admin**       | Edit portfolio contents, view analytics, manage inquiries (Future CMS Scope) |

## 7.3 Data Security & Secrets Management

* **Zero Hardcoded Secrets:** No API keys, AWS credentials, database passwords, or private client identifiers exist in client-side code.
* **Environment Configuration:** All endpoints and public configuration keys are managed via `.env` and accessed strictly through `src/config/Config.ts`.
* **Transport Encryption:** All traffic enforced over HTTPS / TLS 1.3.

## 7.4 API & Input Security

* **Input Sanitization:** All contact form inputs are sanitized on the client before submission to prevent Cross-Site Scripting (XSS).
* **Request Validation:** Strict schema validation on outgoing requests and incoming API responses.
* **Content Security Policy (CSP):** Headers configured to prevent unauthorized script execution and clickjacking (`X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`).

## 7.5 Security Logging and Monitoring

* `Logger.ts` strictly strips sensitive personal data, emails, and credentials before writing to log streams.
* Error messages displayed to users are generic and friendly, preventing exposure of internal stack traces or backend infrastructure details.

---

# 8. Data Requirements

## 8.1 Data Entities

| Entity               | Description                                                                 | Source / Layer               |
| -------------------- | --------------------------------------------------------------------------- | ---------------------------- |
| `Project`            | Project details, tech stack, metrics, case study copy, media assets        | `src/models/Project.model.ts`|
| `CareerMilestone`    | Professional employment history, role, company, dates, achievements        | `src/models/CareerJourney.model.ts` |
| `ScaleMetric`        | Quantified engineering metrics (modules, screens, data volume, users)      | `src/models/ScaleMetric.model.ts`   |
| `CapabilityCategory` | Grouped technical competencies (Frontend, Backend, AI, Cloud, Real-Time)   | `src/models/Capability.model.ts`    |
| `ContactMessage`     | Inbound contact submission (name, email, subject, message, timestamp)      | `src/models/ContactMessage.model.ts`|
| `NavigationItem`     | Navigation links, section anchors, active state tracking                    | `src/models/Navigation.model.ts`    |

## 8.2 Data Validation Rules

* **Contact Form Name:** Required, string, 2–100 characters, alphanumeric with standard punctuation.
* **Contact Form Email:** Required, valid RFC 5322 email format.
* **Contact Form Subject:** Required, string, 5–150 characters.
* **Contact Form Message:** Required, string, 10–2000 characters.
* **API Payloads:** Validated via TypeScript interfaces and runtime schema checks.

## 8.3 Data Retention

* **Contact Submissions:** Ephemeral client state; transferred via API / email service.
* **UI State:** Session storage used for transient user preferences (e.g., active capability filter tab); wiped on tab close.

---

# 9. Integration Requirements

## 9.1 External Systems & Third-Party Services

| System               | Integration Type       | Purpose                                                    | Authentication / Protocol  |
| -------------------- | ---------------------- | ---------------------------------------------------------- | -------------------------- |
| **AWS Cognito**      | REST API / SDK         | Architecture pattern showcase for user authentication      | OAuth 2.0 / JWT            |
| **AWS Bedrock**      | REST / Streaming API   | Architecture pattern showcase for generative AI & RAG      | AWS IAM Signature          |
| **WebSockets**       | Two-way Socket Stream  | Real-time bi-directional communication showcase            | WSS Protocol               |
| **Server-Sent Events**| One-way Event Stream  | Real-time medication recommendations & streaming showcase  | HTTPS SSE Stream           |
| **Convesio Pay**     | REST API               | Healthcare payment processing integration showcase         | API Key / Webhook          |
| **Swell**            | REST API               | E-commerce / subscription management showcase              | Bearer Token               |
| **EPIC EHR**         | FHIR / REST API        | Electronic Health Records interoperability showcase        | SMART on FHIR / OAuth 2.0  |
| **LiveKit**          | WebRTC / WebSocket     | Real-time video/audio consultation integration showcase    | JWT Access Token           |
| **Email Gateway**    | REST API               | Contact form message delivery                              | API Key                    |

## 9.2 API Requirements

* **Base URL:** Configured via `config.api.baseUrl`.
* **Content Type:** `application/json; charset=UTF-8`.
* **Standard Response Envelope:**
  ```ts
  export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
    errors?: string[];
    timestamp: string;
  }
  ```
* **Error Handling:** Standardized HTTP status codes (200, 201, 400, 401, 403, 404, 429, 500) normalized by `ApiClient` response interceptors.

## 9.3 Integration Failure & Resilience Handling

* **Automatic Retries:** Exponential backoff retry (up to 3 attempts) for transient network timeouts on non-mutating GET requests.
* **Timeout Budget:** 10,000ms default request timeout.
* **Mock Service Fallback:** In development or when external endpoints are offline, services automatically utilize Mock implementations to guarantee uninterrupted UI operation.
* **User Feedback:** Clear, non-blocking toast notifications for network disconnects or API errors.

---

# 10. In Scope

The implementation covers the complete frontend engineering and architectural deliverables:

* Full React MVVM Architecture implementation (`src/models`, `src/services`, `src/apiclient`, `src/config`, `src/helpers`, `src/UI`).
* Complete UI/UX screen suite:
  1. `HeroSection` with cursor-reactive abstract digital canvas.
  2. `ExperienceIntroSection` with animated scale counters.
  3. `CareerJourneySection` with expandable case-study panels (AVASOFT, ZEB).
  4. `EngineeringScaleSection` with analytics cards (100+ modules, 300+ screens, 200+ APIs, 2TB+ data, 100K+ chats, zero throttling).
  5. `FeaturedProjectsSection` with project gallery.
  6. `GenomicsProjectSection` deep dive with real-time systems and healthcare integration specs.
  7. `MigrationProjectSection` deep dive with Slack-to-Teams data pipeline visualization.
  8. `CapabilitiesSection` with interactive category filtering.
  9. `AboutSection` with personal narrative and B.Sc. Computer Science education (84%).
  10. `ContactSection` with form validation and direct contact channels.
  11. `NavigationBar` with floating glassmorphism and scroll-spy.
  12. `Footer` with social navigation and identity details.
* Reusable Base UI components (`Button`, `Card`, `Badge`, `Input`, `Textarea`, `Modal`, `AnimatedCounter`, `GlassSurface`, `ErrorBoundary`).
* Reusable Feature components (`ProjectCard`, `MetricCard`, `TimelineMilestone`, `CapabilityDrawer`, `ContactModal`).
* Centralized Axios `ApiClient` with request/response interceptors.
* Centralized `Logger` with level controls.
* Mock service layer (`MockPortfolioService`, `MockContactService`) with realistic seed data.
* Full responsive layouts (Mobile, Tablet, Laptop, Desktop).
* Accessibility compliance (WCAG 2.1/2.2 AA, keyboard navigation, ARIA attributes).
* Complete automated test suite using Vitest and React Testing Library for all Views, ViewModels, and Base Components.

---

# 11. Out of Scope

The following items are explicitly excluded from the current phase:

* Hosting or exposing proprietary, confidential client source code or patient healthcare data.
* Direct integration with real production EPIC EHR servers (architectural interface and mock models only).
* Heavy 3D WebGL scenes requiring dedicated GPU downloads > 5MB.
* Full server-side CMS backend administration panel (deferred to Phase 2).
* Native iOS / Android binary application builds (responsive web application is the primary target).

---

# 12. Assumptions

* The application will run in modern web browsers with ES2022 support and CSS backdrop-filter capabilities.
* Visitors have standard internet connectivity for loading web fonts (Inter/Outfit) and external social links.
* The candidate's contact email and phone number are publicly displayable as specified in `Requirement.md`.
* The development environment utilizes Node.js 18+, TypeScript 5+, and modern bundling tools (Vite).

---

# 13. Dependencies

| Dependency                  | Version | Purpose                                              | Impact | Status |
| --------------------------- | ------- | ---------------------------------------------------- | ------ | ------ |
| **React**                   | `^18.3` | Core UI library                                      | High   | Active |
| **React DOM**               | `^18.3` | DOM rendering engine                                 | High   | Active |
| **TypeScript**              | `^5.4`  | Strict static typing across all layers               | High   | Active |
| **Axios**                   | `^1.7`  | Centralized HTTP client                              | High   | Active |
| **Lucide React**            | `^0.390`| Lightweight, accessible iconography                  | Medium | Active |
| **Vitest**                  | `^1.6`  | Unit and integration test runner                     | High   | Active |
| **React Testing Library**   | `^15.0` | Component behavior testing                           | High   | Active |
| **PostCSS / Tailwind / CSS**| Latest  | Custom styling, utility tokens, and animations       | High   | Active |

---

# 14. Risks and Mitigations

| Risk                                                                 | Impact | Probability | Mitigation Strategy                                                                                   |
| -------------------------------------------------------------------- | ------ | ----------- | ----------------------------------------------------------------------------------------------------- |
| **Heavy animations cause frame drops on low-end mobile devices**     | High   | Medium      | Implement CSS hardware acceleration (`transform: translateZ(0)`), debounced scroll handlers, and `prefers-reduced-motion` fallbacks. |
| **External contact API endpoint fails or is blocked by CORS**       | Medium | Low         | Fall back gracefully to `mailto:` direct email client link and provide immediate visual feedback.     |
| **Screen reader incompatibility with custom canvas/particle canvas** | High   | Low         | Mark canvas as `aria-hidden="true"` and provide equivalent semantic HTML text for all visual content. |
| **Breach of client confidentiality for Genomics / Migration**      | High   | Low         | Strictly use generic terminology (*Genomics-Based Healthcare Platform*, *2 US Organizations*) as specified in `Requirement.md`. |

---

# 15. Error Handling

| Scenario                         | Expected System Behavior                                                                                 |
| -------------------------------- | -------------------------------------------------------------------------------------------------------- |
| **Invalid Form Input**           | `ContactViewModel` flags field errors; UI displays red highlight and accessible inline error message.   |
| **Network Timeout / API Down**   | `ApiClient` interceptor normalizes error; `ContactViewModel` shows friendly retry toast; falls back to email. |
| **Component Render Crash**       | `ErrorBoundary` catches error, logs to `Logger.error()`, and displays a clean fallback UI with reload button. |
| **Image / Asset Load Failure**   | Fallback to CSS placeholder gradient with styled project initials / SVG icon.                           |
| **WebSocket / SSE Disconnect**   | Architecture models exponential backoff reconnection with state indicator badge (*Reconnecting / Live*).  |

---

# 16. Testing Strategy

## 16.1 Unit Testing

* **ViewModels:** 100% test coverage for all ViewModels (`HomeScreen.vm.test.ts`, `ContactSection.vm.test.ts`, `Button.vm.test.ts`). Tests verify initial state, service method invocation, data transformation, validation logic, loading states, and error handling.
* **Models & Helpers:** Unit tests for formatting functions (`Formatters.test.ts`), validation schemas, and `Logger.ts`.

## 16.2 Component & UI Testing

* **Base & Feature Components:** Tests verify DOM rendering, accessibility attributes, click/keyboard event emission, and conditional styling using React Testing Library.
* **Screens:** Test screen orchestration, mock service binding, empty state handling, and ErrorBoundary recovery.

## 16.3 Accessibility Testing

* Automated accessibility audits via `vitest-axe` / `axe-core`.
* Manual keyboard navigation test suite (Tab order, focus trapping in modals, Esc key handlers).
* Color contrast ratio verification across all UI components in dark mode.

## 16.4 Test Automation Command Suite

```bash
# Run all unit and component tests
npm run test

# Run tests in watch mode
npm run test:watch

# Generate code coverage report
npm run test:coverage

# Run TypeScript type validation
npm run typecheck

# Run ESLint validation
npm run lint
```

---

# 17. Deployment and Infrastructure

## 17.1 Environments

* **Development (`local`):** Local Vite dev server (`http://localhost:5173`) with verbose logging and hot module replacement.
* **Staging / Preview (`staging`):** Automated preview deployment per pull request with mock/staging API integration.
* **Production (`production`):** Globally distributed edge CDN with minified bundles, compressed assets, and strict security headers.

## 17.2 Deployment Strategy & CI/CD Pipeline

```text
[ Git Push / PR ] 
       │
       ▼
[ GitHub Actions / CI ]
   ├─► Step 1: Install Dependencies (npm ci)
   ├─► Step 2: TypeScript Compilation Check (npm run typecheck)
   ├─► Step 3: ESLint Code Quality Check (npm run lint)
   ├─► Step 4: Run Vitest Unit & Integration Tests (npm run test)
   └─► Step 5: Production Build (npm run build)
       │
       ▼ (On main branch merge)
[ Automated Deployment to Vercel / Edge CDN ]
```

## 17.3 Configuration Management

All environment variables are managed via `.env` files and exposed exclusively through `src/config/Config.ts`:

```ts
// src/config/Config.ts
export const Config = {
  app: {
    name: "Paramanantham S Portfolio",
    version: "1.0.0",
    environment: process.env.NODE_ENV || "development",
  },
  api: {
    baseUrl: process.env.VITE_API_BASE_URL || "https://api.portfolio.local/v1",
    timeoutMs: 10000,
  },
  features: {
    enableLiveChatbot: false,
    enableMockFallback: true,
  },
  logging: {
    level: process.env.NODE_ENV === "production" ? "warn" : "debug",
  },
} as const;
```

---

# 18. Monitoring and Support

## Monitoring

* **Client-side Error Logging:** Centralized `Logger.ts` logs warnings and errors with structured contextual metadata.
* **Performance Telemetry:** Core Web Vitals monitoring (LCP, FID, CLS) logged via browser PerformanceObserver APIs.

## Alerting

* Critical build and test failures alert engineering team via GitHub Actions notifications.

## Support & Escalation

* **Primary Maintainer:** Paramanantham S (`Paramanantham.S@outlook.com`).
* **Repository Issues:** Tracked via GitHub Issues.

---

# 19. Rollback Strategy

1. **Edge Deployment Instant Rollback:** Instant one-click rollback to the prior immutable production deployment hash via the hosting dashboard (Vercel / AWS).
2. **Git Revert:** Revert the breaking commit on `main` branch:
   ```bash
   git revert <commit-hash>
   git push origin main
   ```
3. **Rollback Trigger:** Initiated immediately if production error rate exceeds 1% or if critical rendering crashes occur on major mobile/desktop browsers.

---

# 20. Acceptance Criteria

The solution will be considered complete and production-ready when:

* [ ] All functional requirements (FR-001 through FR-012) are fully implemented and verified.
* [ ] React MVVM architecture is strictly adhered to with 100% separation between Views, ViewModels, Models, and Services.
* [ ] File and folder naming strictly follows PascalCase across all source modules.
* [ ] All HTTP communication routes through centralized `ApiClient.ts` using Axios.
* [ ] Centralized `Logger.ts` and `Config.ts` are integrated; zero raw `console.log` statements remain.
* [ ] `ErrorBoundary` is integrated with application routing and tested for graceful recovery.
* [ ] Visual aesthetics match the 2026 high-end engineering portfolio specifications (dark-first, glassmorphism, 60fps animations).
* [ ] All 8 scale metrics (100+ modules, 300+ screens, 200+ APIs, 500+ users, 100K+ chats, 2TB+ data, 2 US orgs, zero throttling) are featured.
* [ ] Genomics Healthcare and Slack-to-Teams Migration case studies are fully elaborated.
* [ ] WCAG 2.1/2.2 AA accessibility standards are satisfied with verified keyboard navigation.
* [ ] All automated unit and component tests are passing with >= 80% coverage.
* [ ] TypeScript compilation (`npm run typecheck`) and linting (`npm run lint`) pass with zero errors.

---

# 21. Open Questions

| ID    | Question                                                                 | Owner             | Status | Resolution / Decision                                                 |
| ----- | ------------------------------------------------------------------------ | ----------------- | ------ | --------------------------------------------------------------------- |
| Q-001 | Should the live AI Chatbot personal project include real-time inference? | Paramanantham S   | Closed | Start with interactive mock simulation; connect live API in Phase 2.  |
| Q-002 | Which hosting provider is preferred for production deployment?           | Engineering Team  | Closed | Vercel / Firebase App Hosting for zero-config edge CDN distribution.  |
| Q-003 | Are client names disclosed for the enterprise migration or genomics work?| Paramanantham S   | Closed | No. Keep generic (*Genomics-Based Healthcare Platform*, *2 US Orgs*). |

---

# 22. Decision Log

| Date       | Decision                                   | Reason                                                                 | Owner             |
| ---------- | ------------------------------------------ | ---------------------------------------------------------------------- | ----------------- |
| 20-08-2026 | Adopt React MVVM Architectural Pattern     | Ensures strict separation of UI and business logic, enabling testability | Paramanantham S   |
| 20-08-2026 | Use PascalCase for all Files and Folders   | Guarantees consistency, clarity, and aligns with mandatory steering rules | Engineering Lead  |
| 20-08-2026 | Abstract Services with Interface & Mocks   | Allows 100% offline functionality, demo mode, and robust unit testing   | Architect         |
| 20-08-2026 | Implement Dark-First Cinematic Visual UX   | Creates an impressive 2026 product identity far superior to templates   | UI/UX Lead        |
| 20-08-2026 | Centralize Axios ApiClient & Interceptors  | Eliminates duplicate HTTP configurations and centralizes auth/error logic | Architect         |

---

# 23. Future Enhancements

Items intentionally deferred to future iterations:

* **Interactive 3D WebGL System Model:** Full 3D interactive particle node graph for hero background with Three.js / React Three Fiber.
* **Live AI Chatbot Assistant:** Interactive conversational assistant powered by live AWS Bedrock / Gemini API to answer recruiter questions.
* **Headless CMS Integration:** Dynamic case study publishing and blog article engine.
* **Interactive Code Playground:** Live sandbox embedded in project case studies to test reusable React components.

---

# 24. Approval

| Role             | Name             | Status   | Date       |
| ---------------- | ---------------- | -------- | ---------- |
| Product Owner    | Paramanantham S  | Approved | 20-08-2026 |
| Engineering Lead | Paramanantham S  | Approved | 20-08-2026 |
| Lead Architect   | Paramanantham S  | Approved | 20-08-2026 |
| UI/UX Designer   | Paramanantham S  | Approved | 20-08-2026 |
| QA Lead          | Paramanantham S  | Approved | 20-08-2026 |

---

## 25. Document Revision History

| Version | Date       | Author          | Changes                                                                 |
| ------- | ---------- | --------------- | ----------------------------------------------------------------------- |
| 1.0     | 20-08-2026 | Paramanantham S | Initial complete Solution Document synthesized from Requirements & Prototype |

---

# Appendix A — Technical Notes & Code Architecture

### MVVM Pattern Triad Example

#### 1. Model (`src/models/Project.model.ts`)
```ts
export interface Project {
  id: string;
  title: string;
  category: "Healthcare" | "Enterprise Migration" | "AI & Cloud" | "Personal";
  tagline: string;
  description: string;
  technologies: string[];
  metrics: { label: string; value: string }[];
  featured: boolean;
}
```

#### 2. Service Interface (`src/services/PortfolioService.interface.ts`)
```ts
import { Project } from "../models/Project.model";
import { ScaleMetric } from "../models/ScaleMetric.model";

export interface PortfolioServiceInterface {
  getProjects(): Promise<Project[]>;
  getScaleMetrics(): Promise<ScaleMetric[]>;
}
```

#### 3. ViewModel (`src/UI/screens/FeaturedProjectsSection/FeaturedProjectsSection.vm.ts`)
```ts
import { useState, useEffect, useCallback } from "react";
import { Project } from "../../../models/Project.model";
import { PortfolioServiceInterface } from "../../../services/PortfolioService.interface";
import { Logger } from "../../../helpers/Logger";

export const useFeaturedProjectsViewModel = (portfolioService: PortfolioServiceInterface) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadProjects = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await portfolioService.getProjects();
      setProjects(data);
      Logger.info("Featured projects loaded successfully", { count: data.length });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to load projects";
      setError(errorMessage);
      Logger.error("Failed to load featured projects", { error: err });
    } finally {
      setIsLoading(false);
    }
  }, [portfolioService]);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const filteredProjects = selectedCategory === "All"
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  return {
    projects: filteredProjects,
    selectedCategory,
    setSelectedCategory,
    isLoading,
    error,
    reload: loadProjects,
  };
};
```

#### 4. View (`src/UI/screens/FeaturedProjectsSection/FeaturedProjectsSection.tsx`)
```tsx
import React from "react";
import { useFeaturedProjectsViewModel } from "./FeaturedProjectsSection.vm";
import { PortfolioServiceInterface } from "../../../services/PortfolioService.interface";
import { ProjectCard } from "../../reusable/feature/ProjectCard/ProjectCard";
import { Loader } from "../../reusable/base/Loader/Loader";

interface FeaturedProjectsSectionProps {
  readonly portfolioService: PortfolioServiceInterface;
}

export const FeaturedProjectsSection: React.FC<FeaturedProjectsSectionProps> = ({ portfolioService }) => {
  const { projects, selectedCategory, setSelectedCategory, isLoading, error, reload } =
    useFeaturedProjectsViewModel(portfolioService);

  if (isLoading) return <Loader label="Loading featured projects..." />;
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-red-950/40 border border-red-800/60 rounded-xl text-red-300">
        <p className="text-sm mb-4">{error}</p>
        <button
          type="button"
          onClick={reload}
          className="px-4 py-2 bg-red-600 hover:bg-red-500 active:scale-95 text-white text-xs font-semibold rounded-lg transition-all duration-200"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <section id="work" className="py-24 px-6 max-w-7xl mx-auto" aria-label="Featured Projects">
      <div className="mb-12 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">Featured Projects</h2>
        <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">Production platforms, enterprise solutions, and intelligent applications.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};
```

---

# Appendix B — References

1. **Requirement Specification:** [Requirement.md](file:///c:/Users/Admin/OneDrive/Desktop/Parama-v2.0/Portfolio/Design/Requirement/Requirement.md)
2. **UI/UX Design Prototype:** [Prototype.md](file:///c:/Users/Admin/OneDrive/Desktop/Parama-v2.0/Portfolio/Design/Protype/Prototype.md)
3. **Mandatory Steering Rules:** [steering.md](file:///c:/Users/Admin/OneDrive/Desktop/Parama-v2.0/Portfolio/Define/Artifacts/steering.md)
4. **Architectural Rules:** [.agents/rules/](file:///c:/Users/Admin/OneDrive/Desktop/Parama-v2.0/Portfolio/.agents/rules/)
5. **Web Content Accessibility Guidelines (WCAG) 2.1 / 2.2 AA:** [W3C Guidelines](https://www.w3.org/TR/WCAG21/)
