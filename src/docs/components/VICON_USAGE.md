# VIcon Component Documentation

## 📦 Overview

The VIcon component is a reusable icon system built with **unplugin-icons** that supports multiple icon collections (Material Design Icons, Heroicons, Lucide, etc.).

## ✨ Key Features

- ✅ **Multiple icon collections** - MDI, Heroicons, Lucide support
- ✅ **Dynamic loading** - Works perfectly in v-for loops with dynamic data
- ✅ **TypeScript support** - Full type safety
- ✅ **Customizable** - Size, color, and CSS class props
- ✅ **Tree-shakeable** - Only used icons are bundled
- ✅ **Easy to extend** - Add new icons by updating the iconMap

## 🚀 Usage

### Basic Usage

```vue
<script setup lang="ts">
import VIcon from "@/components/VIcon.vue";
</script>

<template>
  <VIcon icon="mdi:home" />
  <VIcon icon="mdi:search" />
  <VIcon icon="mdi:settings" />
</template>
```

### With Custom Size and Color

```vue
<template>
  <VIcon 
    icon="mdi:home" 
    :size="32" 
    color="#ef4444" 
  />
  
  <VIcon 
    icon="mdi:user" 
    size="48px" 
    color="currentColor" 
  />
</template>
```

### Dynamic Icons in v-for

```vue
<script setup lang="ts">
const menuItems = [
  { id: 1, name: "Home", icon: "mdi:home" },
  { id: 2, name: "Search", icon: "mdi:search" },
  { id: 3, name: "Settings", icon: "mdi:settings" },
];
</script>

<template>
  <div v-for="item in menuItems" :key="item.id">
    <VIcon :icon="item.icon" :size="24" />
    <span>{{ item.name }}</span>
  </div>
</template>
```

### With Custom CSS Class

```vue
<template>
  <VIcon 
    icon="mdi:loading" 
    :size="24" 
    class="animate-spin" 
  />
</template>

<style>
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
```

## 📝 API Reference

### Props

```typescript
interface Props {
  /** Icon name in format "collection:name" (e.g., "mdi:home") */
  icon: string;
  
  /** Icon size in pixels (default: 24) */
  size?: string | number;
  
  /** Icon color (default: currentColor) */
  color?: string;
  
  /** Additional CSS class */
  class?: string;
}
```

### Prop Details

- **icon** (required)
  - Format: `"collection:name"`
  - Examples: `"mdi:home"`, `"heroicons:user-solid"`, `"lucide:settings"`
  - Must be added to the iconMap in VIcon.vue

- **size** (optional, default: 24)
  - Type: `string | number`
  - Examples: `24`, `"32px"`, `"2rem"`
  - Numbers are converted to pixels

- **color** (optional, default: "currentColor")
  - Type: `string`
  - Examples: `"#ef4444"`, `"rgb(255, 0, 0)"`, `"red"`, `"currentColor"`
  - Use "currentColor" to inherit from parent

- **class** (optional)
  - Type: `string`
  - Additional CSS classes for custom styling

## 🎨 Available Icons

### Material Design Icons (mdi:)

```vue
<VIcon icon="mdi:home" />
<VIcon icon="mdi:menu" />
<VIcon icon="mdi:close" />
<VIcon icon="mdi:search" />
<VIcon icon="mdi:settings" />
<VIcon icon="mdi:user" />
<VIcon icon="mdi:check" />
<VIcon icon="mdi:alert" />
<VIcon icon="mdi:info" />
<VIcon icon="mdi:delete" />
<VIcon icon="mdi:edit" />
<VIcon icon="mdi:plus" />
<VIcon icon="mdi:minus" />
<VIcon icon="mdi:chevron-down" />
<VIcon icon="mdi:chevron-up" />
<VIcon icon="mdi:chevron-left" />
<VIcon icon="mdi:chevron-right" />
<VIcon icon="mdi:arrow-left" />
<VIcon icon="mdi:arrow-right" />
<VIcon icon="mdi:loading" />
```

### Heroicons (heroicons:)

```vue
<VIcon icon="heroicons:home-solid" />
<VIcon icon="heroicons:user-solid" />
<VIcon icon="heroicons:cog-solid" />
<VIcon icon="heroicons:x-mark-solid" />
```

