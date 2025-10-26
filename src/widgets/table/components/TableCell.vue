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

// Calculate padding for indent of nested rows
const computedPaddingLeft = computed(() => {
  if (props.isFirstColumn && props.depth > 0) {
    return `${props.depth * 24 + 16}px`;
  }
  return undefined;
});
</script>

<template>
  <div
    class="table-cell"
    :class="{
      'table-cell--left': align === 'left',
      'table-cell--center': align === 'center',
      'table-cell--right': align === 'right',
      'table-cell--indented': isFirstColumn && depth > 0
    }"
    :style="{ paddingLeft: computedPaddingLeft }"
  >
    <slot>
      <div
        class="table-cell-text table-cell-text--truncate"
        :title="String(value)"
      >
        {{ value }}
      </div>
    </slot>
  </div>
</template>

<style scoped>
/* Styles defined in assets/styles/_cell.scss */
</style>
