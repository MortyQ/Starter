<script setup lang="ts">
import type { HeaderCell } from "../types";

interface Props {
  cell: HeaderCell
  groupWidth?: number
}

defineProps<Props>();
</script>

<template>
  <div
    class="table-header-group"
    :class="{
      'table-header-group--left': cell.column.align === 'left',
      'table-header-group--center': cell.column.align === 'center',
      'table-header-group--right': cell.column.align === 'right',
    }"
  >
    <span class="table-header-group-label">{{ cell.label }}</span>
  </div>
</template>

<style scoped>
/* Styles defined in assets/styles/_header.scss */
</style>
