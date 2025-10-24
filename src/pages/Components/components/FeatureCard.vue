<script lang="ts" setup>
import VCard from "@/shared/ui/common/VCard.vue";

interface Props {
  title: string;
  description: string;
  icon: string;
}

defineProps<Props>();
</script>

<template>
  <VCard
    class="cursor-pointer"
    variant="elevated"
  >
    <div class="text-center">
      <div class="text-4xl mb-4">
        {{ icon }}
      </div>
      <h3 class="text-xl font-semibold mb-2 text-primary">
        {{ title }}
      </h3>
      <p class="text-secondary">
        {{ description }}
      </p>
    </div>
  </VCard>
</template>
