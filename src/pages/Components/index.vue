<script lang="ts" setup>
import { ref, onMounted, reactive } from "vue";

import { useToast } from "@/shared/composables";
import VButton from "@/shared/ui/common/VButton.vue";
import VIcon from "@/shared/ui/common/VIcon.vue";
import { componentsList } from "@/shared/utils/componentsList";

// Active section tracking for navigation
const activeSection = ref("");

// Scroll to top button visibility
const showScrollToTop = ref(false);

// Toast composable for demo
const toast = useToast();
const isLoadingPromise = ref(false);

// Toast demo functions
const showToastSuccess = () => {
  toast.success("Success!", "Your operation completed successfully.");
};

const showToastError = () => {
  toast.error("Error occurred!", "Something went wrong. Please try again.");
};

const showToastWarning = () => {
  toast.warning("Warning!", "Please check your input before continuing.");
};

const showToastInfo = () => {
  toast.info("Information", "This is an informational message for you.");
};

const showToastPromise = () => {
  isLoadingPromise.value = true;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve({ data: "Success" });
      } else {
        reject(new Error("Failed"));
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

// Reactive state for components with v-model
const componentStates = reactive({
  // VInput states
  inputBasic: "",
  inputWithIcon: "",
  inputPassword: "",
  inputUsername: "",
  inputSmall: "",
  inputMedium: "",
  inputLarge: "",
  inputDisabled: "Cannot edit this",
  inputError: "",

  // VSearch states
  searchBasic: "",
  searchNoDebounce: "",
  searchTextarea: "",
  searchWithValue: "Vue.js",

  // VCheckbox states
  checkboxBasic: false,
  checkboxDisabled: false,
  checkboxIndeterminate: false,
  checkboxCustom: false,

  // VSwitch states
  switchBasic: true,
  switchWithIcons: true,
  switchWithLabel: true,
  switchDisabled: false,

  // VMultiSelect states
  multiselectSingle: null,
  multiselectMultiple: [],
  multiselectNotSearchable: null,
  multiselectLoading: null,
  multiselectDisabled: { label: "Option", value: "opt" },
});

// Helper to get reactive state key for v-model components
const getStateKey = (componentName: string, exampleTitle: string): string | null => {
  const stateMap: Record<string, Record<string, string>> = {
    VInput: {
      "Basic Input": "inputBasic",
      "Input with Icon": "inputWithIcon",
      "Password Input": "inputPassword",
      "Input with Support Text": "inputUsername",
      "Different Sizes": "inputSmall",
      "Disabled State": "inputDisabled",
      "Error State with Validation": "inputError",
    },
    VSearch: {
      "Basic Search Input with Debounce": "searchBasic",
      "Search without Debounce": "searchNoDebounce",
      "Textarea Mode": "searchTextarea",
      "With Initial Value": "searchWithValue",
    },
    VCheckbox: {
      "Basic Usage": "checkboxBasic",
      "Disabled": "checkboxDisabled",
      "Indeterminate": "checkboxIndeterminate",
      "Custom Label Slot": "checkboxCustom",
    },
    VSwitch: {
      "Basic Switch": "switchBasic",
      "Switch with icons and color": "switchWithIcons",
      "Switch with custom label via slot": "switchWithLabel",
      "Disabled Switch": "switchDisabled",
    },
    VMultiSelect: {
      "Single Select": "multiselectSingle",
      "Multiple Select": "multiselectMultiple",
      "Not Searchable": "multiselectNotSearchable",
      "Loading State": "multiselectLoading",
      "Disabled State": "multiselectDisabled",
    },
  };

  return stateMap[componentName]?.[exampleTitle] || null;
};

// Check if component needs v-model
const needsVModel = (componentName: string): boolean => {
  return ["VInput", "VSearch", "VCheckbox", "VSwitch", "VMultiSelect"].includes(componentName);
};

// Scroll to anchor
const scrollToSection = (anchor: string) => {
  const element = document.getElementById(anchor);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

// Track active section on scroll
const handleScroll = () => {
  // Show/hide scroll to top button
  showScrollToTop.value = window.scrollY > 300;

  const sections = componentsList.map((comp) => comp.anchor);
  const scrollPosition = window.scrollY + 100; // Offset for header

  for (const anchor of sections) {
    const element = document.getElementById(anchor);
    if (element) {
      const { offsetTop, offsetHeight } = element;
      if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
        activeSection.value = anchor;
        break;
      }
    }
  }
};

// Scroll to top function
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};


onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  handleScroll(); // Set initial active section
});
</script>

