<script setup lang="ts">
import { computed } from "vue";

import { useModal } from "@/shared/composables/useModal";

interface Props {
  id: string;
  title?: string;
  showCloseButton?: boolean;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
}

const props = withDefaults(defineProps<Props>(), {
  title: "",
  showCloseButton: true,
  closeOnBackdrop: true,
  closeOnEscape: true,
  maxWidth: "md",
});

const emit = defineEmits<{
  close: [];
  open: [];
}>();

const { isOpen, close, zIndex } = useModal(props.id);

const maxWidthClass = computed(() => {
  const widths = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    full: "max-w-full",
  };
  return widths[props.maxWidth];
});

const handleClose = () => {
  close();
  emit("close");
};

const handleBackdropClick = () => {
  if (props.closeOnBackdrop) {
    handleClose();
  }
};

const handleKeydown = (event: KeyboardEvent) => {
  if (props.closeOnEscape && event.key === "Escape") {
    handleClose();
  }
};
</script>

<template>
  <Teleport to="body">
    <Transition
      name="modal"
      @after-enter="emit('open')"
    >
      <div
        v-if="isOpen"
        class="modal-backdrop"
        :style="{ zIndex }"
        @click="handleBackdropClick"
        @keydown="handleKeydown"
      >
        <div
          class="modal-container"
          :class="maxWidthClass"
          @click.stop
        >
          <!-- Header -->
          <div
            v-if="title || showCloseButton || $slots.header"
            class="modal-header"
          >
            <slot name="header">
              <h3
                v-if="title"
                class="modal-title"
              >
                {{ title }}
              </h3>
            </slot>
            <button
              v-if="showCloseButton"
              class="modal-close-btn"
              type="button"
              aria-label="Close modal"
              @click="handleClose"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line
                  x1="18"
                  y1="6"
                  x2="6"
                  y2="18"
                />
                <line
                  x1="6"
                  y1="6"
                  x2="18"
                  y2="18"
                />
              </svg>
            </button>
          </div>

          <!-- Content -->
          <div class="modal-content">
            <slot />
          </div>

          <!-- Footer -->
          <div
            v-if="$slots.footer"
            class="modal-footer"
          >
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  overflow-y: auto;

  [data-theme="dark"] & {
    background: rgba(0, 0, 0, 0.7);
  }
}

.modal-container {
  border-radius: 0.75rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  width: 100%;
  max-height: calc(100vh - 2rem);
  display: flex;
  flex-direction: column;

  [data-theme="dark"] & {
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5),
      0 10px 10px -5px rgba(0, 0, 0, 0.3);
  }

  @apply bg-cardBg border-[1px] border-cardBorder;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem;
  @apply border-b-[1px] border-cardBorder;
}

.modal-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
  @apply text-mainText
}

.modal-close-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 0.375rem;
  transition: all 0.2s ease;
  flex-shrink: 0;
  @apply text-secondaryText;

  &:hover {
    @apply text-mainText bg-base-200
  }

  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }
}

.modal-content {
  padding: 1.25rem;
  overflow-y: auto;
  flex: 1;
  color: var(--color-mainText);
}

.modal-footer {
  padding: 1rem 1.25rem;
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  @apply border-t-[1px] border-cardBorder;
}

/* Transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;

  .modal-container {
    transition: transform 0.3s ease, opacity 0.3s ease;
  }
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;

  .modal-container {
    transform: scale(0.95) translateY(-20px);
    opacity: 0;
  }
}

/* Responsive */
@media (max-width: 640px) {
  .modal-backdrop {
    padding: 0;
  }

  .modal-container {
    max-height: 100vh;
    border-radius: 0;
  }

  .modal-header,
  .modal-content,
  .modal-footer {
    padding: 1rem;
  }
}
</style>
