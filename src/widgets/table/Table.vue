<script setup lang="ts">
import { ref, computed } from "vue";

import TableCell from "./components/TableCell.vue";
import TableHeader from "./components/TableHeader.vue";
import TablePagination from "./components/TablePagination.vue";
import TableRow from "./components/TableRow.vue";
import { useColumnResize } from "./composables/useColumnResize";
import { useExpandableTable } from "./composables/useExpandableTable";
import { useVirtualTable } from "./composables/useVirtualTable";
import type { ExpandableRow } from "./types/index";


import VIcon from "@/shared/ui/common/VIcon.vue";
import VLoader from "@/shared/ui/common/VLoader.vue";
import { TableProps } from "@/widgets/table/types/props";


const props = withDefaults(defineProps<TableProps>(), {
  loading: false,
  virtualized: true,
  rowHeight: 50,
});

const emit = defineEmits<{
  "row-click": [row: Record<string, unknown>]
}>();

// Column resizing logic
const columnsRef = computed(() => props.columns);
const {
  gridTemplateColumns,
  startResize,
  autoFitColumn,
  isResizing,
} = useColumnResize(columnsRef);

// Event handler для кліку по рядку
const handleRowClick = (row: Record<string, unknown>) => row;

// Автоматичне визначення expandable по наявності children
const isExpandable = computed(() =>
  props.data.some(row => row.children && row.children.length > 0),
);

// Expandable логіка (якщо є children)
const dataRef = computed(() => props.data);
const expandableLogic = isExpandable.value
  ? useExpandableTable(dataRef)
  : null;

// Дані для рендерингу (з flatten якщо expandable, інакше звичайні)
const displayData = computed(() => {
  return expandableLogic ? expandableLogic.flattenedData.value : props.data;
});

// Віртуалізація з динамічною висотою для expand
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
    measureElement: isExpandable.value, // Динамічна висота тільки для expandable
  },
);

const gridStyles = computed(() => ({
  display: "grid",
  gridTemplateColumns: gridTemplateColumns.value,
}));

// Обробка кліку по рядку
const onRowClick = (row: Record<string, unknown>) => {
  const result = handleRowClick(row);
  emit("row-click", result);
};

// Toggle expand для рядка
const handleToggleRow = (id: string | number) => {
  if (expandableLogic) {
    expandableLogic.toggleRow(id);
  }
};

// Перевірка чи рядок expandable
const isRowExpandable = (row: ExpandableRow): boolean => {
  if (!expandableLogic) return false;
  return expandableLogic.isExpandable(row);
};

// Отримуємо depth рядка (для indent)
const getRowDepth = (row: Record<string, unknown>): number => {
  return (row.depth as number) || 0;
};

// Перевірка чи рядок розгорнутий
const isRowExpanded = (row: Record<string, unknown>): boolean => {
  return (row.isExpanded as boolean) || false;
};

// Перевірка чи рядок має дочірні елементи
const hasRowChildren = (row: Record<string, unknown>): boolean => {
  return (row.hasChildren as boolean) || false;
};
</script>

