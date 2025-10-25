<script setup lang="ts">
import { computed } from "vue";

interface Props {
  value: unknown
  align?: "left" | "center" | "right"
  depth?: number
  isFirstColumn?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  align: "left",
  depth: 0,
  isFirstColumn: false,
});

// Обчислюємо padding для indent вкладених рядків
const computedPaddingLeft = computed(() => {
  if (props.isFirstColumn && props.depth > 0) {
    return `${props.depth * 24 + 16}px`;
  }
  return undefined;
});
</script>

<template>
  <div
    class="table-cell px-4 py-3 border-b border-cardBorder text-mainText"
    :class="{
      'text-left': align === 'left',
      'text-center': align === 'center',
      'text-right': align === 'right'
    }"
    :style="{ paddingLeft: computedPaddingLeft }"
  >
    <slot>
      {{ value }}
    </slot>
  </div>
</template>

<style scoped>

</style>
