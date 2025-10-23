# 📐 Layouts System

## Overview

This project uses the **MasterLayout** system for dynamic layout switching based on route meta. This allows keeping `App.vue` as clean as possible and moving all wrapper logic to layout components.

---

## 🏗️ Architecture

```
src/app/
├── App.vue              # Minimal - only <MasterLayout />
└── layouts/
    ├── MasterLayout.vue # Dynamic layout switcher
    ├── types.ts         # TypeScript types for meta.layout
    ├── DefaultLayout.vue # Layout with header + navigation
    ├── AuthLayout.vue   # Layout for auth pages (no nav)
    └── EmptyLayout.vue  # Minimal layout (content only)
```

---

## 📖 Usage

### 1. Basic usage in router

```typescript
// src/app/router/index.ts
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: HomePage,
    // Without meta.layout - default is used
  },
  {
    path: "/login",
    component: LoginPage,
    meta: {
      layout: "auth", // AuthLayout - centered content
    },
  },
  {
    path: "/print",
    component: PrintPage,
    meta: {
      layout: "empty", // EmptyLayout - content only
    },
  },
];
```

### 2. TypeScript support

All layouts are typed via `LayoutType`:

```typescript
// src/app/layouts/types.ts
export type LayoutType = "default" | "auth" | "empty";
```

TypeScript will automatically validate the layout name specified in meta.

---

## 🎨 Available Layouts

### DefaultLayout
**When to use:** Regular application pages

**What's included:**
- Header with navigation
- TopBar menu
- ThemeToggle
- Main content container

**Example:**
```typescript
meta: { layout: "default" } // or omit entirely
```

---

### AuthLayout
**When to use:** Login, registration, password reset pages

**What's included:**
- Centered content
- ThemeToggle in corner
- No header/navigation

**Example:**
```typescript
meta: { layout: "auth" }
```

---

### EmptyLayout
**When to use:** Print, embed, iframe, fullscreen pages

**What's included:**
- Pure content only
- No header, navigation, or additional elements

**Example:**
```typescript
meta: { layout: "empty" }
```

---

## ➕ Adding a New Layout

### Step 1: Create the component

```vue
<!-- src/app/layouts/DashboardLayout.vue -->
<script setup lang="ts">
import { RouterView } from "vue-router";
import Sidebar from "@/widgets/Sidebar.vue";
</script>

<template>
  <div class="flex">
    <Sidebar />
    <main class="flex-1">
      <RouterView />
    </main>
  </div>
</template>
```

### Step 2: Register in MasterLayout

```typescript
// src/app/layouts/MasterLayout.vue
import DashboardLayout from "./DashboardLayout.vue";

const layouts: Record<string, Component> = {
  default: DefaultLayout,
  auth: AuthLayout,
  empty: EmptyLayout,
  dashboard: DashboardLayout, // ✅ Add here
};
```

### Step 3: Add type

```typescript
// src/app/layouts/types.ts
export type LayoutType = "default" | "auth" | "empty" | "dashboard";
```

### Step 4: Use in router

```typescript
{
  path: "/dashboard",
  component: DashboardPage,
  meta: { layout: "dashboard" },
}
```

---

## ✅ Benefits of This Approach

✅ **Clean App.vue** - only `<MasterLayout />`  
✅ **Declarative** - layout specified in meta  
✅ **Type-safe** - TypeScript validates layout names  
✅ **DRY** - no duplicated header/footer  
✅ **Flexible** - easy to add new layouts  
✅ **Best Practice** - used in Nuxt, large projects  

---

## 🎯 Best Practices

### 1. Name layouts semantically
```typescript
✅ layout: "auth"
✅ layout: "dashboard"
✅ layout: "empty"
❌ layout: "layout1"
❌ layout: "test"
```

### 2. Use default layout by default
```typescript
// No need to specify explicitly:
meta: { layout: "default" } // redundant

// Just omit layout:
meta: { title: "Home" } // default will be used automatically
```

### 3. Group routes by layouts
```typescript
// All auth routes together
const authRoutes = [
  { path: "/login", meta: { layout: "auth" } },
  { path: "/register", meta: { layout: "auth" } },
  { path: "/reset-password", meta: { layout: "auth" } },
];

// All dashboard routes together
const dashboardRoutes = [
  { path: "/dashboard", meta: { layout: "dashboard" } },
  { path: "/dashboard/settings", meta: { layout: "dashboard" } },
];
```

---

## 🔄 Migration from Direct Layouts

### Before (without MasterLayout):
```vue
<!-- App.vue - lots of logic -->
<template>
  <div class="app">
    <header>...</header>
    <nav>...</nav>
    <RouterView />
    <footer>...</footer>
  </div>
</template>
```

### After (with MasterLayout):
```vue
<!-- App.vue - minimal logic -->
<script setup lang="ts">
import MasterLayout from "@/app/layouts/MasterLayout.vue";
</script>

<template>
  <MasterLayout />
</template>
```

---

## 🚀 Usage Examples

### Example 1: Auth page
```typescript
{
  path: "/login",
  name: "Login",
  component: () => import("@/pages/Auth/Login.vue"),
  meta: {
    layout: "auth",
    title: "Login",
  },
}
```

### Example 2: Dashboard with sidebar
```typescript
{
  path: "/dashboard",
  name: "Dashboard",
  component: () => import("@/pages/Dashboard/index.vue"),
  meta: {
    layout: "dashboard",
    requiresAuth: true,
  },
}
```

### Example 3: Print-friendly page
```typescript
{
  path: "/invoice/:id/print",
  name: "InvoicePrint",
  component: () => import("@/pages/Invoice/Print.vue"),
  meta: {
    layout: "empty", // No header/footer for printing
  },
}
```

---

## 📚 Additional Resources

- [Vue Router Meta Fields](https://router.vuejs.org/guide/advanced/meta.html)
- [Dynamic Components](https://vuejs.org/guide/essentials/component-basics.html#dynamic-components)
- [Nuxt Layouts](https://nuxt.com/docs/guide/directory-structure/layouts) - similar approach
<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <div class="min-h-screen bg-base-100 text-neutral">
    <!-- Empty Layout - No header, no navigation, just content -->
    <RouterView />
  </div>
</template>

