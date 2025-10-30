import { ref, computed, type Ref } from "vue";

import type { Column, ResizeState } from "../types";

const MIN_COLUMN_WIDTH = 80; // minimum column width in px
const DEFAULT_COLUMN_WIDTH = 150; // default width in px

export function useColumnResize(columns: Ref<Column[]>) {
  // Store actual column widths (in px)
  const columnWidths = ref<Map<string, number>>(new Map());

  // Resizing state
  const resizeState = ref<ResizeState>({
    isResizing: false,
    columnKey: null,
    startX: 0,
    startWidth: 0,
  });

  // Initialize column widths
  const initializeWidths = () => {
    columns.value.forEach((column) => {
      if (!columnWidths.value.has(column.key)) {
        // Parse width from Column type
        const width = parseColumnWidth(column.width);
        columnWidths.value.set(column.key, width);
      }
    });
  };

  // Parse width from different formats
  const parseColumnWidth = (width?: string): number => {
    if (!width) return DEFAULT_COLUMN_WIDTH;

    // If in px - use as is
    if (width.endsWith("px")) {
      return parseInt(width, 10);
    }

    // If fr or auto - default width
    return DEFAULT_COLUMN_WIDTH;
  };

  // Grid template columns considering current widths
  const gridTemplateColumns = computed(() => {
    return columns.value
      .map((col) => {
        const width = columnWidths.value.get(col.key) || DEFAULT_COLUMN_WIDTH;
        return `${width}px`;
      })
      .join(" ");
  });

  // Grid template columns with checkbox column prepended
  const getGridTemplateWithCheckbox = (checkboxWidth = 50) => {
    return `${checkboxWidth}px ${gridTemplateColumns.value}`;
  };

  // Start resize
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

    // Add global listeners
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", stopResize);
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  };

  // Resize process (mousemove)
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

  // End resize (mouseup)
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

  // Double-click for auto-fit (can be expanded later)
  const autoFitColumn = (columnKey: string) => {
    // TODO: can add logic to calculate optimal width
    // based on column content
    columnWidths.value.set(columnKey, DEFAULT_COLUMN_WIDTH);
  };

  // Reset all widths to defaults
  const resetWidths = () => {
    columnWidths.value.clear();
    initializeWidths();
  };

  // Get current column width
  const getColumnWidth = (columnKey: string): number => {
    return columnWidths.value.get(columnKey) || DEFAULT_COLUMN_WIDTH;
  };

  // Initialize on creation
  initializeWidths();

  return {
    gridTemplateColumns,
    getGridTemplateWithCheckbox,
    columnWidths,
    isResizing: computed(() => resizeState.value.isResizing),
    startResize,
    autoFitColumn,
    getColumnWidth,
    resetWidths,
  };
}

