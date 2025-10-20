/**
 * Theme Feature
 *
 * Provides theme management functionality including:
 * - Theme toggle component
 * - Theme state management
 * - Theme utilities for Tailwind CSS
 *
 * @example
 * ```ts
 * import { ThemeToggle, useTheme } from '@/features/theme';
 *
 * const { isDark, toggleTheme } = useTheme();
 * ```
 */

export { default as ThemeToggle } from "./components/ThemeToggle.vue";
export { useThemeStore } from "./composables/useTheme";
export { createThemes } from "./utils/createThemes";

