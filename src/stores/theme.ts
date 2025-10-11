import { defineStore } from "pinia";
import { ref, computed } from "vue";

/**
 * Theme store for managing application theme state
 * Uses Composition API style for better TypeScript support
 */
export const useThemeStore = defineStore("theme", () => {
  // State
  const currentTheme = ref<"light" | "dark">("light");

  // Getters
  const isDark = computed(() => currentTheme.value === "dark");
  const isLight = computed(() => currentTheme.value === "light");

  // Actions
  function setTheme(theme: "light" | "dark") {
    currentTheme.value = theme;
    updateDocumentTheme(theme);
    localStorage.setItem("theme", theme);
  }

  function toggleTheme() {
    const newTheme = currentTheme.value === "light" ? "dark" : "light";
    setTheme(newTheme);
  }

  function initTheme() {
    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    const theme = savedTheme || (prefersDark ? "dark" : "light");
    setTheme(theme);
  }

  function updateDocumentTheme(theme: "light" | "dark") {
    if (theme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  }

  return {
    // State
    currentTheme,
    // Getters
    isDark,
    isLight,
    // Actions
    setTheme,
    toggleTheme,
    initTheme,
  };
});
