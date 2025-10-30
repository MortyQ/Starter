<script setup lang="ts">
import { ref, computed, watch, onUnmounted, type Component } from "vue";

import TableCell from "./components/TableCell.vue";
import TableCheckboxCell from "./components/TableCheckboxCell.vue";
import TableHeaderCheckbox from "./components/TableHeaderCheckbox.vue";
import TableHeaderGrouped from "./components/TableHeaderGrouped.vue";
import TableHeaderSimple from "./components/TableHeaderSimple.vue";
import TablePagination from "./components/TablePagination.vue";
import TableRow from "./components/TableRow.vue";
import { useColumnResize } from "./composables/useColumnResize";
import { useExpandableTable } from "./composables/useExpandableTable";
import { useFixedColumns } from "./composables/useFixedColumns";
import { useGroupedHeaders } from "./composables/useGroupedHeaders";
import { useTableSelection } from "./composables/useTableSelection";
import { useVirtualTable } from "./composables/useVirtualTable";
import type { Column, ExpandableRow, HeaderCell } from "./types/index";

import VIcon from "@/shared/ui/common/VIcon.vue";
import VLoader from "@/shared/ui/common/VLoader.vue";
import { TableEmits, TableProps } from "@/widgets/table/types/props";

const props = withDefaults(defineProps<TableProps>(), {
  loading: false,
  virtualized: true,
  rowHeight: 50,
  expandMode: "auto",
});

const emit = defineEmits<TableEmits>();


// Total row visibility - simply check for presence
const shouldShowTotal = computed(() => props.totalRow !== undefined);

// Column resizing logic - needs to know about flat columns first
const columnsRef = computed(() => props.columns);

// Initialize columnWidths for grouped headers detection
const columnWidths = ref<Map<string, number>>(new Map());

// Grouped headers logic (AG-Grid style with children)
const {
  hasGroups,
  flatColumns,
  headerLevels,
  getGroupWidth,
  isGroupFixed,
} = useGroupedHeaders(columnsRef, columnWidths);

// Columns for rendering data rows and fixed logic
// OPTIMIZATION: Use flatColumns only when groups exist
const columnsForData = computed(() => {
  return hasGroups.value ? flatColumns.value : props.columns;
});

// Column resize works with leaf columns (flatColumns when groups exist)
const columnsForResize = computed(() => columnsForData.value);
const {
  gridTemplateColumns,
  getGridTemplateWithCheckbox,
  startResize,
  autoFitColumn,
  isResizing,
  columnWidths: resizeColumnWidths,
} = useColumnResize(columnsForResize);

// Update columnWidths ref to match resizeColumnWidths
watch(resizeColumnWidths, (newWidths) => {
  columnWidths.value = newWidths;
}, { immediate: true });

// Fixed columns logic (with dynamic widths)
// Pass flatColumns when groups exist to work with leaf columns only
const columnsForFixed = computed(() => columnsForData.value);
const {
  getFixedStyles,
  isLastLeftFixed,
  isFirstRightFixed,
} = useFixedColumns(columnsForFixed, columnWidths);


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

// Multi-select logic
const multiSelectConfig = computed(() => props.multiSelect);
const selectedRowsRef = computed({
  get: () => props.selectedRows || [],
  set: (value) => emit("update:selected-rows", value),
});

const selection = useTableSelection({
  config: multiSelectConfig,
  flattenedData: displayData as any, // displayData includes FlattenedRow properties when expanded
  selectedRows: selectedRowsRef,
  onSelectionChange: (selected) => {
    emit("update:selected-rows", selected);
  },
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
    overscan: 2, // Reduced from 5 for better performance
    // PERFORMANCE: Disable measureElement to prevent memory leaks
    // Using fixed height improves performance dramatically for large datasets
    // Trade-off: scroll bar may be slightly inaccurate with expanded rows
    measureElement: false,
  },
);

const gridStyles = computed(() => {
  const columns = selection.isEnabled.value
    ? getGridTemplateWithCheckbox(50) // 50px for checkbox column
    : gridTemplateColumns.value;

  return {
    display: "grid",
    gridTemplateColumns: columns,
    gridAutoRows: "auto", // All rows auto-sized (headers get height from CSS)
  };
});

// Handle row click
const onRowClick = (row: Record<string, unknown>) => {
  emit("row-click", row);
};

