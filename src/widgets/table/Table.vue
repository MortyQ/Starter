<script setup lang="ts">
import { ref, computed } from "vue";

import TableCell from "./components/TableCell.vue";
import TableHeader from "./components/TableHeader.vue";
import TablePagination from "./components/TablePagination.vue";
import TableRow from "./components/TableRow.vue";
import { useColumnResize } from "./composables/useColumnResize";
import { useExpandableTable } from "./composables/useExpandableTable";
import { useFixedColumns } from "./composables/useFixedColumns";
import { useVirtualTable } from "./composables/useVirtualTable";
import type { Column, ExpandableRow } from "./types/index";


import VIcon from "@/shared/ui/common/VIcon.vue";
import VLoader from "@/shared/ui/common/VLoader.vue";
import { TableEmits, TableProps } from "@/widgets/table/types/props";


const props = withDefaults(defineProps<TableProps>(), {
  loading: false,
  virtualized: true,
  rowHeight: 50,
});

const emit = defineEmits<TableEmits>();

// Total row visibility - simply check for presence
const shouldShowTotal = computed(() => props.totalRow !== undefined);

// Column resizing logic
const columnsRef = computed(() => props.columns);
const {
  gridTemplateColumns,
  startResize,
  autoFitColumn,
  isResizing,
  columnWidths,
} = useColumnResize(columnsRef);

// Fixed columns logic (with dynamic widths)
const {
  getFixedStyles,
  isFixed,
  isLastLeftFixed,
  isFirstRightFixed,
} = useFixedColumns(columnsRef, columnWidths);


// Table height - simple calculation based on prop
const tableHeight = computed(() => {
  if (!props.height) {
    return "600px"; // Default height
  }

  // If number - add 'px'
  if (typeof props.height === "number") {
    return `${props.height}px`;
  }

  // If string - use as is (supports: '100%', '50vh', 'calc(...)')
  return props.height;
});

// Automatic expandable detection by presence of children
const isExpandable = computed(() =>
  props.data.some(row => row.children && row.children.length > 0),
);

// Expandable logic (if there are children)
const dataRef = computed(() => props.data);
const expandableLogic = isExpandable.value
  ? useExpandableTable(dataRef)
  : null;

// Data for rendering (with flatten if expandable, otherwise regular)
const displayData = computed(() => {
  return expandableLogic ? expandableLogic.flattenedData.value : props.data;
});

// Virtualization with dynamic height for expand
const scrollContainerRef = ref<HTMLElement | null>(null);
const {
  virtualItems,
  totalSize,
} = useVirtualTable(
  scrollContainerRef,
  displayData,
  {
    estimateSize: props.rowHeight,
    overscan: 5,
    measureElement: isExpandable.value, // Dynamic height only for expandable
  },
);

const gridStyles = computed(() => ({
  display: "grid",
  gridTemplateColumns: gridTemplateColumns.value,
}));

// Handle row click
const onRowClick = (row: Record<string, unknown>) => {
  emit("row-click", row);
};

const handleToggleRow = (id: string | number) => {
  if (expandableLogic) {
    expandableLogic.toggleRow(id);
  }
};

// Check if row is expandable
const isRowExpandable = (row: ExpandableRow): boolean => {
  if (!expandableLogic) return false;
  return expandableLogic.isExpandable(row);
};

// Get row depth (for indent)
const getRowDepth = (row: Record<string, unknown>): number => {
  return (row.depth as number) || 0;
};

// Check if row is expanded
const isRowExpanded = (row: Record<string, unknown>): boolean => {
  return (row.isExpanded as boolean) || false;
};

// Check if row has children
const hasRowChildren = (row: Record<string, unknown>): boolean => {
  return (row.hasChildren as boolean) || false;
};

// Computed for final rows (considering virtualization)
const rowsToRender = computed(() => {
  if (!props.virtualized || virtualItems.value.length === 0) {
    // Regular rendering without virtualization
    return displayData.value.map((row, index) => ({
      row,
      index,
      key: (row.id as string) || index,
      isVirtual: false,
    }));
  }

  // Virtualized rendering
  return virtualItems.value.map((virtualRow) => ({
    row: displayData.value[virtualRow.index],
    index: virtualRow.index,
    key: virtualRow.index,
    isVirtual: true,
    virtualRow,
  }));
});

// Styles for virtualized rows
const getRowStyles = (item: { isVirtual: boolean }) => {
  if (!item.isVirtual) return {};
  return {
    height: `${props.rowHeight}px`,
    minHeight: `${props.rowHeight}px`,
  };
};

// Classes for column (fixed with shadow effects)
const getColumnClasses = (column: Column) => {
  const classes: string[] = [];

  if (isFixed(column)) {
    classes.push("table-fixed-column");

    // Add direction class for fixed
    if (column.fixed === "left") {
      classes.push("table-fixed-left");
    } else if (column.fixed === "right") {
      classes.push("table-fixed-right");
    }

    // Shadow for last left column
    if (isLastLeftFixed(column.key)) {
      classes.push("table-fixed-left-last");
    }

    // Shadow for first right column
    if (isFirstRightFixed(column.key)) {
      classes.push("table-fixed-right-first");
    }
  }

  return classes;
};
</script>