### Lucide Icons (lucide:)

```vue
<VIcon icon="lucide:home" />
<VIcon icon="lucide:user" />
<VIcon icon="lucide:settings" />
<VIcon icon="lucide:menu" />
```

## 🔧 Adding New Icons

To add a new icon, edit the `iconMap` in `src/components/VIcon.vue`:

```typescript
const iconMap: Record<string, () => Promise<{ default: Component }>> = {
  // ...existing icons...
  
  // Add your new icon here
  "mdi:new-icon": () => import("~icons/mdi/new-icon"),
  "lucide:star": () => import("~icons/lucide/star"),
};
```

### Finding Icon Names

1. **Material Design Icons**: https://pictogrammers.com/library/mdi/
2. **Heroicons**: https://heroicons.com/
3. **Lucide**: https://lucide.dev/icons/

Icon import path format:
- Collection: The icon set (mdi, heroicons, lucide)
- Name: The icon name in kebab-case

Example: 
- `"mdi:account-circle"` → `~icons/mdi/account-circle`
- `"heroicons:arrow-left-solid"` → `~icons/heroicons/arrow-left-solid`

## 💡 Usage Examples

### In Buttons

```vue
<button class="flex items-center gap-2">
  <VIcon icon="mdi:plus" :size="20" />
  <span>Add Item</span>
</button>
```

### In Navigation

```vue

<nav>
  <a href="/" class="flex items-center gap-2">
    <VIcon icon="mdi:home" :size="20" color="currentColor"/>
    <span>Home</span>
  </a>
  <a href="/settings" class="flex items-center gap-2">
    <VIcon icon="mdi:settings" :size="20" color="currentColor"/>
    <span>Settings</span>
  </a>
</nav>
```

### With Loading State

```vue
<script setup lang="ts">
import { ref } from 'vue';

const isLoading = ref(false);

const handleSubmit = async () => {
  isLoading.value = true;
  // ... your async operation
  isLoading.value = false;
};
</script>

<template>
  <button @click="handleSubmit" :disabled="isLoading">
    <VIcon 
      :icon="isLoading ? 'mdi:loading' : 'mdi:check'" 
      :class="{ 'animate-spin': isLoading }"
    />
    {{ isLoading ? 'Saving...' : 'Save' }}
  </button>
</template>
```

### Status Icons with Colors

```vue
<script setup lang="ts">
const statusConfig = {
  success: { icon: 'mdi:check', color: '#10b981' },
  error: { icon: 'mdi:alert', color: '#ef4444' },
  warning: { icon: 'mdi:alert', color: '#f59e0b' },
  info: { icon: 'mdi:info', color: '#3b82f6' },
};
</script>

<template>
  <div v-for="(config, status) in statusConfig" :key="status">
    <VIcon :icon="config.icon" :color="config.color" :size="24" />
    <span>{{ status }}</span>
  </div>
</template>
```

## 🔍 Technical Details

### How It Works

1. Icons are imported dynamically using `import("~icons/...")`
2. The `iconMap` contains all available icons as lazy-loaded functions
3. The `iconComponent` computed property resolves the correct icon based on the `icon` prop
4. Icons are rendered using Vue's `<component :is="...">` dynamic component

### Tree Shaking

Only icons that are actually used in your application will be included in the final bundle. Unused icons are automatically removed during the build process.

### TypeScript Support

Full TypeScript support with type declarations for all icon imports. The `~icons/*` module is declared in `src/vite-env.d.ts`.

## 🚀 Live Demo

Run the project and navigate to `/icons` to see all available icons and usage examples.

```bash
pnpm dev
# Navigate to http://localhost:3000/icons
```

## ⚠️ Troubleshooting

### Icon Not Found Warning

If you see a warning like `[VIcon] Icon "mdi:xxx" not found in icon map`, you need to add the icon to the `iconMap` in `VIcon.vue`.

### TypeScript Errors

If you see TypeScript errors about missing modules, make sure `src/vite-env.d.ts` includes the icon type declarations.

### Icons Not Rendering

1. Check that `unplugin-icons` is properly configured in `vite.config.ts`
2. Verify the icon name format is correct: `"collection:name"`
3. Ensure the icon exists in the chosen collection

