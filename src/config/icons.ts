import { defineAsyncComponent, type Component } from "vue";

/**
 * Icon Map Configuration
 *
 * Add your icons here to make them available in VIcon component.
 * Format: "collection:name": defineAsyncComponent(() => import("~icons/collection/name"))
 *
 * Find icons at:
 * - Material Design Icons: https://pictogrammers.com/library/mdi/
 * - Heroicons: https://heroicons.com/
 * - Lucide: https://lucide.dev/icons/
 */

export const iconMap: Record<string, Component> = {
  // ==================== Material Design Icons ====================

  // Navigation & UI
  "mdi:home": defineAsyncComponent(() => import("~icons/mdi/home")),
  "mdi:menu": defineAsyncComponent(() => import("~icons/mdi/menu")),
  "mdi:close": defineAsyncComponent(() => import("~icons/mdi/close")),
  "mdi:chevron-left": defineAsyncComponent(() => import("~icons/mdi/chevron-left")),
  "mdi:chevron-right": defineAsyncComponent(() => import("~icons/mdi/chevron-right")),
  "mdi:chevron-up": defineAsyncComponent(() => import("~icons/mdi/chevron-up")),
  "mdi:chevron-down": defineAsyncComponent(() => import("~icons/mdi/chevron-down")),
  "mdi:arrow-left": defineAsyncComponent(() => import("~icons/mdi/arrow-left")),
  "mdi:arrow-right": defineAsyncComponent(() => import("~icons/mdi/arrow-right")),

  // Actions
  "mdi:search": defineAsyncComponent(() => import("~icons/mdi/magnify")),
  "mdi:settings": defineAsyncComponent(() => import("~icons/mdi/cog")),
  "mdi:edit": defineAsyncComponent(() => import("~icons/mdi/pencil")),
  "mdi:delete": defineAsyncComponent(() => import("~icons/mdi/delete")),
  "mdi:plus": defineAsyncComponent(() => import("~icons/mdi/plus")),
  "mdi:minus": defineAsyncComponent(() => import("~icons/mdi/minus")),
  "mdi:check": defineAsyncComponent(() => import("~icons/mdi/check")),
  "mdi:save": defineAsyncComponent(() => import("~icons/mdi/content-save")),

  // Status & Alerts
  "mdi:alert": defineAsyncComponent(() => import("~icons/mdi/alert")),
  "mdi:info": defineAsyncComponent(() => import("~icons/mdi/information")),
  "mdi:warning": defineAsyncComponent(() => import("~icons/mdi/alert-circle")),
  "mdi:error": defineAsyncComponent(() => import("~icons/mdi/alert-octagon")),
  "mdi:success": defineAsyncComponent(() => import("~icons/mdi/check-circle")),
  "mdi:loading": defineAsyncComponent(() => import("~icons/mdi/loading")),

  // User & Account
  "mdi:user": defineAsyncComponent(() => import("~icons/mdi/account")),
  "mdi:user-circle": defineAsyncComponent(() => import("~icons/mdi/account-circle")),
  "mdi:users": defineAsyncComponent(() => import("~icons/mdi/account-group")),
  "mdi:login": defineAsyncComponent(() => import("~icons/mdi/login")),
  "mdi:logout": defineAsyncComponent(() => import("~icons/mdi/logout")),

  // Communication
  "mdi:email": defineAsyncComponent(() => import("~icons/mdi/email")),
  "mdi:phone": defineAsyncComponent(() => import("~icons/mdi/phone")),
  "mdi:message": defineAsyncComponent(() => import("~icons/mdi/message")),
  "mdi:bell": defineAsyncComponent(() => import("~icons/mdi/bell")),

  // Files & Content
  "mdi:file": defineAsyncComponent(() => import("~icons/mdi/file")),
  "mdi:folder": defineAsyncComponent(() => import("~icons/mdi/folder")),
  "mdi:image": defineAsyncComponent(() => import("~icons/mdi/image")),
  "mdi:download": defineAsyncComponent(() => import("~icons/mdi/download")),
  "mdi:upload": defineAsyncComponent(() => import("~icons/mdi/upload")),

  // Theme
  "mdi:moon": defineAsyncComponent(() => import("~icons/mdi/weather-night")),
  "mdi:sun": defineAsyncComponent(() => import("~icons/mdi/white-balance-sunny")),

  // Other
  "mdi:heart": defineAsyncComponent(() => import("~icons/mdi/heart")),
  "mdi:star": defineAsyncComponent(() => import("~icons/mdi/star")),
  "mdi:calendar": defineAsyncComponent(() => import("~icons/mdi/calendar")),
  "mdi:clock": defineAsyncComponent(() => import("~icons/mdi/clock")),
  "mdi:link": defineAsyncComponent(() => import("~icons/mdi/link")),
  "mdi:eye": defineAsyncComponent(() => import("~icons/mdi/eye")),
  "mdi:eye-off": defineAsyncComponent(() => import("~icons/mdi/eye-off")),

  // ==================== Heroicons ====================

  "heroicons:home-solid": defineAsyncComponent(() => import("~icons/heroicons/home-solid")),
  "heroicons:user-solid": defineAsyncComponent(() => import("~icons/heroicons/user-solid")),
  "heroicons:cog-solid": defineAsyncComponent(() => import("~icons/heroicons/cog-6-tooth-solid")),
  "heroicons:x-mark-solid": defineAsyncComponent(() => import("~icons/heroicons/x-mark-solid")),
  "heroicons:bell-solid": defineAsyncComponent(() => import("~icons/heroicons/bell-solid")),
  "heroicons:envelope-solid": defineAsyncComponent(() => import("~icons/heroicons/envelope-solid")),

  // ==================== Lucide ====================

  "lucide:home": defineAsyncComponent(() => import("~icons/lucide/home")),
  "lucide:user": defineAsyncComponent(() => import("~icons/lucide/user")),
  "lucide:settings": defineAsyncComponent(() => import("~icons/lucide/settings")),
  "lucide:menu": defineAsyncComponent(() => import("~icons/lucide/menu")),
  "lucide:search": defineAsyncComponent(() => import("~icons/lucide/search")),
  "lucide:heart": defineAsyncComponent(() => import("~icons/lucide/heart")),
  "lucide:star": defineAsyncComponent(() => import("~icons/lucide/star")),
  "lucide:moon": defineAsyncComponent(() => import("~icons/lucide/moon")),
  "lucide:sun": defineAsyncComponent(() => import("~icons/lucide/sun")),
};

/**
 * Get list of all available icons
 */
export const getAvailableIcons = (): string[] => {
  return Object.keys(iconMap).sort();
};

/**
 * Check if icon exists in the map
 */
export const hasIcon = (iconName: string): boolean => {
  return iconName in iconMap;
};

