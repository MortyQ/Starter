import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";

// Import views
import HomeView from "@/views/HomeView.vue";

/**
 * Application routes configuration
 * Following Vue Router 4 best practices with lazy loading for better performance
 */
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
    meta: {
      title: "Home - Vue 3 Starter",
    },
  },
  {
    path: "/about",
    name: "About",
    // Lazy-loaded route for better code splitting
    component: () => import("@/views/AboutView.vue"),
    meta: {
      title: "About - Vue 3 Starter",
    },
  },
  {
    path: "/components",
    name: "ComponentsGallery",
    component: () => import("@/views/ComponentsGallery.vue"),
    meta: {
      title: "Component Library - Vue 3 Starter",
    },
  },
  {
    path: "/modals",
    name: "ModalExample",
    component: () => import("@/views/ModalExampleView.vue"),
    meta: {
      title: "Modal Examples - Vue 3 Starter",
    },
  },
  {
    path: "/icons",
    name: "IconDemo",
    component: () => import("@/views/IconDemoView.vue"),
    meta: {
      title: "Icon Demo - Vue 3 Starter",
    },
  },
  {
    // Catch-all route for 404 handling
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/NotFoundView.vue"),
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