<template>
  <div class="table-wrapper">
    <!-- Loading state -->
    <div
      v-if="loading"
      class="flex items-center justify-center py-20"
    >
      <VLoader />
    </div>

    <!-- Таблиця -->
    <template v-else>
      <!-- Скролл контейнер -->
      <div
        ref="scrollContainerRef"
        class="table-scroll-container overflow-auto max-h-[600px]
               border border-cardBorder rounded-lg bg-cardBg"
      >
        <!-- Grid контейнер -->
        <div
          class="table-grid"
          :class="{ 'is-resizing': isResizing }"
          :style="gridStyles"
        >
          <!-- Header (завжди видимий, sticky) -->
          <div class="table-header-row contents">
            <TableHeader
              v-for="column in columns"
              :key="column.key"
              :label="column.label"
              :align="column.align"
              :column-key="column.key"
              @resize-start="startResize"
              @resize-dblclick="autoFitColumn"
            />
          </div>

          <!-- Порожній стан -->
          <div
            v-if="displayData.length === 0"
            class="col-span-full py-12 text-center text-secondaryText"
          >
            Немає даних для відображення
          </div>

          <!-- Віртуалізовані рядки -->
          <template v-else-if="virtualized">
            <!-- Якщо virtualItems ще не ініціалізовані, рендеримо без віртуалізації -->
            <template v-if="virtualItems.length === 0">
              <TableRow
                v-for="(row, index) in displayData"
                :key="(row.id as string) || index"
                :data="row"
                :columns="columns"
                :depth="getRowDepth(row)"
                :is-expanded="isRowExpanded(row)"
                :has-children="hasRowChildren(row)"
                @click="onRowClick(row)"
                @toggle="handleToggleRow(row.id as string | number)"
              >
                <!-- Data cells -->
                <TableCell
                  v-for="(column, colIndex) in columns"
                  :key="`${(row.id as string) || index}-${column.key}`"
                  :value="row[column.key]"
                  :align="column.align"
                  :depth="getRowDepth(row)"
                >
                  <!-- Expand button в першій колонці (якщо expandable) -->
                  <template
                    v-if="colIndex === 0 && isExpandable"
                    #default
                  >
                    <div class="flex items-center gap-2">
                      <button
                        v-if="isRowExpandable(row as ExpandableRow)"
                        class="expand-btn p-1 hover:bg-cardBorder/50 rounded
                               transition-all duration-200 flex-shrink-0"
                        @click.stop="handleToggleRow(row.id as string | number)"
                      >
                        <VIcon
                          :icon="isRowExpanded(row) ? 'mdi:chevron-down' : 'mdi:chevron-right'"
                          :size="18"
                          class="text-secondaryText hover:text-mainText transition-colors"
                        />
                      </button>
                      <span class="flex-1">{{ row[column.key] }}</span>
                    </div>
                  </template>
                </TableCell>
              </TableRow>
            </template>

            <!-- Virtual container з правильною висотою -->
            <div
              v-else
              class="virtual-container contents"
              :style="{ height: `${totalSize}px` }"
            >
              <!-- Spacer before (відступ зверху) -->
              <div
                v-if="virtualItems[0]"
                :style="{ height: `${virtualItems[0].start}px` }"
                class="col-span-full"
              />

              <!-- Virtual rows (тільки видимі рядки) -->
              <template
                v-for="virtualRow in virtualItems"
                :key="virtualRow.index"
              >
                <TableRow
                  :data="displayData[virtualRow.index]"
                  :columns="columns"
                  :depth="getRowDepth(displayData[virtualRow.index])"
                  :is-expanded="isRowExpanded(displayData[virtualRow.index])"
                  :has-children="hasRowChildren(displayData[virtualRow.index])"
                  :style="{
                    height: `${rowHeight}px`,
                    minHeight: `${rowHeight}px`
                  }"
                  @click="onRowClick(displayData[virtualRow.index])"
                  @toggle="handleToggleRow(displayData[virtualRow.index].id as string | number)"
                >
                  <!-- Data cells -->
                  <TableCell
                    v-for="(column, colIndex) in columns"
                    :key="`${virtualRow.index}-${column.key}`"
                    :value="displayData[virtualRow.index][column.key]"
                    :align="column.align"
                    :depth="getRowDepth(displayData[virtualRow.index])"
                  >
                    <!-- Expand button в першій колонці (якщо expandable) -->
                    <template
                      v-if="colIndex === 0 && isExpandable"
                      #default
                    >
                      <div class="flex items-center gap-2">
                        <button
                          v-if="isRowExpandable(displayData[virtualRow.index] as ExpandableRow)"
                          class="expand-btn p-1 hover:bg-cardBorder/50 rounded
                                 transition-all duration-200 flex-shrink-0"
                          @click.stop="handleToggleRow(
                            displayData[virtualRow.index].id as string | number
                          )"
                        >
                          <VIcon
                            :icon="isRowExpanded(displayData[virtualRow.index])
                              ? 'mdi:chevron-down'
                              : 'mdi:chevron-right'"
                            size="18"
                            class="text-secondaryText hover:text-mainText transition-colors"
                          />
                        </button>
                        <span class="flex-1">{{ displayData[virtualRow.index][column.key] }}</span>
                      </div>
                    </template>
                  </TableCell>
                </TableRow>
              </template>

              <!-- Spacer after (відступ знизу) -->
              <div
                v-if="virtualItems[virtualItems.length - 1]"
                :style="{
                  height: `${totalSize - virtualItems[virtualItems.length - 1].end}px`
                }"
                class="col-span-full"
              />
            </div>
          </template>

          <!-- Звичайні рядки (без віртуалізації) -->
          <template v-else>
            <TableRow
              v-for="(row, index) in displayData"
              :key="(row.id as string) || index"
              :data="row"
              :columns="columns"
              :depth="getRowDepth(row)"
              :is-expanded="isRowExpanded(row)"
              :has-children="hasRowChildren(row)"
              @click="onRowClick(row)"
              @toggle="handleToggleRow(row.id as string | number)"
            >
              <!-- Data cells -->
              <TableCell
                v-for="(column, colIndex) in columns"
                :key="`${(row.id as string) || index}-${column.key}`"
                :value="row[column.key]"
                :align="column.align"
                :depth="getRowDepth(row)"
              >
                <!-- Expand button в першій колонці (якщо expandable) -->
                <template
                  v-if="colIndex === 0 && isExpandable"
                  #default
                >
                  <div class="flex items-center gap-2">
                    <button
                      v-if="isRowExpandable(row as ExpandableRow)"
                      class="expand-btn p-1 hover:bg-cardBorder/50 rounded
                             transition-all duration-200 flex-shrink-0"
                      @click.stop="handleToggleRow(row.id as string | number)"
                    >
                      <VIcon
                        :icon="isRowExpanded(row) ? 'mdi:chevron-down' : 'mdi:chevron-right'"
                        :size="18"
                        class="text-secondaryText hover:text-mainText transition-colors"
                      />
                    </button>
                    <span class="flex-1">{{ row[column.key] }}</span>
                  </div>
                </template>
              </TableCell>
            </TableRow>
          </template>
        </div>
      </div>

      <!-- Pagination (пустой блок для вашей реализации) -->
      <TablePagination />
    </template>
  </div>
</template>

<style scoped>
.table-grid {
  display: grid;
  width: 100%;
  transition: none; /* Вимикаємо transition при resize */
}

.table-grid.is-resizing {
  cursor: col-resize;
  user-select: none;
}

.table-grid.is-resizing * {
  cursor: col-resize !important;
  user-select: none !important;
}
.table-grid {
  display: grid;
  width: 100%;
}

.table-header-row {
  position: sticky;
  top: 0;
  z-index: 10;
}

/* Grid layout для header і cells використовує contents */
.contents {
  display: contents;
}

/* Плавна прокрутка */
.table-scroll-container {
  scroll-behavior: smooth;
}

/* Стилі для expand button */
.expand-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.expand-btn:hover {
  transform: scale(1.05);
  @apply bg-cardBorder/10;
}

.expand-btn:active {
  transform: scale(0.95);
}

/* Плавна анімація для іконки */
.expand-btn :deep(svg) {
  transition: transform 0.2s ease;
}

.expand-btn:hover :deep(svg) {
  transform: scale(1.1);
}
</style>

