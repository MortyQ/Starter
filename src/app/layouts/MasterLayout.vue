<script setup lang="ts">
import { computed, type Component } from "vue";
import { useRoute } from "vue-router";

// Import all available layouts
import AuthLayout from "./AuthLayout.vue";
import DefaultLayout from "./DefaultLayout.vue";
import EmptyLayout from "./EmptyLayout.vue";

/**
 * MasterLayout - Dynamic layout switcher based on route meta
 *
 * Usage in router:
 * {
 *   path: '/login',
 *   component: LoginPage,
 *   meta: { layout: 'auth' }
 * }
 */

// Layout registry - add new layouts here
const layouts: Record<string, Component> = {
  default: DefaultLayout,
  auth: AuthLayout,
  empty: EmptyLayout,
};

const route = useRoute();

// Dynamically resolve layout from route meta
const layout = computed(() => {
  const layoutName = (route.meta.layout as string) || "default";
  return layouts[layoutName] || layouts.default;
});
</script>

<template>
  <component :is="layout" />
</template>

