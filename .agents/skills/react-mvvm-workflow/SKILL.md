---
name: react-mvvm-workflow
description: >-
  Enforces the React MVVM architecture, folder structure, PascalCase naming, mandatory Tailwind CSS styling, strict TypeScript with zero any policy, service interfaces, mock services, ViewModel triad pattern, centralized ApiClient, and testing requirements defined in steering.md. Use whenever creating, editing, refactoring, or reviewing React components, screens, services, ViewModels, or tests.
---

# React MVVM Architecture Workflow Skill

This skill guides and enforces strict compliance with the **React MVVM Architecture Steering Rules** defined in [steering.md](file:///c:/Users/Admin/OneDrive/Desktop/Parama-v2.0/Portfolio/Define/Artifacts/steering.md).

---

## 1. Core Requirements & Non-Negotiables

1. **Mandatory Tailwind CSS**: All UI styling must use Tailwind CSS utility classes. Never create custom `.css` files for components.
2. **Strict TypeScript & Zero `any` Policy**:
   - **Never declare `any`** anywhere in the code.
   - Use explicit interfaces, types, discriminated unions, generics, or `unknown` with runtime type narrowing.
   - For catch blocks, always use `catch (err: unknown)` and narrow with `err instanceof Error`.
   - Explicitly type all component props, ViewModel returns, and service signatures.
3. **Strict MVVM Triad**: Every screen and component consists of:
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
   - Service (`src/services/<ServiceName>/` or `src/services/`)
   - API Client (`src/apiclient/`)
   - Model (`src/models/`)
   - Helper / Logger (`src/helpers/`)
   - Config (`src/config/`)
2. **Search for Existing Reusable Code**:
   - Check if similar base/feature components or helper utilities already exist.
   - Reuse existing service interfaces or models where applicable.

---

## 3. Triad Pattern Implementation Template

### Model: `src/models/<ModelName>.model.ts`
```ts
export interface UserProfile {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly role: 'Admin' | 'User';
}
```

### View: `<ComponentName>.tsx`
```tsx
import React from 'react';
import { use<ComponentName>ViewModel } from './<ComponentName>.vm';
import { UserProfile } from '../../../models/UserProfile.model';

export interface <ComponentName>Props {
  readonly initialUserId?: string;
  readonly onUserSelected?: (user: UserProfile) => void;
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
    <div className="flex flex-col gap-4 p-6 bg-slate-900/80 backdrop-blur-md rounded-xl border border-slate-800 shadow-xl text-slate-100">
      <h3 className="text-xl font-semibold tracking-tight text-white">
        {user ? user.name : 'No User Selected'}
      </h3>
      <button
        type="button"
        onClick={handleSave}
        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-900"
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
import { UserProfile } from '../../../models/UserProfile.model';
import { UserServiceInterface } from '../../../services/UserService.interface';
import { <ComponentName>Props } from './<ComponentName>';
import { Logger } from '../../../helpers/Logger';

export interface Use<ComponentName>ViewModelReturn {
  readonly user: UserProfile | null;
  readonly isLoading: boolean;
  readonly error: string | null;
  readonly handleSave: () => Promise<void>;
}

export const use<ComponentName>ViewModel = (
  props: <ComponentName>Props,
  userService?: UserServiceInterface // Injected dependency
): Use<ComponentName>ViewModelReturn => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      if (userService && user) {
        const updated = await userService.updateUserProfile(user.id, user);
        setUser(updated);
        props.onUserSelected?.(updated);
        Logger.info('User profile saved successfully', { userId: updated.id });
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      Logger.error('Failed to save user profile', { error: err });
    } finally {
      setIsLoading(false);
    }
  }, [userService, user, props]);

  return {
    user,
    isLoading,
    error,
    handleSave,
  };
};
```

### Test: `<ComponentName>.test.tsx`
```tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { <ComponentName> } from './<ComponentName>';
import { MockUserService } from '../../../services/MockUserService';

describe('<ComponentName>', () => {
  it('should render correctly and handle interactions', async () => {
    const mockService = new MockUserService();
    render(<<ComponentName> initialUserId="user-1" />);

    expect(screen.getByRole('button', { name: /save profile/i })).toBeDefined();
  });
});
```

---

## 4. Service Layer Template

### Interface: `src/services/<ServiceName>.interface.ts`
```ts
import { UserProfile } from '../models/UserProfile.model';

export interface UserServiceInterface {
  getUserProfile(id: string): Promise<UserProfile>;
  updateUserProfile(id: string, payload: Partial<UserProfile>): Promise<UserProfile>;
}
```

### Production Implementation: `src/services/<ServiceName>.ts`
```ts
import { UserServiceInterface } from './<ServiceName>.interface';
import { UserProfile } from '../models/UserProfile.model';
import { ApiClient } from '../apiclient/ApiClient';
import { ApiClientInterface } from '../apiclient/ApiClient.interface';

export class UserService implements UserServiceInterface {
  constructor(private readonly apiClient: ApiClientInterface = ApiClient) {}

  async getUserProfile(id: string): Promise<UserProfile> {
    return this.apiClient.get<UserProfile>(`/users/${id}`);
  }

  async updateUserProfile(id: string, payload: Partial<UserProfile>): Promise<UserProfile> {
    return this.apiClient.put<UserProfile>(`/users/${id}`, payload);
  }
}
```

### Mock Implementation: `src/services/Mock<ServiceName>.ts`
```ts
import { UserServiceInterface } from './<ServiceName>.interface';
import { UserProfile } from '../models/UserProfile.model';

export class MockUserService implements UserServiceInterface {
  async getUserProfile(id: string): Promise<UserProfile> {
    return { id, name: 'Mock User', email: 'mock@example.com', role: 'User' };
  }

  async updateUserProfile(id: string, payload: Partial<UserProfile>): Promise<UserProfile> {
    return { id, name: payload.name ?? 'Updated Mock User', email: payload.email ?? 'mock@example.com', role: 'User' };
  }
}
```

---

## 5. Verification & Validation Steps

1. Run TypeScript compilation check (must have ZERO errors and ZERO `any`):
   ```bash
   npx tsc --noEmit
   ```
2. Run test suite:
   ```bash
   npm test -- --watchAll=false
   ```
3. Verify that all components use Tailwind CSS classes and no ad-hoc CSS files are present.
4. Verify the Definition of Done checklist from [06-testing-and-definition-of-done.md](file:///c:/Users/Admin/OneDrive/Desktop/Parama-v2.0/Portfolio/.agents/rules/06-testing-and-definition-of-done.md).
