<script setup lang="ts">
import { ref } from "vue";

import { useToast } from "@/shared/composables";
import VButton from "@/shared/ui/common/VButton.vue";
import VCard from "@/shared/ui/common/VCard.vue";

const toast = useToast();

// State for promise toast demo
const isLoadingPromise = ref(false);

// Demo functions
const showSuccess = () => {
  toast.success("Success!", "Your operation completed successfully.");
};

const showError = () => {
  toast.error("Error occurred!", "Something went wrong. Please try again.");
};

const showWarning = () => {
  toast.warning("Warning!", "Please check your input before continuing.");
};

const showInfo = () => {
  toast.info("Information", "This is an informational message for you.");
};

const showSimple = () => {
  toast.custom("Simple notification without type");
};

const showPromise = () => {
  isLoadingPromise.value = true;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve({ data: "Success data" });
      } else {
        reject(new Error("Failed to load"));
      }
      isLoadingPromise.value = false;
    }, 2000);
  });

  toast.promise(promise, {
    loading: "Loading data...",
    success: "Data loaded successfully!",
    error: "Failed to load data",
  });
};

const showWithAction = () => {
  toast.custom("Task completed", {
    description: "Click the button to view details",
  });
};
</script>

<template>
  <section class="page-container pt-5">
    <div class="flex flex-col gap-2">
      <!-- Header -->
      <div>
        <h2 class="text-2xl font-bold text-mainText mb-2">
          Toast Notifications
        </h2>
        <p class="text-secondaryText">
          Beautiful toast notifications powered by vue-sonner, styled to match your theme.
        </p>
      </div>

      <div class="flex gap-4">
        <!-- Basic Toasts -->
        <VCard class="w-full">
          <h3 class="text-lg font-semibold text-mainText mb-4">
            Basic Toast Types
          </h3>
          <div class="flex gap-4">
            <VButton
              variant="positive"
              text="Success Toast"
              icon="mdi:check-circle"
              class="w-full"
              @click="showSuccess"
            />
            <VButton
              variant="negative"
              text="Error Toast"
              icon="mdi:alert-circle"
              class="w-full"
              @click="showError"
            />
            <VButton
              variant="warning"
              text="Warning Toast"
              icon="mdi:alert"
              class="w-full"
              @click="showWarning"
            />
            <VButton
              variant="primary"
              text="Info Toast"
              icon="mdi:information"
              class="w-full"
              @click="showInfo"
            />
          </div>
        </VCard>

        <!-- Advanced Toasts -->
        <VCard class="w-full">
          <h3 class="text-lg font-semibold text-mainText mb-4">
            Advanced Features
          </h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <VButton
              variant="default"
              text="Simple Toast"
              icon="mdi:message-text"
              class="w-full"
              @click="showSimple"
            />
            <VButton
              variant="primary"
              text="Promise Toast"
              icon="mdi:loading"
              class="w-full"
              :disabled="isLoadingPromise"
              @click="showPromise"
            />
            <VButton
              variant="link"
              text="Custom Toast"
              icon="mdi:gesture-tap"
              class="w-full"
              @click="showWithAction"
            />
          </div>
        </VCard>
      </div>

      <!-- Usage Example -->
      <div class="flex gap-4">
        <VCard class="w-full">
          <h3 class="text-lg font-semibold text-mainText mb-4">
            Usage Example
          </h3>
          <div class="bg-base-200 rounded-lg p-4 overflow-hidden">
            <pre
              class="text-xs sm:text-sm text-mainText overflow-x-auto font-mono leading-relaxed"
            ><code>// Import the composable
import { useToast } from '@/shared/composables';

const toast = useToast();

// Show different types
toast.success('Success!', 'Operation completed');
toast.error('Error!', 'Something went wrong');
toast.warning('Warning!', 'Please be careful');
toast.info('Info', 'Here is some information');

// Promise toast
toast.promise(fetchData(), {
  loading: 'Loading...',
  success: 'Data loaded!',
  error: 'Failed to load'
});

// Custom toast
toast.custom('Custom message', {
  description: 'With description'
});</code></pre>
          </div>
        </VCard>

        <!-- Features -->
        <VCard class="w-full">
          <h3 class="text-lg font-semibold text-mainText mb-4">
            Features
          </h3>
          <ul class="space-y-3 text-secondaryText">
            <li class="flex items-start gap-3">
              <span class="text-positive text-lg font-bold flex-shrink-0">✓</span>
              <span class="pt-0.5">Automatically adapts to your light/dark theme</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-positive text-lg font-bold flex-shrink-0">✓</span>
              <span class="pt-0.5">Uses your project's custom color variables</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-positive text-lg font-bold flex-shrink-0">✓</span>
              <span class="pt-0.5">Smooth animations and transitions</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-positive text-lg font-bold flex-shrink-0">✓</span>
              <span class="pt-0.5">Close button for manual dismissal</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-positive text-lg font-bold flex-shrink-0">✓</span>
              <span class="pt-0.5">Promise toasts with loading states</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-positive text-lg font-bold flex-shrink-0">✓</span>
              <span class="pt-0.5">Custom actions and cancel buttons</span>
            </li>
          </ul>
        </VCard>
      </div>
    </div>
  </section>
</template>

