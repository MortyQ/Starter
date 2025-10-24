<script setup lang="ts">
import { computed } from "vue";
import { Toaster } from "vue-sonner";

import { useThemeStore } from "@/features/theme/composables/useTheme";

const themeStore = useThemeStore();

const toasterTheme = computed(() => themeStore.currentTheme);
</script>

<template>
  <Toaster
    :theme="toasterTheme"
    position="top-right"
    :toast-options="{
      unstyled: true,
      classes: {
        toast: 'toast-custom',
        title: 'toast-title',
        description: 'toast-description',
        actionButton: 'toast-action',
        cancelButton: 'toast-cancel',
        closeButton: 'toast-close',
        error: 'toast-error',
        success: 'toast-success',
        warning: 'toast-warning',
        info: 'toast-info',
      },
    }"
    :duration="4000"
    close-button
  />
</template>

<style lang="scss">
// Fixed positioning for toaster container - critical for overlay behavior
[data-sonner-toaster] {
  position: fixed !important;
  z-index: 9999 !important;
  pointer-events: none;

  // Position variants
  &[data-x-position='right'] {
    right: 0;
  }

  &[data-x-position='left'] {
    left: 0;
  }

  &[data-x-position='center'] {
    left: 50%;
    transform: translateX(-50%);
  }

  &[data-y-position='top'] {
    top: 0;
  }

  &[data-y-position='bottom'] {
    bottom: 0;
  }
}

// Make individual toasts clickable
[data-sonner-toast] {
  pointer-events: auto;
}

// Custom toast styles using your project's design tokens
.toast-custom {
  @apply flex items-start gap-3 p-4 rounded-lg shadow-lg border;
  @apply bg-cardBg border-cardBorder;
  @apply min-w-[320px] max-w-[450px];
  @apply transition-all duration-300 ease-in-out;
  font-family: 'Inter', system-ui, sans-serif;

  &:hover {
    @apply shadow-xl;
  }
}

.toast-title {
  @apply text-sm font-semibold text-mainText;
  line-height: 1.4;
}

.toast-description {
  @apply text-xs text-secondaryText mt-1;
  line-height: 1.5;
}

// Success toast
.toast-success {
  @apply border-l-4 border-l-positive;

  [data-icon] {
    @apply text-positive;
    flex-shrink: 0;
    width: 20px;
    height: 20px;
  }
}

// Error toast
.toast-error {
  @apply border-l-4 border-l-negative;

  [data-icon] {
    @apply text-negative;
    flex-shrink: 0;
    width: 20px;
    height: 20px;
  }
}

// Warning toast
.toast-warning {
  @apply border-l-4 border-l-warning;

  [data-icon] {
    @apply text-warning;
    flex-shrink: 0;
    width: 20px;
    height: 20px;
  }
}

// Info toast
.toast-info {
  @apply border-l-4 border-l-info;

  [data-icon] {
    @apply text-info;
    flex-shrink: 0;
    width: 20px;
    height: 20px;
  }
}

// Close button
.toast-close {
  @apply absolute top-2 right-2 opacity-70 hover:opacity-100;
  @apply transition-opacity duration-200;
  @apply text-secondaryText hover:text-mainText;
  @apply w-5 h-5 flex items-center justify-center;
  @apply rounded-md hover:bg-base-200;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;

  &:focus {
    @apply outline-none ring-2 ring-primary ring-opacity-50;
  }

  svg {
    width: 16px;
    height: 16px;
  }
}

// Action button
.toast-action {
  @apply px-3 py-1.5 text-xs font-medium rounded-md;
  @apply bg-primary text-white;
  @apply hover:bg-primary-dark;
  @apply transition-colors duration-200;
  @apply mt-2;

  &:focus {
    @apply outline-none ring-2 ring-primary ring-opacity-50;
  }
}

// Cancel button
.toast-cancel {
  @apply px-3 py-1.5 text-xs font-medium rounded-md;
  @apply bg-base-200 text-mainText;
  @apply hover:bg-base-300;
  @apply transition-colors duration-200;
  @apply mt-2 ml-2;

  &:focus {
    @apply outline-none ring-2 ring-primary ring-opacity-50;
  }
}

// Loading spinner for promise toasts
[data-loading-icon] {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

// Animation for toast entrance/exit
[data-sonner-toaster] {
  [data-sonner-toast] {
    animation: slideIn 0.3s cubic-bezier(0.21, 1.02, 0.73, 1) forwards;
  }

  [data-sonner-toast][data-removed='true'] {
    animation: slideOut 0.2s ease-out forwards;
  }
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideOut {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
}

// Adjust spacing between toasts
[data-sonner-toaster] {
  // Padding from viewport edges
  padding: 16px;

  [data-sonner-toast]:not(:last-child) {
    margin-bottom: 12px;
  }
}
</style>

