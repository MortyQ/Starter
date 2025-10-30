<script setup lang="ts">
import { RouterView } from "vue-router";

import Header from "@/widgets/navigation/Header.vue";
</script>

<template>
  <div
    id="app"
    class="flex flex-col min-h-screen bg-base-100 text-neutral"
  >
    <!-- Navigation Header -->
    <Header />
    <!-- Main Content -->
    <main class="flex-1 w-full flex flex-col">
      <div class="w-full flex-1 py-4 px-2 sm:px-4 lg:px-6 flex flex-col">
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


