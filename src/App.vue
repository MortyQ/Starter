<script lang="ts" setup>
import { RouterView } from "vue-router";

import ThemeToggle from "@/components/ThemeToggle.vue";
import VButton from "@/components/common/VButton.vue";
</script>

<template>
  <div
    id="app"
    class="min-h-screen bg-base-100 text-neutral"
  >
    <!-- Navigation Header -->
    <header class="bg-base-200 shadow-sm border-b border-base-300">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-8">
            <h1 class="text-xl font-semibold text-primary">
              Vue 3 Starter
            </h1>

            <div class="hidden md:block">
              <div class="flex items-baseline space-x-4">
                <VButton
                  class="px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  to="/"
                  variant="link"
                >
                  Home
                </VButton>
                <VButton
                  class="px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  to="/about"
                  variant="link"
                >
                  About
                </VButton>
                <VButton
                  class="px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  to="/components"
                  variant="link"
                >
                  Components
                </VButton>
                <VButton
                  class="px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  to="/modals"
                  variant="link"
                >
                  Modals
                </VButton>
              </div>
            </div>
          </div>

          <!-- Theme Toggle -->
          <ThemeToggle />
        </div>
      </nav>
    </header>
    <!-- Main Content -->
    <main class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <RouterView />
    </main>
  </div>
</template>
