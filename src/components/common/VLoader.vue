<script setup lang="ts">
import { computed } from "vue";

interface Props {
  size?: "small" | "medium" | "large"
  message?: string
  fullscreen?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: "medium",
  message: "",
  fullscreen: false,
});

const sizeClass = computed(() => `loader-${props.size}`);
const containerClass = computed(() => ({
  "loader-fullscreen": props.fullscreen,
}));
</script>

<template>
  <div
    role="status"
    class="loader-container"
    :class="containerClass"
  >
    <div
      class="loader"
      :class="sizeClass"
    >
      <div class="loader-circle" />
      <div class="loader-circle" />
      <div class="loader-circle" />
    </div>
    <span
      v-if="message"
      class="loader-message"
    >{{ message }}</span>
    <span class="sr-only">Loading...</span>
  </div>
</template>

<style lang="scss" scoped>
.loader-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 1rem;

  &.loader-fullscreen {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(8px);
    z-index: 9999;

    [data-theme="dark"] & {
      background: rgba(15, 23, 42, 0.95);
    }
  }
}

.loader {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
}

.loader-circle {
  border-radius: 50%;
  animation: bounce 1.4s ease-in-out infinite both;
  background: var(--color-primary);
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.3);

  [data-theme="dark"] & {
    background: var(--color-primary);
    box-shadow: 0 0 20px rgba(96, 165, 250, 0.4);
  }

  &:nth-child(1) {
    animation-delay: -0.32s;
  }

  &:nth-child(2) {
    animation-delay: -0.16s;
  }
}

.loader-small {
  .loader-circle {
    width: 0.5rem;
    height: 0.5rem;
  }
  gap: 0.25rem;
}

.loader-medium {
  .loader-circle {
    width: 0.75rem;
    height: 0.75rem;
  }
  gap: 0.375rem;
}

.loader-large {
  .loader-circle {
    width: 1rem;
    height: 1rem;
  }
  gap: 0.5rem;
}

.loader-message {
  font-size: 0.875rem;
  color: var(--color-secondaryText);
  font-weight: 500;
  text-align: center;
  animation: pulse 2s ease-in-out infinite;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

@keyframes bounce {
  0%, 80%, 100% {
    transform: scale(0) translateY(0);
    opacity: 0.5;
  }
  40% {
    transform: scale(1) translateY(-10px);
    opacity: 1;
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .loader-container {
    gap: 0.75rem;
  }

  .loader-message {
    font-size: 0.8125rem;
  }
}
</style>
