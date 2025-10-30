import { computed, type ComputedRef, type Ref } from "vue";

import type { Column } from "../types";

/**
 * Composable for working with fixed columns (sticky left/right)
 *
 * Calculates:
 * - Positions (left/right offset) for each fixed column
 * - z-index for proper stacking
 * - CSS classes and inline styles
 *
 * @param columns - Reactive array of columns
 * @param columnWidths - Optional Map with dynamic widths (from useColumnResize)
 */
export function useFixedColumns(
  columns: Ref<Column[]> | ComputedRef<Column[]>,
  columnWidths?: Ref<Map<string, number>>,
) {
  // Validation: check that fixed columns have px width
  if (import.meta.env.DEV) {
    columns.value.forEach((col) => {
      if (col.fixed && (!col.width || !col.width.endsWith("px"))) {
        console.warn(
          `[Table] Fixed column "${col.key}" must have a width in pixels (e.g., "200px"). Current width: "${col.width || "undefined"}"`,
        );
      }
    });
  }

  // Helper: get column width (from dynamic or static)
  const getColumnWidth = (columnKey: string, fallbackWidth?: string): number => {
    // Try to get from dynamic widths (columnWidths from useColumnResize)
    if (columnWidths?.value) {
      const dynamicWidth = columnWidths.value.get(columnKey);
      if (dynamicWidth !== undefined) {
        return dynamicWidth;
      }
    }

    // Fallback to static width from column.width
    return parseColumnWidth(fallbackWidth) || 150; // 150px default
  };

  // Divide columns into groups
  const leftFixedColumns = computed(() =>
    columns.value.filter((col) => col.fixed === "left"),
  );

  const rightFixedColumns = computed(() =>
    columns.value.filter((col) => col.fixed === "right"),
  );

  const normalColumns = computed(() =>
    columns.value.filter((col) => !col.fixed),
  );

  // Calculate offset for left fixed columns
  const getLeftOffset = (columnKey: string): number => {
    let offset = 0;
    // Go through original columns array (preserving order)
    for (const col of columns.value) {
      if (col.key === columnKey) break;
      // Count only left fixed columns
      if (col.fixed === "left") {
        const width = getColumnWidth(col.key, col.width);
        offset += width;
      }
    }
    return offset;
  };

  // Calculate offset for right fixed columns
  const getRightOffset = (columnKey: string): number => {
    let offset = 0;
    let foundColumn = false;

    // Go through original columns array in reverse order
    for (let i = columns.value.length - 1; i >= 0; i--) {
      const col = columns.value[i];

      if (col.key === columnKey) {
        foundColumn = true;
        continue;
      }

      // Count only right fixed columns that come after current one
      if (foundColumn && col.fixed === "right") {
        const width = getColumnWidth(col.key, col.width);
        offset += width;
      }
    }
    return offset;
  };

  // z-index for stacking (leftmost columns have higher z-index)
  const getZIndex = (columnKey: string, column: Column): number => {
    const baseZIndex = 50; // Base for fixed columns

    if (column.fixed === "left") {
      // Find index in original array
      const index = columns.value.findIndex((col) => col.key === columnKey);
      // Count how many left fixed columns before this one
      let leftFixedCount = 0;
      for (let i = 0; i < index; i++) {
        if (columns.value[i].fixed === "left") leftFixedCount++;
      }
      // Leftmost columns higher (larger z-index)
      return baseZIndex + (leftFixedColumns.value.length - leftFixedCount);
    }

    if (column.fixed === "right") {
      // Find index in original array
      const index = columns.value.findIndex((col) => col.key === columnKey);
      // Count how many right fixed columns after this one
      let rightFixedCount = 0;
      for (let i = index + 1; i < columns.value.length; i++) {
        if (columns.value[i].fixed === "right") rightFixedCount++;
      }
      // Rightmost columns higher
      return baseZIndex + rightFixedCount + 1;
    }

    return 1; // Regular columns
  };

  // Get styles for fixed column
  const getFixedStyles = (column: Column) => {
    if (!column.fixed) return {};

    const styles: Record<string, string> = {
      // position: sticky added through CSS classes!
      // zIndex also controlled through CSS for proper hierarchy
    };

    if (column.fixed === "left") {
      const offset = getLeftOffset(column.key);
      styles.left = `${offset}px`;
    }
    else if (column.fixed === "right") {
      const offset = getRightOffset(column.key);
      styles.right = `${offset}px`;
    }

    return styles;
  };

  // Check if column is fixed
  const isFixed = (column: Column): boolean => {
    return !!column.fixed;
  };

  // Check if this is the last left fixed column (for shadow)
  const isLastLeftFixed = (columnKey: string): boolean => {
    if (leftFixedColumns.value.length === 0) return false;

    // Find last left fixed column in original order
    let lastLeftFixedKey: string | null = null;
    for (const col of columns.value) {
      if (col.fixed === "left") {
        lastLeftFixedKey = col.key;
      }
    }

    return lastLeftFixedKey === columnKey;
  };

  // Check if this is the first right fixed column (for shadow)
  const isFirstRightFixed = (columnKey: string): boolean => {
    if (rightFixedColumns.value.length === 0) return false;

    // Find first right fixed column in original order
    for (const col of columns.value) {
      if (col.fixed === "right") {
        return col.key === columnKey;
      }
    }

    return false;
  };

  return {
    leftFixedColumns,
    rightFixedColumns,
    normalColumns,
    getFixedStyles,
    isFixed,
    isLastLeftFixed,
    isFirstRightFixed,
    getZIndex,
  };
}

/**
 * Parses column width (only px values)
 * For fr, auto, % returns null
 */
function parseColumnWidth(width?: string): number | null {
  if (!width) return null;
  if (width.endsWith("px")) {
    return Number.parseInt(width, 10);
  }
  return null;
}

