/**
 * Available layout types
 */
export type LayoutType = "default" | "auth" | "empty";

/**
 * Extended route meta interface with layout support
 */
declare module "vue-router" {
  interface RouteMeta {
    title?: string;
    layout?: LayoutType;
    requiresAuth?: boolean;
  }
}

export {};

