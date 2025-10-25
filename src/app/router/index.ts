import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import "@/app/layouts/types"; // Import layout types for TypeScript support

// Import views
import HomeView from "@/pages/Home/index.vue";

/**
 * Application routes configuration
 * Following Vue Router 4 best practices with lazy loading for better performance
 *
 * Layout usage:
 * - No meta.layout or meta.layout: "default" → DefaultLayout (with header/nav)
 * - meta.layout: "auth" → AuthLayout (centered, no nav)
 */
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
    meta: {
      title: "Home - Vue 3 Starter",
      layout: "default", // Optional, default is used anyway
    },
  },
  {
    path: "/login",
    name: "Login",
    component: HomeView,
    meta: {
      title: "Login - Vue 3 Starter",
      layout: "auth", // Use Auth layout (centered, no navigation)
    },
  },
  {
    path: "/about",
    name: "About",
    // Lazy-loaded route for better code splitting
    component: () => import("@/pages/About/index.vue"),
    meta: {
      title: "About - Vue 3 Starter",
    },
  },
  {
    path: "/components",
    name: "ComponentsGallery",
    component: () => import("@/pages/Components/index.vue"),
    meta: {
      title: "Component Library - Vue 3 Starter",
    },
  },
  {
    path: "/ui-gallery",
    name: "UIGallery",
    component: () => import("@/pages/UIGallery/index.vue"),
    meta: {
      title: "UI Gallery - Vue 3 Starter",
    },
  },
  {
    path: "/table",
    name: "Table",
    component: () => import("@/pages/Table/index.vue"),
    meta: {
      title: "Table Example - Vue 3 Starter",
    },
  },
  {
    // Catch-all route for 404 handling
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/pages/NotFound/index.vue"),
    meta: {
      title: "Page Not Found - Vue 3 Starter",
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Always scroll to top when changing routes
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0 };
  },
});

// Global navigation guard for setting page titles
router.beforeEach((to) => {
  document.title = (to.meta.title as string) || "Vue 3 Starter";
});

export default router;
