import { ref, computed, type Ref } from "vue";

import type { Column, ResizeState } from "../types";

const MIN_COLUMN_WIDTH = 80; // мінімальна ширина колонки в px
const DEFAULT_COLUMN_WIDTH = 150; // дефолтна ширина в px

export function useColumnResize(columns: Ref<Column[]>) {
  // Зберігаємо фактичні ширини колонок (в px)
  const columnWidths = ref<Map<string, number>>(new Map());

  // Стан resizing
  const resizeState = ref<ResizeState>({
    isResizing: false,
    columnKey: null,
    startX: 0,
    startWidth: 0,
  });

  // Ініціалізація ширин колонок
  const initializeWidths = () => {
    columns.value.forEach((column) => {
      if (!columnWidths.value.has(column.key)) {
        // Парсимо width з Column типу
        const width = parseColumnWidth(column.width);
        columnWidths.value.set(column.key, width);
      }
    });
  };

  // Парсинг width з різних форматів
  const parseColumnWidth = (width?: string): number => {
    if (!width) return DEFAULT_COLUMN_WIDTH;

    // Якщо в px - використовуємо як є
    if (width.endsWith("px")) {
      return parseInt(width, 10);
    }

    // Якщо fr або auto - дефолтна ширина
    return DEFAULT_COLUMN_WIDTH;
  };

  // Grid template columns з урахуванням поточних ширин
  const gridTemplateColumns = computed(() => {
    return columns.value
      .map((col) => {
        const width = columnWidths.value.get(col.key) || DEFAULT_COLUMN_WIDTH;
        return `${width}px`;
      })
      .join(" ");
  });

  // Початок resize
  const startResize = (columnKey: string, event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    const currentWidth = columnWidths.value.get(columnKey) || DEFAULT_COLUMN_WIDTH;

    resizeState.value = {
      isResizing: true,
      columnKey,
      startX: event.clientX,
      startWidth: currentWidth,
    };

    // Додаємо global listeners
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", stopResize);
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  };

  // Процес resize (mousemove)
  const handleMouseMove = (event: MouseEvent) => {
    if (!resizeState.value.isResizing || !resizeState.value.columnKey) {
      return;
    }

    const deltaX = event.clientX - resizeState.value.startX;
    const newWidth = Math.max(
      MIN_COLUMN_WIDTH,
      resizeState.value.startWidth + deltaX,
    );

    columnWidths.value.set(resizeState.value.columnKey, newWidth);
  };

  // Кінець resize (mouseup)
  const stopResize = () => {
    resizeState.value = {
      isResizing: false,
      columnKey: null,
      startX: 0,
      startWidth: 0,
    };

    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", stopResize);
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
  };

  // Double-click для auto-fit (можна розширити пізніше)
  const autoFitColumn = (columnKey: string) => {
    // TODO: можна додати логіку для обчислення оптимальної ширини
    // на основі контенту колонки
    columnWidths.value.set(columnKey, DEFAULT_COLUMN_WIDTH);
  };

  // Скидання всіх ширин до дефолтних
  const resetWidths = () => {
    columnWidths.value.clear();
    initializeWidths();
  };

  // Отримання поточної ширини колонки
  const getColumnWidth = (columnKey: string): number => {
    return columnWidths.value.get(columnKey) || DEFAULT_COLUMN_WIDTH;
  };

  // Ініціалізація при створенні
  initializeWidths();

  return {
    gridTemplateColumns,
    columnWidths,
    isResizing: computed(() => resizeState.value.isResizing),
    startResize,
    autoFitColumn,
    resetWidths,
    getColumnWidth,
  };
}

