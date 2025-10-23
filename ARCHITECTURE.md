## 📋 Table of Contents

- [Architecture Overview](#architecture-overview)
- [Project Structure](#project-structure)
- [Architecture Layers](#architecture-layers)
- [Import Rules](#import-rules)
- [Comparison with FSD](#comparison-with-fsd)
- [Scaling](#scaling)
- [Usage Examples](#usage-examples)

## 🎯 Architecture Overview

This project uses **Component-based / Feature-based architecture**, which is the standard in 70-80% of Ukrainian and Western companies (Grammarly, GitLab, Atlassian, Shopify).

### Why this architecture?

✅ **Flexibility** — easily adapts to any project size  
✅ **Easy onboarding** — new developers understand the structure in 1-2 days  
✅ **Reusability** — clear separation of shared/features/pages  
✅ **Development speed** — less bureaucracy than FSD  
✅ **Industry standard** — easy to find developers familiar with the approach

## 📁 Project Structure

```
src/
├── app/                          # 🚀 Application Layer (Initialization)
│   ├── main.ts                   # Entry point
│   ├── App.vue                   # Root component
│   ├── main.scss                 # Global styles
│   ├── layouts/                  # Application layouts
│   └── router/                   # Vue Router configuration
│
├── pages/                        # 📄 Pages Layer (Routes)
│   └── PageName/
│       ├── index.vue             # Main page file
│       └── components/           # Components specific to this page
│
├── widgets/                      # 🧩 Widgets Layer (Layout blocks)
│   └── WidgetName/
│       ├── index.vue             # Main widget file
│       └── components/           # Internal components
│
├── features/                     # ⚙️ Features Layer (Business logic)
│   └── featureName/
│       ├── index.ts              # Public API
│       ├── components/           # Feature UI components
│       ├── composables/          # Pinia stores & composables
│       ├── api/                  # API requests
│       └── utils/                # Feature utilities
│
└── shared/                       # 🔧 Shared Layer (Reusable code)
    ├── ui/                       # UI components library
    │   └── common/
    │       ├── VButton.vue
    │       ├── VInput.vue
    │       └── VCard.vue
    │
    ├── composables/              # Reusable composables
    │   ├── index.ts
    │   └── useModal.ts
    │
    ├── utils/                    # Utility functions
    │   ├── index.ts
    │   └── formatDate.ts
    │
    ├── api/                      # API client & services
    │   ├── index.ts
    │   └── client.ts             # Axios instance
    │
    ├── config/                   # App configuration
    │   └── icons.ts
    │
    ├── types/                    # TypeScript types
    │   ├── index.ts
    │   ├── icons.d.ts
    │   ├── vite-env.d.ts
    │   └── components/
    │       └── card.ts
    │
    └── assets/                   # Static assets & styles
        └── styles/
            ├── customComponents.scss
            ├── vcomponentsRoot.scss
            └── components/
                ├── vcard.scss
                ├── vcheckbox.scss
```

---

## 🏛️ Architecture Layers

### 1️⃣ **app/** — Application Layer

**Purpose:** Application initialization, global providers, routing, layouts.

**Contains:**
- Entry point (`main.ts`)
- Root component (`App.vue`)
- Global styles
- Router configuration
- Layout components

**Rule:** Does NOT contain business logic, only initialization.

---

### 2️⃣ **pages/** — Pages Layer

**Purpose:** Application routes/screens.

**Structure:**
```
pages/
└── PageName/
    ├── index.vue              # Main page file
    ├── components/            # Components specific to this page
    │   └── LocalComponent.vue
    └── hooks/                 # (optional) Hooks specific to this page
```

**Rules:**
- Each page — separate folder with `index.vue`
- Can import from `features/`, `widgets/`, `shared/`
- Cannot import other `pages/`

---

### 3️⃣ **widgets/** — Widgets Layer

**Purpose:** Large layout blocks combining multiple features.

**Examples:**
- `Header/` — site header (uses `theme`, `auth`, `notifications`)
- `Sidebar/` — side navigation
- `Footer/` — site footer

**Rules:**
- Can import from `features/`, `shared/`
- Cannot import other `widgets/`

---

### 4️⃣ **features/** — Features Layer

**Purpose:** Business logic of the application.

**Structure:**
```
features/
└── featureName/
    ├── index.ts               # Public API (REQUIRED!)
    ├── components/            # Feature UI components
    ├── composables/           # Pinia stores
    ├── api/                   # API methods
    └── utils/                 # Feature-specific utilities
```

**Examples:**
- `auth/` — authentication and authorization
- `theme/` — theme switching (light/dark)
- `modal/` — modal window management
- `notifications/` — notification system

**Public API example:**
```typescript
// features/theme/index.ts
export { default as ThemeToggle } from './components/ThemeToggle.vue';
export { useThemeStore } from './composables/useTheme';
export * from './utils/createThemes';
```

**Rules:**
- MUST have `index.ts` (Public API)
- Can import only from `shared/`
- Cannot import other `features/` directly

---

### 5️⃣ **shared/** — Shared Layer

**Purpose:** Reusable code without business logic.

#### `shared/ui/` — UI Components

Library of visual components (buttons, inputs, cards).

**Rules:**
- Components must be **generic** (universal)
- Receive data through props
- Do NOT contain business logic
- Do NOT make API requests

#### `shared/composables/` — Composables

Vue composables that can be reused.

**Examples:**
- `useModal.ts` — work with modals
- `useDebounce.ts` — debounce for inputs
- `useLocalStorage.ts` — work with localStorage

#### `shared/utils/` — Utilities

Pure functions without Vue dependencies.

**Examples:**
- `formatDate.ts`
- `validateEmail.ts`

#### `shared/api/` — API Client

Axios configuration, basic API methods.

#### `shared/types/` — TypeScript Types

Common types and interfaces.

---

## 📐 Layouts System

### Overview

The project uses **MasterLayout** system for dynamic layout switching based on route meta. This keeps `App.vue` minimal and moves all wrapper logic to layout components.

### Structure

## 🔗 Import Rules

### Dependency Matrix

| Layer       | Can import from                       |
|-------------|---------------------------------------|
| `app/`      | `pages/`, `features/`, `widgets/`, `shared/` |
| `pages/`    | `features/`, `widgets/`, `shared/`    |
| `widgets/`  | `features/`, `shared/`                |
| `features/` | `shared/`                             |
| `shared/`   | nothing (isolated)                    |

### ✅ Correct imports

```typescript
// ✅ pages imports features
import { ThemeToggle } from '@/features/theme';

// ✅ features imports shared
import { VButton } from '@/shared/ui/common/VButton.vue';

// ✅ features uses Public API
import { useThemeStore } from '@/features/theme';
```

### ❌ Incorrect imports

```typescript
// ❌ shared cannot import features
import { useAuth } from '@/features/auth'; // In shared/

// ❌ features don't import other features directly
import { useTheme } from '@/features/theme'; // In features/auth

// ❌ Bypassing Public API
import ThemeToggle from '@/features/theme/components/ThemeToggle.vue';
// Correct: import { ThemeToggle } from '@/features/theme';
```

---

## 🆚 Comparison with FSD (Feature-Sliced Design)

| Criteria                  | Component-based | FSD                          |
|---------------------------|-----------------|------------------------------|
| **Complexity**            | Low             | High                         |
| **Onboarding**            | 1-2 days        | 1-2 weeks                    |
| **Number of layers**      | 5               | 7+ (app/pages/widgets/features/entities/shared/processes) |
| **Flexibility**           | High            | Medium (strict rules)        |
| **Best for**              | Most projects   | Enterprise (100+ developers) |
| **Documentation**         | Simple          | Requires detailed            |
| **Suitable for startups** | ✅              | ❌ (overkill)                |

### When to use FSD?

- Team of 50+ developers
- Project lifetime 5+ years
- Critical architectural strictness
- Dedicated architect available

### When to use Component-based?

- Team up to 30 developers
- Need development speed
- MVP or startup
- 90% of modern projects ✅

---

## 📈 Scaling

### Adding a new feature

**Example:** Adding "Authentication" feature

1. Create structure:
```bash
mkdir -p src/features/auth/{components,composables,api,utils}
```

2. Create files:
```
features/auth/
├── index.ts                    # Public API
├── components/
│   ├── LoginForm.vue
│   └── RegisterForm.vue
├── composables/
│   └── useAuth.ts              # Pinia store
├── api/
│   └── authApi.ts              # API methods
└── utils/
    └── validatePassword.ts
```

3. Export through Public API:

```typescript
// features/auth/index.ts
export { default as LoginForm } from './components/LoginForm.vue';
export { default as RegisterForm } from './components/RegisterForm.vue';
export { useAuthStore } from './composables/useAuth';
export * from './api/authApi';
```

4. Use in pages:
```vue
<script setup>
  import { LoginForm, useAuthStore } from '@/features/auth';

  const authStore = useAuthStore();
</script>
```

---

### Adding a new widget

**Example:** Site header with theme and authentication

```
widgets/Header/
├── index.vue                   # Main component
└── components/                 # Internal components
    ├── Logo.vue
    └── Navigation.vue
```

```vue
<!-- widgets/Header/index.vue -->
<script setup>
import { ThemeToggle } from '@/features/theme';
import { useAuthStore } from '@/features/auth';
import Logo from './components/Logo.vue';
import Navigation from './components/Navigation.vue';

const authStore = useAuthStore();
</script>

<template>
  <header>
    <Logo />
    <Navigation />
    <ThemeToggle />
    <div v-if="authStore.isAuthenticated">
      {{ authStore.user.name }}
    </div>
  </header>
</template>
```

---

### Adding a new page

```bash
mkdir src/pages/Dashboard
touch src/pages/Dashboard/index.vue
```

```vue
<!-- pages/Dashboard/index.vue -->
<script setup>
  import { useAuthStore } from '@/features/auth';
  import { VCard, VButton } from '@/shared/ui/common';

  const authStore = useAuthStore();
</script>

<template>
  <div class="dashboard">
    <h1>Welcome, {{ authStore.user.name }}!</h1>
    <VCard title="Statistics">
      <p>Your dashboard content here</p>
      <VButton>View Details</VButton>
    </VCard>
  </div>
</template>
```

Update router:
```typescript
// app/router/index.ts
{
  path: '/dashboard',
  name: 'Dashboard',
  component: () => import('@/pages/Dashboard/index.vue'),
  meta: { requiresAuth: true }
}
```

---

## 🎯 Best Practices

### 1. Public API for features

**Always** export through `index.ts`:

```typescript
// features/auth/index.ts
export { LoginForm, RegisterForm } from './components';
export { useAuthStore } from './composables/useAuth';
export { login, logout, register } from './api/authApi';
### 2. Component naming

```
✅ VButton.vue      — Shared UI component (prefix V)
✅ ThemeToggle.vue  — Feature component (no prefix)
✅ LoginForm.vue    — Feature component
✅ Header.vue       — Widget (no prefix)
```

### 3. Composables vs Utils

```typescript
// ✅ Composable (uses Vue API)
export function useDebounce(value: Ref<string>, delay: number) {
  const debouncedValue = ref(value.value);
  // uses watchEffect, onUnmounted, etc.
  return debouncedValue;
}

// ✅ Util (pure function)
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US');
}
```

### 4. Pinia Stores in features

```typescript
// features/auth/composables/useAuth.ts
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', () => {
    const user = ref(null);
    const isAuthenticated = computed(() => !!user.value);

    async function login(credentials) {
        // API call
    }

    return { user, isAuthenticated, login };
});
```

### 5. TypeScript types

```typescript
// shared/types/user.ts
export interface User {
    id: string;
    name: string;
    email: string;
}

// features/auth/composables/useAuth.ts
import type { User } from '@/shared/types/user';

const user = ref<User | null>(null);
```

---

## 📚 Usage Examples

### Example 1: Creating a form with validation

```vue
<!-- pages/Contact/index.vue -->
<script setup>
import { ref } from 'vue';
import { VInput, VButton, VCard } from '@/shared/ui/common';
import { validateEmail } from '@/shared/utils/validators';

const email = ref('');
const message = ref('');
const errors = ref({});

const handleSubmit = () => {
  errors.value = {};
  
  if (!validateEmail(email.value)) {
    errors.value.email = 'Invalid email';
  }
  
  if (message.value.length < 10) {
    errors.value.message = 'Message too short';
  }
  
  if (Object.keys(errors.value).length === 0) {
    // Submit form
  }
};
</script>

<template>
  <VCard title="Contact Us">
    <form @submit.prevent="handleSubmit">
      <VInput 
        v-model="email" 
        label="Email" 
        :error="errors.email"
      />
      <VInput 
        v-model="message" 
        type="textarea" 
        label="Message"
        :error="errors.message"
      />
      <VButton type="submit">Send</VButton>
    </form>
  </VCard>
</template>
```

### Example 2: Feature with API integration

```typescript
// features/products/composables/useProducts.ts
import { defineStore } from 'pinia';
import { getProducts } from '../api/productsApi';

export const useProductsStore = defineStore('products', () => {
  const products = ref([]);
  const loading = ref(false);
  
  async function fetchProducts() {
    loading.value = true;
    try {
      const data = await getProducts();
      products.value = data;
    } finally {
      loading.value = false;
    }
  }
  
  return { products, loading, fetchProducts };
});
```

```typescript
// features/products/index.ts
export { useProductsStore } from './composables/useProducts';
export * from './api/productsApi';
```

---

## 🚀 Migration Checklist

- [x] Created `features/` structure
- [x] Created `widgets/` structure
- [x] Renamed `shared/libs/` → `shared/composables/` and `shared/utils/`
- [x] Moved `app/providers/axios.ts` → `shared/api/client.ts`
- [x] Moved theme to `features/theme/`
- [x] Moved modals to `features/modal/`
- [x] Reorganized pages into folder structure
- [x] Updated all imports
- [x] Created Public API (`index.ts`) for features
- [x] Verified project build
- [x] Created documentation
- [x] Implemented layouts system with MasterLayout

---

## 📖 Additional Resources

- [Vue 3 Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)
- [Pinia Store Best Practices](https://pinia.vuejs.org/core-concepts/)
- [Component Design Patterns](https://www.patterns.dev/posts/vue-patterns)
- [Layouts Documentation](/src/docs/LAYOUTS.md)

---

## 🤝 For the Team

### Code Review Guidelines

1. ✅ Check correct layer (shared/features/pages)
2. ✅ Check import rules
3. ✅ Check Public API presence for features
4. ✅ Check TypeScript types
5. ✅ Check component reusability
6. ✅ Verify correct layout usage in routes

### When to create a new feature?

Create a feature if:
- It's business logic (auth, payments, cart)
- Code will be used in multiple places
- Has state management (Pinia store)

Do NOT create a feature if:
- It's just a UI component → `shared/ui/`
- Used only on one page → `pages/PageName/components/`

---

**Architecture Version:** 1.0  
**Last Updated:** October 2025  
**Contact:** github - @MortyQ 