<template>
  <div class="flex max-w-7xl mx-auto py-10 px-4 gap-8">
    <!-- Sidebar Navigation -->
    <aside class="w-64 flex-shrink-0 sticky top-10 h-fit">
      <div class="bg-base-200 rounded-lg p-4 border border-base-300">
        <h3 class="font-semibold text-mainText mb-4">
          Components
        </h3>
        <nav class="space-y-2">
          <button
            v-for="comp in componentsList"
            :key="comp.anchor"
            :class="[
              'w-full text-left px-3 py-2 rounded-md transition-colors text-sm',
              activeSection === comp.anchor
                ? 'bg-primary text-white'
                : 'text-secondaryText hover:bg-base-300 hover:text-mainText',
            ]"
            @click="scrollToSection(comp.anchor)"
          >
            {{ comp.name }}
          </button>
        </nav>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 min-w-0">
      <div class="mb-8">
        <h1 class="text-3xl font-bold mb-2">
          Component Library
        </h1>
        <p class="text-gray-600">
          Comprehensive collection of reusable UI components with examples and documentation.
        </p>
      </div>

      <!-- Component Sections -->
      <section
        v-for="comp in componentsList"
        :id="comp.anchor"
        :key="comp.anchor"
        class="mb-16 scroll-mt-10"
      >
        <div class="mb-6">
          <h2 class="text-2xl font-semibold mb-2 flex items-center gap-2">
            {{ comp.name }}
            <a
              :href="`#${comp.anchor}`"
              class="text-primary hover:text-primary-dark opacity-50
              hover:opacity-100 transition-opacity"
              title="Link to this section"
            >
              <VIcon
                icon="mdi:link"
                :size="20"
              />
            </a>
          </h2>
          <p class="text-gray-600">
            {{ comp.description }}
          </p>
        </div>

        <!-- Examples -->
        <div class="space-y-8">
          <div
            v-for="(example, idx) in comp.examples"
            :key="idx"
            class="mb-8"
          >
            <h3 class="font-medium mb-3 text-lg">
              {{ example.title }}
            </h3>

            <!-- Example Preview -->
            <div class="mb-4 p-6 bg-base-100 border border-base-300 rounded-lg">
              <!-- Special handling for variant comparison -->
              <div
                v-if="example.title === 'Variant Comparison'"
                class="grid grid-cols-1 md:grid-cols-4 gap-4"
              >
                <component
                  :is="comp.component"
                  size="sm"
                  title="Default"
                  variant="default"
                >
                  Standard card with shadow
                </component>
                <component
                  :is="comp.component"
                  size="sm"
                  title="Elevated"
                  variant="elevated"
                >
                  Interactive with hover effects
                </component>
                <component
                  :is="comp.component"
                  size="sm"
                  title="Outlined"
                  variant="outlined"
                >
                  Visible border style
                </component>
                <component
                  :is="comp.component"
                  size="sm"
                  title="Ghost"
                  variant="ghost"
                >
                  Transparent minimal style
                </component>
              </div>

              <div v-else-if="example.title === 'Card with Image and Footer'">
                <component
                  :is="comp.component"
                  v-bind="(example.exampleProps || {}) as any"
                >
                  <div class="space-y-3">
                    <p>
                      This card demonstrates advanced features including
                      custom images, structured content, and action
                      buttons in the footer.
                    </p>
                    <ul class="list-disc list-inside text-sm space-y-1">
                      <li>Custom image integration</li>
                      <li>Structured header with subtitle</li>
                      <li>Rich content area</li>
                      <li>Action buttons in footer</li>
                    </ul>
                  </div>
                  <template #footer>
                    <div class="flex justify-between items-center">
                      <span
                        class="text-xs bg-blue-100
                      text-blue-800 px-2 py-1 rounded-full"
                      >Featured</span>
                      <div class="space-x-2">
                        <button
                          class="px-3 py-1 bg-blue-500
                        text-white rounded text-sm hover:bg-blue-600"
                        >
                          Learn More
                        </button>
                        <button
                          class="px-3 py-1 bg-gray-500
                        text-white rounded text-sm hover:bg-gray-600"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </template>
                </component>
              </div>

              <!-- Special handling for loading states -->
              <div
                v-else-if="example.title === 'Loading States'"
                class="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <component
                  :is="comp.component"
                  loading
                  title="Default Loader"
                  variant="outlined"
                >
                  This content is hidden during loading
                </component>
                <component
                  :is="comp.component"
                  loading
                  title="Custom Loader"
                  variant="outlined"
                >
                  <template #loading>
                    <div class="text-center py-8">
                      <div class="inline-flex items-center space-x-2">
                        <div class="animate-pulse h-3 w-3 bg-blue-500 rounded-full" />
                        <div
                          class="animate-pulse h-3 w-3 bg-blue-500 rounded-full"
                          style="animation-delay: 0.2s"
                        />
                        <div
                          class="animate-pulse h-3 w-3 bg-blue-500 rounded-full"
                          style="animation-delay: 0.4s"
                        />
                      </div>
                      <p class="mt-3 text-sm text-gray-600">
                        Loading premium content...
                      </p>
                    </div>
                  </template>
                </component>
              </div>

              <!-- Special handling for Toast demos -->
              <div
                v-else-if="
                  !comp.component && example.title === 'Basic Toast Types'
                "
              >
                <div class="flex flex-wrap gap-3">
                  <VButton
                    variant="positive"
                    text="Success"
                    icon="mdi:check-circle"
                    @click="showToastSuccess"
                  />
                  <VButton
                    variant="negative"
                    text="Error"
                    icon="mdi:alert-circle"
                    @click="showToastError"
                  />
                  <VButton
                    variant="warning"
                    text="Warning"
                    icon="mdi:alert"
                    @click="showToastWarning"
                  />
                  <VButton
                    variant="primary"
                    text="Info"
                    icon="mdi:information"
                    @click="showToastInfo"
                  />
                </div>
              </div>

              <div
                v-else-if="
                  !comp.component &&
                    example.title === 'Promise-based Toast (Async Operations)'
                "
              >
                <VButton
                  variant="primary"
                  text="Test Promise Toast"
                  icon="mdi:loading"
                  :disabled="isLoadingPromise"
                  @click="showToastPromise"
                />
                <p class="mt-2 text-sm text-secondaryText">
                  Click to simulate async operation with 50% success rate
                </p>
              </div>

              <!-- Default component rendering -->
              <div v-else-if="comp.component">
                <component
                  :is="comp.component"
                  v-bind="(example.exampleProps || {}) as any"
                  :model-value="needsVModel(comp.name) && getStateKey(comp.name, example.title)
                    ? componentStates[getStateKey(comp.name, example.title)]
                    : undefined"
                  @update:model-value="(value: any) => {
                    const key = getStateKey(comp.name, example.title);
                    if (key && needsVModel(comp.name)) {
                      componentStates[key] = value;
                    }
                  }"
                >
                  <template v-if="example.title === 'Interactive Link Card'">
                    Click to visit Vue.js official website and explore the framework documentation.
                  </template>
                </component>

                <!-- Show current value for v-model components -->
                <div
                  v-if="needsVModel(comp.name) && getStateKey(comp.name, example.title)"
                  class="mt-3 p-2 bg-base-200 rounded text-sm font-mono"
                >
                  <span class="text-neutral/60">Current value:</span>
                  <span class="text-primary ml-2">
                    {{ JSON.stringify(componentStates[getStateKey(comp.name, example.title)]) }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Code Example -->
            <pre
              class="bg-base-200 text-mainText rounded-lg p-4
              text-sm overflow-x-auto border border-base-300"
            ><code>{{
              example.code
            }}</code></pre>
          </div>
        </div>

        <!-- Props Table -->
        <div class="mt-8">
          <h3 class="font-medium mb-4 text-lg">
            Props
          </h3>
          <div class="overflow-x-auto">
            <table class="min-w-full text-left text-sm border border-base-300 rounded-lg">
              <thead class="bg-base-200 text-mainText">
                <tr>
                  <th class="py-3 px-4 font-medium border-b border-base-300">
                    Prop
                  </th>
                  <th class="py-3 px-4 font-medium border-b border-base-300">
                    Type
                  </th>
                  <th class="py-3 px-4 font-medium border-b border-base-300">
                    Default
                  </th>
                  <th class="py-3 px-4 font-medium border-b border-base-300">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="prop in comp.props"
                  :key="prop.name"
                  class="border-b border-base-300 last:border-b-0"
                >
                  <td class="py-3 px-4 font-mono text-primary">
                    {{ prop.name }}
                  </td>
                  <td class="py-3 px-4 font-mono text-sm text-secondaryText">
                    {{ prop.type }}
                  </td>
                  <td class="py-3 px-4 font-mono text-sm">
                    {{ prop.default }}
                  </td>
                  <td class="py-3 px-4 text-secondaryText">
                    {{ prop.description }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>

    <!-- Scroll to Top Button -->
    <Transition name="fade">
      <button
        v-if="showScrollToTop"
        class="fixed bottom-6 right-6 z-50 p-3 bg-primary text-white rounded-full
        shadow-lg hover:bg-primary-dark transition-all duration-300
        hover:scale-110 active:scale-95 focus:outline-none focus:ring-2
        focus:ring-primary focus:ring-offset-2"
        title="Scroll to top"
        @click="scrollToTop"
      >
        <VIcon
          icon="mdi:chevron-up"
          :size="24"
        />
      </button>
    </Transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>

