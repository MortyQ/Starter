<script setup lang="ts">
import type { Column } from "../types";
import TableHeader from "./TableHeader.vue";

interface Props {
  columns: Column[]
  // eslint-disable-next-line no-unused-vars
  getColumnClasses: (_column: Column) => string[]
  // eslint-disable-next-line no-unused-vars
  getFixedStyles: (_column: Column) => Record<string, string>
}

defineProps<Props>();

const emit = defineEmits<{
  "resize-start": [columnKey: string, event: MouseEvent]
  "resize-dblclick": [columnKey: string]
}>();

const handleResizeStart = (columnKey: string, event: MouseEvent) => {
  emit("resize-start", columnKey, event);
};

const handleResizeDblClick = (columnKey: string) => {
  emit("resize-dblclick", columnKey);
};
</script>

<template>
  <!-- Simple header - single level (original implementation) -->
  <div class="table-header-row">
    <TableHeader
      v-for="column in columns"
      :key="column.key"
      :label="column.label"
      :align="column.align"
      :column-key="column.key"
      :class="getColumnClasses(column)"
      :style="getFixedStyles(column)"
      @resize-start="handleResizeStart"
      @resize-dblclick="handleResizeDblClick"
    />
  </div>
</template>

<style scoped>
/* Styles defined in assets/styles/_header.scss */
</style>

