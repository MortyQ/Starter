<script setup lang="ts">
import { RouterView } from "vue-router";

import ThemeToggle from "@/features/theme/components/ThemeToggle.vue";
import TopBar from "@/widgets/Navigation/TopBar.vue";

</script>

<template>
  <div
    id="app"
    class="flex flex-col min-h-screen bg-base-100 text-neutral"
  >
    <!-- Navigation Header -->
    <header class="bg-base-200 shadow-sm border-b border-base-300 flex-shrink-0">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-8">
            <h1 class="text-xl font-semibold text-primary">
              Vue 3 Starter
            </h1>
            <TopBar />
          </div>
          <!-- Theme Toggle -->
          <ThemeToggle />
        </div>
      </nav>
    </header>

    <!-- Main Content -->
    <main class="flex-1 w-full flex flex-col">
      <div class="max-w-7xl mx-auto w-full flex-1 py-4 px-2 sm:px-4 lg:px-6 flex flex-col">
        <!-- RouterView wrapper ensures all pages get full height -->
        <RouterView v-slot="{ Component }">
          <component
            :is="Component"
            class="flex-1"
          />
        </RouterView>
      </div>
    </main>
  </div>
</template>


