<script setup lang="ts">

import ThemeToggle from "../../features/theme/components/ThemeToggle.vue";

import TopBar from "@/widgets/navigation/TopBar.vue";
</script>

<template>
  <header class="bg-base-200 shadow-sm border-b border-base-300 flex-shrink-0">
    <nav class="px-4 sm:px-6 lg:px-8">
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
</template>

<style scoped>

</style>
