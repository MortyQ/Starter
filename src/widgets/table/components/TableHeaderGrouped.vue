<script setup lang="ts">
import type { Column, HeaderCell } from "../types";
import TableHeader from "./TableHeader.vue";
import TableHeaderGroup from "./TableHeaderGroup.vue";

interface Props {
  headerLevels: HeaderCell[][]
  // eslint-disable-next-line no-unused-vars
  getColumnClasses: (_column: Column) => string[]
  // eslint-disable-next-line no-unused-vars
  getFixedStyles: (_column: Column) => Record<string, string>
  // eslint-disable-next-line no-unused-vars
  getGroupWidth: (_column: Column) => number
  // eslint-disable-next-line no-unused-vars
  getGroupFixedStyles: (_column: Column) => Record<string, string>
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
  <!-- Grouped headers - multi-level support -->
  <div
    v-for="(level, levelIndex) in headerLevels"
    :key="`header-level-${levelIndex}`"
    class="table-header-row"
    :class="`table-header-row-level-${levelIndex}`"
  >
    <!-- Render cells in this level -->
    <template
      v-for="cell in level"
      :key="cell.key"
    >
      <!-- Group header (has children) -->
      <TableHeaderGroup
        v-if="cell.isGroup"
        :cell="cell"
        :group-width="getGroupWidth(cell.column)"
        :class="getColumnClasses(cell.column)"
        :style="{
          gridColumn: `span ${cell.colspan}`,
          gridRow: cell.rowspan > 1 ? `span ${cell.rowspan}` : undefined,
          ...getGroupFixedStyles(cell.column),
        }"
      />

      <!-- Leaf header (no children) - with resize handle -->
      <TableHeader
        v-else
        :label="cell.label"
        :align="cell.column.align"
        :column-key="cell.column.key"
        :class="[
          getColumnClasses(cell.column),
          {
            'table-header-cell--grouped': levelIndex > 0,
            'table-header-cell--rowspan': cell.rowspan > 1
          }
        ]"
        :style="{
          gridRow: cell.rowspan > 1 ? `span ${cell.rowspan}` : undefined,
          ...getFixedStyles(cell.column),
        }"
        @resize-start="handleResizeStart"
        @resize-dblclick="handleResizeDblClick"
      />
    </template>
  </div>
</template>

<style scoped>
/* Styles defined in assets/styles/_header.scss */
</style>