<template>
  <div class="table-wrapper">
    <!-- Loading state -->
    <div
      v-if="loading"
      class="table-loading"
    >
      <VLoader />
    </div>

    <!-- Table -->
    <template v-else>
      <!-- Scroll container -->
      <div
        ref="scrollContainerRef"
        class="table-scroll-container table-scrollbar-styled"
        :style="{ height: tableHeight }"
      >
        <!-- Grid container -->
        <div
          class="table-grid"
          :class="{ 'is-resizing': isResizing }"
          :style="gridStyles"
        >
          <!-- Header (always visible, sticky) -->
          <div class="table-header-row">
            <TableHeader
              v-for="column in columns"
              :key="column.key"
              :label="column.label"
              :align="column.align"
              :column-key="column.key"
              :class="getColumnClasses(column)"
              :style="getFixedStyles(column)"
              @resize-start="startResize"
              @resize-dblclick="autoFitColumn"
            />
          </div>

          <!-- Empty state -->
          <div
            v-if="displayData.length === 0"
            class="table-empty"
          >
            No data to display
          </div>

          <!-- Virtualization: spacer before -->
          <div
            v-if="props.virtualized && virtualItems.length > 0 && virtualItems[0]"
            :style="{ height: `${virtualItems[0].start}px` }"
            class="table-virtual-spacer"
          />

          <!-- Table rows (universal rendering) -->
          <TableRow
            v-for="item in rowsToRender"
            :key="item.key"
            :data="item.row"
            :columns="columns"
            :depth="getRowDepth(item.row)"
            :is-expanded="isRowExpanded(item.row)"
            :has-children="hasRowChildren(item.row)"
            :style="getRowStyles(item)"
            @click="onRowClick(item.row)"
          >
            <!-- Data cells -->
            <TableCell
              v-for="(column, colIndex) in columns"
              :key="`${item.key}-${column.key}`"
              :value="item.row[column.key]"
              :align="column.align"
              :depth="getRowDepth(item.row)"
              :class="getColumnClasses(column)"
              :style="getFixedStyles(column)"
            >
              <div class="table-cell-content">
                <!-- Expand button only for first column -->
                <button
                  v-if="colIndex === 0 && isExpandable &&
                    isRowExpandable(item.row as ExpandableRow)"
                  class="table-cell-expand-btn"
                  @click.stop="handleToggleRow(item.row.id as string | number)"
                >
                  <VIcon
                    :icon="isRowExpanded(item.row)
                      ? 'mdi:chevron-down'
                      : 'mdi:chevron-right'"
                    :size="18"
                  />
                </button>

                <!-- Column content (universal for all) -->
                <div
                  class="table-cell-text"
                  :class="{ 'table-cell-text--truncate': !column.interactive }"
                >
                  <slot
                    :name="`cell-${column.key}`"
                    :value="item.row[column.key]"
                    :row="item.row"
                    :column="column"
                    :index="item.index"
                    :depth="getRowDepth(item.row)"
                  >
                    <!-- Default rendering -->
                    <span :title="!column.interactive ? String(item.row[column.key]) : undefined">
                      {{ item.row[column.key] }}
                    </span>
                  </slot>
                </div>
              </div>
            </TableCell>
          </TableRow>

          <!-- Virtualization: spacer after -->
          <div
            v-if="props.virtualized && virtualItems.length > 0 &&
              virtualItems[virtualItems.length - 1]"
            :style="{
              height: `${totalSize - virtualItems[virtualItems.length - 1].end}px`
            }"
            class="table-virtual-spacer"
          />

          <!-- Total Row (sticky bottom inside grid) -->
          <template v-if="shouldShowTotal && totalRow">
            <TableCell
              v-for="(column, colIndex) in columns"
              :key="`total-${column.key}`"
              :value="totalRow[column.key]"
              :align="column.align"
              :depth="0"
              class="table-total-cell"
              :class="getColumnClasses(column)"
              :style="getFixedStyles(column)"
            >
              <div class="table-total-content">
                <!-- Spacer instead of expand button for first column -->
                <div
                  v-if="colIndex === 0 && isExpandable"
                  class="table-total-spacer"
                />

                <!-- Total cell content -->
                <div
                  class="table-total-text"
                  :class="{ 'table-total-text--truncate': !column.interactive }"
                >
                  <slot
                    :name="`total-cell-${column.key}`"
                    :value="totalRow[column.key]"
                    :column="column"
                  >
                    <!-- Default rendering -->
                    <span
                      :title="!column.interactive ? String(totalRow[column.key]) : undefined"
                    >
                      {{ totalRow[column.key] }}
                    </span>
                  </slot>
                </div>
              </div>
            </TableCell>
          </template>
        </div>
      </div>

      <!-- Pagination -->
      <TablePagination />
    </template>
  </div>
</template>

<style lang="scss">
// Import modular table styles with @use (modern Sass)
@use './assets/styles/table.scss';
</style>
