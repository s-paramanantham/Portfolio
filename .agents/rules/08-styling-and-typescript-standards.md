# Rule 08: Mandatory Tailwind CSS & Strict TypeScript (Zero `any`) Standards

Reference: [steering.md Section 4, 5](file:///c:/Users/Admin/OneDrive/Desktop/Parama-v2.0/Portfolio/Define/Artifacts/steering.md)

## 1. Mandatory Tailwind CSS Styling

- **Utility-First**: Every UI component (`Button`, `Modal`, `Input`, `ProjectCard`, `Screen`, etc.) must be styled exclusively using Tailwind CSS utility classes.
- **Prohibited**:
  - NO `.css`, `.scss`, or `.module.css` files per component.
  - NO inline `style={{ ... }}` attributes, except for runtime computed dynamic values (e.g. canvas particle positions).
- **Design Tokens**: Color schemes (dark slate, cyan, indigo, emerald), fonts, spacing, shadows, and glassmorphism borders must utilize Tailwind classes or `tailwind.config.js` theme extensions.
- **Dark Mode**: Dark-first palette (`bg-slate-950`, `text-slate-100`, `border-slate-800/80`, `backdrop-blur-md`).
- **Responsive**: Must support mobile to desktop using Tailwind breakpoints (`sm:`, `md:`, `lg:`, `xl:`, `2xl:`).

## 2. Strict TypeScript & Zero `any` Policy

- **Absolute Prohibition of `any`**:
  - Never declare `any` anywhere in code (`no-explicit-any`).
  - Prohibited: `let x: any`, `(e: any)`, `useState<any>(null)`, `catch (err: any)`.
- **Proper Alternatives**:
  - Unknown Data / Catch Blocks:
    ```ts
    try {
      // service call
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "An unexpected error occurred";
      setError(message);
    }
    ```
  - Form & DOM Events:
    ```ts
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { ... };
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => { ... };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => { ... };
    ```
  - Props & ViewModel State:
    ```ts
    export interface UserProfileProps {
      readonly userId: string;
      readonly onSelect?: (userId: string) => void;
    }

    export interface UseUserProfileViewModelReturn {
      readonly user: UserProfile | null;
      readonly isLoading: boolean;
      readonly error: string | null;
      readonly handleUpdate: (updated: UserProfile) => Promise<void>;
    }
    ```
  - Generic API Requests:
    ```ts
    async get<T>(url: string): Promise<T> { ... }
    ```
- **Validation**:
  - Run `npx tsc --noEmit` to verify 100% type safety with zero errors.
