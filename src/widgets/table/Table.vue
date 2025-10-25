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
  emit("row-click", row);
};

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

// Computed для фінальних рядків (враховуючи віртуалізацію)
const rowsToRender = computed(() => {
  if (!props.virtualized || virtualItems.value.length === 0) {
    // Звичайний рендеринг без віртуалізації
    return displayData.value.map((row, index) => ({
      row,
      index,
      key: (row.id as string) || index,
      isVirtual: false,
    }));
  }

  // Віртуалізований рендеринг
  return virtualItems.value.map((virtualRow) => ({
    row: displayData.value[virtualRow.index],
    index: virtualRow.index,
    key: virtualRow.index,
    isVirtual: true,
    virtualRow,
  }));
});

// Стилі для віртуалізованих рядків
const getRowStyles = (item: { isVirtual: boolean }) => {
  if (!item.isVirtual) return {};
  return {
    height: `${props.rowHeight}px`,
    minHeight: `${props.rowHeight}px`,
  };
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

          <!-- Віртуалізація: spacer before -->
          <div
            v-if="props.virtualized && virtualItems.length > 0 && virtualItems[0]"
            :style="{ height: `${virtualItems[0].start}px` }"
            class="col-span-full"
          />

          <!-- Рядки таблиці (універсальний рендеринг) -->
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
            >
              <!-- Первая колонка с expand button (если expandable) -->
              <div
                v-if="colIndex === 0 && isExpandable"
                class="flex items-center gap-2"
              >
                <button
                  v-if="isRowExpandable(item.row as ExpandableRow)"
                  class="expand-btn p-1 hover:bg-cardBorder/50 rounded
                         transition-all duration-200 flex-shrink-0"
                  @click.stop="handleToggleRow(item.row.id as string | number)"
                >
                  <VIcon
                    :icon="isRowExpanded(item.row)
                      ? 'mdi:chevron-down'
                      : 'mdi:chevron-right'"
                    :size="18"
                    class="text-secondaryText hover:text-mainText
                           transition-colors"
                  />
                </button>

                <!-- Динамічний slot для контента першої колонки -->
                <div
                  class="flex-1 min-w-0"
                  :class="{ 'overflow-hidden': !column.interactive }"
                >
                  <div
                    v-if="!column.interactive"
                    class="truncate"
                  >
                    <slot
                      :name="`cell-${column.key}`"
                      :value="item.row[column.key]"
                      :row="item.row"
                      :column="column"
                      :index="item.index"
                      :depth="getRowDepth(item.row)"
                    >
                      <!-- Дефолтний рендеринг з truncate -->
                      <span :title="String(item.row[column.key])">
                        {{ item.row[column.key] }}
                      </span>
                    </slot>
                  </div>
                  <!-- Для інтерактивних колонок - без truncate обгортки -->
                  <slot
                    v-else
                    :name="`cell-${column.key}`"
                    :value="item.row[column.key]"
                    :row="item.row"
                    :column="column"
                    :index="item.index"
                    :depth="getRowDepth(item.row)"
                  >
                    <!-- Дефолтний рендеринг -->
                    <span>{{ item.row[column.key] }}</span>
                  </slot>
                </div>
              </div>

              <!-- Звичайні колонки без expand button -->
              <div
                v-else
                class="min-w-0"
                :class="{
                  'overflow-hidden truncate': !column.interactive
                }"
              >
                <!-- Не інтерактивна колонка - з truncate -->
                <template v-if="!column.interactive">
                  <slot
                    :name="`cell-${column.key}`"
                    :value="item.row[column.key]"
                    :row="item.row"
                    :column="column"
                    :index="item.index"
                    :depth="getRowDepth(item.row)"
                  >
                    <!-- Дефолтний рендеринг -->
                    <span :title="String(item.row[column.key])">
                      {{ item.row[column.key] }}
                    </span>
                  </slot>
                </template>

                <!-- Інтерактивна колонка - без truncate -->
                <slot
                  v-else
                  :name="`cell-${column.key}`"
                  :value="item.row[column.key]"
                  :row="item.row"
                  :column="column"
                  :index="item.index"
                  :depth="getRowDepth(item.row)"
                >
                  <!-- Дефолтний рендеринг -->
                  <span>{{ item.row[column.key] }}</span>
                </slot>
              </div>
            </TableCell>
          </TableRow>

          <!-- Віртуалізація: spacer after -->
          <div
            v-if="props.virtualized && virtualItems.length > 0 &&
              virtualItems[virtualItems.length - 1]"
            :style="{
              height: `${totalSize - virtualItems[virtualItems.length - 1].end}px`
            }"
            class="col-span-full"
          />
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

.expand-btn :deep(svg) {
  transform: scale(1.1);
}
</style>

