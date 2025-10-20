import { computed, onBeforeUnmount } from "vue";

import { useModalStore } from "@/features/modal/composables/useModalStore";

/**
 * Composable for managing modal state
 * Automatically registers and unregisters modal on mount/unmount
 *
 * @param id - Unique identifier for the modal
 * @param autoUnregister - Whether to automatically unregister modal on unmount (default: true)
 * @returns Modal state and control methods
 *
 * @example
 * ```vue
 * <script setup>
 * const { isOpen, open, close, zIndex } = useModal('my-modal');
 * </script>
 *
 * <template>
 *   <button @click="open">Open Modal</button>
 *   <Teleport to="body">
 *     <div v-if="isOpen" :style="{ zIndex }">
 *       <div>Modal content</div>
 *       <button @click="close">Close</button>
 *     </div>
 *   </Teleport>
 * </template>
 * ```
 */
export function useModal(id: string, autoUnregister = true) {
  const modalStore = useModalStore();

  // Register modal on creation
  modalStore.register(id);

  // Computed properties
  const isOpen = computed(() => modalStore.isOpen(id));
  const zIndex = computed(() => modalStore.getZIndex(id));
  const modal = computed(() => modalStore.getModal(id));

  // Methods
  const open = () => modalStore.open(id);
  const close = () => modalStore.close(id);
  const toggle = () => modalStore.toggle(id);

  // Cleanup on unmount
  if (autoUnregister) {
    onBeforeUnmount(() => {
      modalStore.unregister(id);
    });
  }

  return {
    isOpen,
    zIndex,
    modal,
    open,
    close,
    toggle,
  };
}