const handleToggleRow = (id: string | number, row: ExpandableRow, column: Column) => {
  if (!expandableLogic) return;

  if (props.expandMode === "controlled") {
    // Controlled mode: emit event with callback, parent controls expansion
    emit("expand-click", {
      row,
      column,
      callback: () => expandableLogic.toggleRow(id),
      expanded: isRowExpanded(row as Record<string, unknown>),
    });
  } else {
    // Auto mode (default): toggle immediately, emit for notification
    expandableLogic.toggleRow(id);
    emit("expand-click", {
      row,
      column,
      callback: () => {}, // Already toggled, callback is no-op
      expanded: !isRowExpanded(row as Record<string, unknown>), // New state after toggle
    });
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
  // If virtualization is disabled, render all data
  if (!props.virtualized) {
    return displayData.value.map((row, index) => ({
      row,
      index,
      key: (row.id as string) || index,
      isVirtual: false,
    }));
  }

  // If scroll container is not mounted yet, return empty array to prevent rendering all data
  // This is CRITICAL - without this check, all data will be rendered on first load!
  if (!scrollContainerRef.value) {
    return [];
  }

  // If virtualizer hasn't calculated items yet, wait for it
  if (virtualItems.value.length === 0) {
    return [];
  }

  // Virtualized rendering - only render visible items
  return virtualItems.value.map((virtualRow) => {
    const row = displayData.value[virtualRow.index];
    return {
      row,
      index: virtualRow.index,
      // CRITICAL: Use row.id as key, not index! Index causes memory leaks
      // because Vue reuses components for different data at same index
      key: (row?.id as string | number) || `row-${virtualRow.index}`,
      isVirtual: true,
      virtualRow,
    };
  });
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
// Supports both simple columns and groups
const getColumnClasses = (column: Column) => {
  const classes: string[] = [];

  // Check fixed: either direct column.fixed or group fixed (all children fixed)
  const fixedDirection = column.fixed || (hasGroups.value ? isGroupFixed(column) : null);

  if (fixedDirection) {
    classes.push("table-fixed-column");

    // Add direction class for fixed
    if (fixedDirection === "left") {
      classes.push("table-fixed-left");
    } else if (fixedDirection === "right") {
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

// Get fixed styles for group headers
const getGroupFixedStyles = (column: Column) => {
  const fixed = isGroupFixed(column);
  if (!fixed) return {};

  // For groups, we need to calculate offset based on leaf columns
  return getFixedStyles(column);
};

// Computed for header component with proper typing
const headerComponent = computed<Component>(() => {
  return hasGroups.value ? TableHeaderGrouped : TableHeaderSimple;
});

// Computed for header columns data
const headerColumnsData = computed<Column[] | HeaderCell[][]>(() => {
  return hasGroups.value ? headerLevels.value : columnsForData.value;
});

// CRITICAL: Cleanup on unmount to prevent memory leaks
onUnmounted(() => {
  // Clear expanded rows to free memory
  if (expandableLogic) {
    expandableLogic.collapseAll();
  }
  // Clear scroll container ref
  scrollContainerRef.value = null;
});
</script>

<template>
  <div
    class="table-wrapper"
    :class="{ 'table-wrapper--with-toolbar': $slots.toolbar }"
  >
    <!-- Toolbar slot (optional) -->
    <div
      v-if="$slots.toolbar"
      class="table-toolbar-slot"
    >
      <slot name="toolbar" />
    </div>

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
          <component
            :is="headerComponent"
            :columns="headerColumnsData"
            :get-column-classes="getColumnClasses"
            :get-fixed-styles="getFixedStyles"
            :get-group-width="getGroupWidth"
            :get-group-fixed-styles="getGroupFixedStyles"
            @resize-start="startResize"
            @resize-dblclick="autoFitColumn"
          >
            <!-- Checkbox header slot - always render when multi-select enabled -->
            <template
              v-if="selection.isEnabled.value"
              #checkbox-header
            >
              <TableHeaderCheckbox
                v-if="multiSelectConfig?.showHeaderCheckbox !== false"
                :state="selection.getHeaderCheckboxState()"
                @toggle="selection.toggleAllRows"
              />
              <!-- Empty header cell when checkbox is hidden -->
              <div
                v-else
                class="table-header-checkbox-cell table-header-checkbox-cell--empty"
              />
            </template>
          </component>

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
            :columns="columnsForData"
            :depth="getRowDepth(item.row)"
            :is-expanded="isRowExpanded(item.row)"
            :has-children="hasRowChildren(item.row)"
            :style="getRowStyles(item)"
            @click="onRowClick(item.row)"
          >
            <!-- Checkbox column (separate) -->
            <TableCheckboxCell
              v-if="selection.isEnabled.value"
              :checked="selection.isRowSelected(item.row.id as string | number)"
              :disabled="!selection.isRowSelectable(item.row as ExpandableRow)"
              :indeterminate="selection.isDependentMode.value &&
                hasRowChildren(item.row) &&
                selection.getParentCheckboxState(item.row as any) === 'indeterminate'"
              @toggle="selection.toggleRow(item.row as any)"
            />

            <!-- Data cells -->
            <TableCell
              v-for="(column, colIndex) in columnsForData"
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
                  @click.stop="handleToggleRow(item.row.id as string | number, item.row, column)"
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
            <!-- Empty checkbox cell for total row -->
            <div
              v-if="selection.isEnabled.value"
              class="table-total-cell table-checkbox-cell"
            />
            <TableCell
              v-for="(column, colIndex) in columnsForData"
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
    </template>

    <!-- Pagination -->
    <TablePagination />
  </div>
</template>

<style lang="scss">
@use './assets/styles/table.scss';
</style>
