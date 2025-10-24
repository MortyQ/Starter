<script lang="ts" setup>
import { ref } from "vue";


import FeatureCard from "@/pages/Components/components/FeatureCard.vue";
import type { Feature } from "@/shared/types";
import VButton from "@/shared/ui/common/VButton.vue";
import VCard from "@/shared/ui/common/VCard.vue";

// Reactive state
const count = ref(0);

// Feature data
const features: Feature[] = [
  {
    title: "Vue 3 + TypeScript",
    description: "Latest Vue 3 with Composition API and TypeScript support",
    icon: "⚡",
  },
  {
    title: "Tailwind CSS",
    description: "Utility-first CSS framework with custom theme system",
    icon: "🎨",
  },
  {
    title: "ESLint + Prettier",
    description: "Code quality and formatting tools with modern best practices",
    icon: "🔧",
  },
  {
    title: "Vite Build Tool",
    description: "Lightning fast development server and optimized builds",
    icon: "⚡",
  },
  {
    title: "Vue Router",
    description: "Official router with lazy loading and navigation guards",
    icon: "🗺️",
  },
  {
    title: "Pinia State Management",
    description: "Intuitive, type safe, and flexible store for Vue",
    icon: "🗃️",
  },
];

// Actions
function increment() {
  count.value++;
}

function decrement() {
  count.value--;
}

function reset() {
  count.value = 0;
}
</script>

<template>
  <div>
    <div class="space-y-8">
      <!-- Hero Section -->
      <section class="text-center py-12">
        <h1 class="text-4xl md:text-6xl font-bold text-primary mb-4">
          Vue 3 Starter Template
        </h1>
        <p class="text-xl text-secondary max-w-2xl mx-auto text-balance">
          A modern, well-architected starter template with TypeScript,
          Tailwind CSS, ESLint, and Prettier - ready for
          production.
        </p>
      </section>

      <!-- Features Grid -->
      <section class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <FeatureCard
          v-for="feature in features"
          :key="feature.title"
          :description="feature.description"
          :icon="feature.icon"
          :title="feature.title"
        />
      </section>

      <!-- Counter Demo -->
      <VCard size="sm">
        <h2 class="text-2xl font-semibold mb-4">
          Interactive Demo
        </h2>
        <div class="space-y-4">
          <p class="text-lg">
            Count:
            <span class="font-mono text-primary">{{ count }}</span>
          </p>
          <div class="flex gap-2 justify-center">
            <VButton
              icon="mdi:minus"
              variant="negative"
              @click="decrement"
            />
            <VButton
              icon="mdi:plus"
              variant="positive"
              @click="increment"
            />
            <VButton
              text="Reset"
              @click="reset"
            />
          </div>
        </div>
      </VCard>
    </div>
  </div>
</template>
