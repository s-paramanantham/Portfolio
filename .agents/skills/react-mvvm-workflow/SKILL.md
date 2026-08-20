---
name: react-mvvm-workflow
description: >-
  Enforces the React MVVM architecture, folder structure, PascalCase naming, mandatory Tailwind CSS styling, strict TypeScript with zero any policy, Service-level BO & DTO architecture, zero mock data in ViewModels, service interfaces, mock services, ViewModel triad pattern, centralized ApiClient, and testing requirements defined in steering.md. Use whenever creating, editing, refactoring, or reviewing React components, screens, services, ViewModels, or tests.
---

# React MVVM Architecture Workflow Skill

This skill guides and enforces strict compliance with the **React MVVM Architecture Steering Rules** defined in [steering.md](file:///c:/Users/Admin/OneDrive/Desktop/Parama-v2.0/Portfolio/Define/Artifacts/steering.md).

---

## 1. Core Requirements & Non-Negotiables

1. **Mandatory Tailwind CSS with Mobile + Web Responsive Design**:
   - All UI styling must use Tailwind CSS utility classes. Never create custom `.css` files for components.
   - All components and screens must be fully responsive across Mobile (<640px), Tablet (640-1024px), Laptop (1024-1280px), and Desktop (>1280px) using Tailwind responsive prefixes (`sm:`, `md:`, `lg:`, `xl:`).
2. **Strict TypeScript & Zero `any` Policy**:
   - **Never declare `any`** anywhere in the code.
   - Use explicit interfaces, types, discriminated unions, generics, or `unknown` with runtime type narrowing.
   - For catch blocks, always use `catch (err: unknown)` and narrow with `err instanceof Error`.
   - Explicitly type all component props, ViewModel returns, and service signatures.
3. **Service-Level BO & DTO Architecture**:
   - DTOs (`src/services/<Service>/dto/<Entity>.dto.ts`) define wire transfer contracts.
   - BOs (`src/services/<Service>/bo/<Entity>.bo.ts`) define domain business objects consumed by ViewModels/Views.
   - Standalone root `models/` folders are replaced with Service-level `dto/` and `bo/`.
4. **Zero Mock Data in ViewModels**:
   - ViewModels (`*.vm.ts`) must never contain hardcoded mock data fixtures.
   - All mock data must reside in `Mock<ServiceName>.ts` and be retrieved via the Service Interface.
5. **Strict MVVM Triad**: Every screen and component consists of:
   - `<ComponentName>.tsx` (View: Presentation, binding, Tailwind CSS styling)
   - `<ComponentName>.vm.ts` (ViewModel: State, business logic, service calls; No JSX/DOM/CSS)
   - `<ComponentName>.test.tsx` (Tests: Vitest & React Testing Library)

---

## 2. Pre-Task Inspection Checklist

Before writing or editing code:
1. **Locate Target Layer**:
   - Screen (`src/UI/screens/<ScreenName>/`)
   - Feature Component (`src/UI/reusable/feature/<ComponentName>/`)
   - Base Component (`src/UI/reusable/base/<ComponentName>/`)
   - Service (`src/services/<ServiceName>/`)
     - DTO (`src/services/<ServiceName>/dto/`)
     - BO (`src/services/<ServiceName>/bo/`)
     - Interface (`src/services/<ServiceName>/<ServiceName>.interface.ts`)
     - Production Service (`src/services/<ServiceName>/<ServiceName>ApiService.ts`)
     - Mock Service (`src/services/<ServiceName>/Mock<ServiceName>.ts`)
   - API Client (`src/apiclient/`)
   - Helper / Logger (`src/helpers/`)
   - Config (`src/config/`)
2. **Search for Existing Reusable Code**:
   - Check if similar base/feature components or helper utilities already exist.
   - Reuse existing service interfaces or BOs where applicable.

---

## 3. Triad Pattern Implementation Template

### DTO: `src/services/UserService/dto/UserProfile.dto.ts`
```ts
export interface UserProfileDto {
  readonly id: string;
  readonly full_name: string;
  readonly email_address: string;
  readonly role_type: 'Admin' | 'User';
}
```

### BO & Mapper: `src/services/UserService/bo/UserProfile.bo.ts`
```ts
import { UserProfileDto } from '../dto/UserProfile.dto';

export interface UserProfileBo {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly role: 'Admin' | 'User';
}

export class UserProfileMapper {
  public static toBo(dto: UserProfileDto): UserProfileBo {
    return {
      id: dto.id,
      name: dto.full_name,
      email: dto.email_address,
      role: dto.role_type,
    };
  }
}
```

### View: `<ComponentName>.tsx`
```tsx
import React from 'react';
import { use<ComponentName>ViewModel } from './<ComponentName>.vm';
import { UserProfileBo } from '../../../../services/UserService/bo/UserProfile.bo';
import { UserServiceInterface } from '../../../../services/UserService/UserService.interface';

export interface <ComponentName>Props {
  readonly initialUserId?: string;
  readonly onUserSelected?: (user: UserProfileBo) => void;
  readonly userService?: UserServiceInterface;
}

export const <ComponentName>: React.FC<<ComponentName>Props> = (props) => {
  const {
    user,
    isLoading,
    error,
    handleSave,
  } = use<ComponentName>ViewModel(props);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8 text-slate-400">
        <span className="animate-spin mr-2">⟳</span> Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-950/50 border border-red-800 text-red-300 rounded-lg text-sm">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-4 sm:p-6 bg-slate-900/80 backdrop-blur-md rounded-xl border border-slate-800 shadow-xl text-slate-100 w-full max-w-lg mx-auto">
      <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-white">
        {user ? user.name : 'No User Selected'}
      </h3>
      <button
        type="button"
        onClick={handleSave}
        className="w-full sm:w-auto px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-900"
      >
        Save Profile
      </button>
    </div>
  );
};
```

### ViewModel: `<ComponentName>.vm.ts`
```ts
import { useState, useEffect, useCallback } from 'react';
import { UserProfileBo } from '../../../../services/UserService/bo/UserProfile.bo';
import { UserServiceInterface } from '../../../../services/UserService/UserService.interface';
import { ServiceFactory } from '../../../../services/ServiceFactory';
import { <ComponentName>Props } from './<ComponentName>';
import { Logger } from '../../../../helpers/Logger';

export interface Use<ComponentName>ViewModelReturn {
  readonly user: UserProfileBo | null;
  readonly isLoading: boolean;
  readonly error: string | null;
  readonly handleSave: () => Promise<void>;
}

export const use<ComponentName>ViewModel = (
  props: <ComponentName>Props
): Use<ComponentName>ViewModelReturn => {
  const { userService = ServiceFactory.getUserService(), onUserSelected, initialUserId } = props;
  const [user, setUser] = useState<UserProfileBo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    if (initialUserId) {
      setIsLoading(true);
      userService.getUserProfile(initialUserId)
        .then((profile) => {
          if (isMounted) setUser(profile);
        })
        .catch((err: unknown) => {
          if (isMounted) {
            setError(err instanceof Error ? err.message : 'Failed to load user');
          }
        })
        .finally(() => {
          if (isMounted) setIsLoading(false);
        });
    }
    return () => {
      isMounted = false;
    };
  }, [initialUserId, userService]);

  const handleSave = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      if (user) {
        const updated = await userService.updateUserProfile(user.id, user);
        setUser(updated);
        onUserSelected?.(updated);
        Logger.info('User profile saved successfully', { userId: updated.id });
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      Logger.error('Failed to save user profile', { error: err });
    } finally {
      setIsLoading(false);
    }
  }, [userService, user, onUserSelected]);

  return {
    user,
    isLoading,
    error,
    handleSave,
  };
};
```

---

## 4. Verification & Validation Steps

1. Run TypeScript compilation check (must have ZERO errors and ZERO `any`):
   ```bash
   npm run typecheck
   ```
2. Run test suite:
   ```bash
   npm run test
   ```
3. Verify that all components use Tailwind CSS classes, support Mobile + Web responsive design, and contain zero hardcoded mock data in `*.vm.ts`.
