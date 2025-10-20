/**
 * Global type definitions for the Vue 3 starter template
 * These types can be imported and used across the application
 */

// Component Props Types
export interface Feature {
  title: string;
  description: string;
  icon: string;
}

// Theme Types
export type ThemeMode = "light" | "dark";

export interface ThemeColors {
  primary: string;
  "primary-dark": string;
  secondary: string;
  accent: string;
  neutral: string;
  "base-100": string;
  "base-200": string;
  "base-300": string;
  info: string;
  success: string;
  warning: string;
  error: string;
}

// Router Meta Types
declare module "vue-router" {
  interface RouteMeta {
    title?: string;
    requiresAuth?: boolean;
    roles?: string[];
  }
}

// API Response Types (examples for future use)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  status: "success" | "error";
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

// Utility Types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredBy<T, K extends keyof T> = T & Required<Pick<T, K>>;

// Re-export component types
export * from "./components/card";
