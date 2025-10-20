import type { Component } from "vue";

// Define card sizes
export type CardSize = "sm" | "md" | "lg" | "xl" | "full";

// Define card variants
export type CardVariant = "default" | "elevated" | "outlined" | "ghost";

// Define border radius options
export type CardRadius = "none" | "sm" | "md" | "lg" | "xl" | "full";

// Define padding options
export type CardPadding = "none" | "sm" | "md" | "lg" | "xl";

export interface CardProps {
  // Main content
  title?: string;
  subtitle?: string;
  description?: string;

  // Visual settings
  variant?: CardVariant;
  size?: CardSize;
  radius?: CardRadius;
  padding?: CardPadding;

  // States
  loading?: boolean;
  disabled?: boolean;
  clickable?: boolean;

  // Icons and images
  icon?: string | Component;
  image?: string;
  imageAlt?: string;

  // Additional settings
  as?: string;
  href?: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
}

// Component events
export interface CardEmits {
  click: [event: MouseEvent];
}

// Component slots
export interface CardSlots {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default?: () => any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  header?: () => any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  footer?: () => any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  loading?: () => any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image?: () => any;
}
