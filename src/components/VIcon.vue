<script setup lang="ts">
import { computed, type Component } from "vue";

import { iconMap, hasIcon } from "@/config/icons";

interface Props {
  /** Icon name in format "collection:name" (e.g., "mdi:home", "heroicons:user-solid") */
  icon: string;
  /** Icon size in pixels (default: 24) */
  size?: string | number;
  /** Icon color (default: currentColor) */
  color?: string;
  /** Additional CSS class */
  class?: string;
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 24,
  color: "currentColor",
  class: "",
});

/**
 * Fallback component for missing or failed icon imports
 */
const FallbackIcon: Component = {
  template: '<span style="font-family: monospace; font-weight: bold; color: #ef4444;">?</span>',
};

/**
 * Get icon component from icon map
 */
const iconComponent = computed<Component>(() => {
  if (!hasIcon(props.icon)) {
    console.warn(
      `[VIcon] Icon "${props.icon}" not found. ` +
      `Add it to src/config/icons.ts or check the icon name format.`,
    );
    return FallbackIcon;
  }

  if(props.loading) {
    return iconMap["mdi:loading"];
  }

  return iconMap[props.icon];
});

/**
 * Computed styles for icon wrapper
 */
const iconStyles = computed(() => ({
  width: typeof props.size === "number" ? `${props.size}px` : props.size,
  height: typeof props.size === "number" ? `${props.size}px` : props.size,
  color: props.color,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
}));
</script>

<template>
  <span
    :style="iconStyles"
    :class="[{ 'animate-spin': props.loading }, props.class]"
    class="v-icon"
  >
    <component :is="iconComponent" />
  </span>
</template>

<style scoped>
.v-icon {
  line-height: 1;
}

.v-icon svg {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
