<script setup lang="ts">
interface Props {
  label: string
  align?: "left" | "center" | "right"
}

withDefaults(defineProps<Props>(), {
  align: "left",
});
</script>

<template>
  <div
    class="table-header-cell px-4 py-3 bg-cardBg
    border-b border-cardBorder font-semibold text-mainText"
    :class="{
      'text-left': align === 'left',
      'text-center': align === 'center',
      'text-right': align === 'right'
    }"
  >
    {{ label }}
  </div>
</template>

<style scoped>
.table-header-cell {
  position: sticky;
  top: 0;
  z-index: 10;
}
</style>
