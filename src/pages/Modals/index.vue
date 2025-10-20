<script setup lang="ts">
import { useModal } from "@/shared/composables/useModal";
import VModal from "@/shared/ui/common/VModal.vue";

const modal1 = useModal("modal-1", false);
const modal2 = useModal("modal-2", false);
const modal3 = useModal("modal-3", false);

</script>

<template>
  <div class="p-8 space-y-4">
    <h1 class="text-3xl font-bold text-mainText mb-8">
      Multiple Modals Example
    </h1>
    <div class="flex gap-4 flex-wrap">
      <button
        class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        @click="modal1.open"
      >
        Open Modal 1
      </button>

      <button
        class="px-4 py-2 bg-secondary text-white rounded-lg hover:opacity-80 transition-opacity"
        @click="modal2.open"
      >
        Open Modal 2
      </button>

      <button
        class="px-4 py-2 bg-accent text-white rounded-lg hover:opacity-80 transition-opacity"
        @click="modal3.open"
      >
        Open Modal 3
      </button>
    </div>

    <!-- Modal 1 -->
    <VModal
      id="modal-1"
      title="First Modal"
      max-width="full"
    >
      <div class="space-y-4">
        <p class="text-secondaryText">
          This is the first modal. You can open multiple modals at the same time.
          The z-index is automatically managed.
        </p>
        <button
          class="px-4 py-2 bg-primary text-white rounded-lg"
          @click="modal2.open"
        >
          Open Modal 2 from here
        </button>
      </div>

      <template #footer>
        <button
          class="px-4 py-2 bg-base-200 rounded-lg hover:bg-base-300 transition-colors"
          @click="modal1.close"
        >
          Cancel
        </button>
        <button
          class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          @click="modal1.close"
        >
          Confirm
        </button>
      </template>
    </VModal>

    <!-- Modal 2 -->
    <VModal
      id="modal-2"
      title="Second Modal"
      max-width="lg"
      :close-on-backdrop="false"
    >
      <div class="space-y-4">
        <p class="text-secondaryText">
          This modal doesn't close when clicking on the backdrop.
          Click the close button or press ESC to close it.
        </p>
        <button
          class="px-4 py-2 bg-accent text-white rounded-lg"
          @click="modal3.open"
        >
          Open Modal 3
        </button>
      </div>

      <template #footer>
        <button
          class="px-4 py-2 bg-base-200 rounded-lg hover:bg-base-300 transition-colors"
          @click="modal2.close"
        >
          Close
        </button>
      </template>
    </VModal>

    <!-- Modal 3 -->
    <VModal
      id="modal-3"
      title="Third Modal - Small"
      max-width="sm"
    >
      <div class="space-y-4">
        <p class="text-secondaryText">
          This is a smaller modal. All modals are responsive and work on mobile devices.
        </p>
        <div class="p-4 bg-lightPositive rounded-lg">
          <p class="text-sm text-positive-dark">
            ✅ Z-index is automatically managed
          </p>
        </div>
      </div>

      <template #footer>
        <button
          class="px-4 py-2 bg-negative text-white rounded-lg
          hover:bg-negative-dark transition-colors"
          @click="modal3.close"
        >
          Close
        </button>
      </template>
    </VModal>

    <!-- Info Section -->
    <div class="mt-8 p-6 bg-cardBg border border-cardBorder rounded-lg">
      <h2 class="text-xl font-semibold text-mainText mb-4">
        Features:
      </h2>
      <ul class="space-y-2 text-secondaryText">
        <li>✅ Automatic z-index management</li>
        <li>✅ Multiple modals support</li>
        <li>✅ ESC key to close (configurable)</li>
        <li>✅ Click backdrop to close (configurable)</li>
        <li>✅ Fully reactive with Pinia</li>
        <li>✅ TypeScript support</li>
        <li>✅ Theme-aware colors</li>
        <li>✅ Responsive design</li>
        <li>✅ Smooth transitions</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.space-y-4 > * + * {
  margin-top: 1rem;
}

.space-y-2 > * + * {
  margin-top: 0.5rem;
}
</style>
