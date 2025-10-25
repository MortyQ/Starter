<script setup lang="ts">
import VButton from "@/shared/ui/common/VButton.vue";

const topbarMenu = [
  { name: "Home", to: "/" },
  { name: "About", to: "/about" },
  { name: "Components", to: "/components" },
  { name: "UI Gallery", to: "/ui-gallery" },
  { name: "Table", to: "/table" },
];
</script>

<template>
  <div class="hidden md:block">
    <div class="flex items-baseline space-x-4">
      <VButton
        v-for="menu in topbarMenu"
        :key="menu.name"
        class="link"
        :text="menu.name"
        :to="menu.to"
        variant="link"
      />
    </div>
  </div>
</template>

