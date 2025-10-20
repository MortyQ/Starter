<script lang="ts" setup>
import { ref, onMounted } from "vue";

import { componentsList } from "@/shared/utils/componentsList";

// Active section tracking for navigation
const activeSection = ref("");

// Scroll to anchor
const scrollToSection = (anchor: string) => {
  const element = document.getElementById(anchor);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

// Track active section on scroll
const handleScroll = () => {
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
              <VueFeather
                size="20"
                type="link"
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

              <!-- Default component rendering -->
              <component
                :is="comp.component"
                v-else
                v-bind="(example.exampleProps || {}) as any"
              >
                <template v-if="example.title === 'Interactive Link Card'">
                  Click to visit Vue.js official website and explore the framework documentation.
                </template>
              </component>
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
  </div>
</template>
