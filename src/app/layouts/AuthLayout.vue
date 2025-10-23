<script setup lang="ts">
import { RouterView } from "vue-router";

import ThemeToggle from "@/features/theme/components/ThemeToggle.vue";
</script>

<template>
  <div class="min-h-screen bg-base-100 text-neutral flex items-center justify-center">
    <!-- Auth Layout - Centered content without navigation -->
    <div class="w-full max-w-md">
      <!-- Theme Toggle in corner -->
      <div class="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <!-- Auth Content -->
      <RouterView />
    </div>
  </div>
</template>
