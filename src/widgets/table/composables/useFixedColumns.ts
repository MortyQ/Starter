import { computed, type ComputedRef, type Ref } from "vue";

import type { Column } from "../types";

/**
 * Composable для роботи з фіксованими колонками (sticky left/right)
 *
 * Обчислює:
 * - Позиції (left/right offset) для кожної фіксованої колонки
 * - z-index для правильного стекування
 * - CSS класи та інлайн стилі
 *
 * @param columns - Reactive масив колонок
 * @param columnWidths - Опціональний Map з динамічними ширинами (з useColumnResize)
 */
export function useFixedColumns(
  columns: Ref<Column[]> | ComputedRef<Column[]>,
  columnWidths?: Ref<Map<string, number>>,
) {
  // Валідація: перевірка що fixed колонки мають px ширину
  if (import.meta.env.DEV) {
    columns.value.forEach((col) => {
      if (col.fixed && (!col.width || !col.width.endsWith("px"))) {
        console.warn(
          `[Table] Fixed column "${col.key}" must have a width in pixels (e.g., "200px"). Current width: "${col.width || "undefined"}"`,
        );
      }
    });
  }

  // Helper: отримати ширину колонки (з динамічних або статичних)
  const getColumnWidth = (columnKey: string, fallbackWidth?: string): number => {
    // Спробувати отримати з динамічних ширин (columnWidths з useColumnResize)
    if (columnWidths?.value) {
      const dynamicWidth = columnWidths.value.get(columnKey);
      if (dynamicWidth !== undefined) {
        return dynamicWidth;
      }
    }

    // Fallback на статичну ширину з column.width
    return parseColumnWidth(fallbackWidth) || 150; // 150px default
  };

  // Розділяємо колонки на групи
  const leftFixedColumns = computed(() =>
    columns.value.filter((col) => col.fixed === "left"),
  );

  const rightFixedColumns = computed(() =>
    columns.value.filter((col) => col.fixed === "right"),
  );

  const normalColumns = computed(() =>
    columns.value.filter((col) => !col.fixed),
  );

  // Обчислюємо offset для лівих фіксованих колонок
  const getLeftOffset = (columnKey: string): number => {
    let offset = 0;
    // Йдемо по оригінальному масиву columns (зберігаючи порядок)
    for (const col of columns.value) {
      if (col.key === columnKey) break;
      // Рахуємо тільки ліві fixed колонки
      if (col.fixed === "left") {
        const width = getColumnWidth(col.key, col.width);
        offset += width;
      }
    }
    return offset;
  };

  // Обчислюємо offset для правих фіксованих колонок
  const getRightOffset = (columnKey: string): number => {
    let offset = 0;
    let foundColumn = false;

    // Йдемо по оригінальному масиву columns в зворотному порядку
    for (let i = columns.value.length - 1; i >= 0; i--) {
      const col = columns.value[i];

      if (col.key === columnKey) {
        foundColumn = true;
        continue;
      }

      // Рахуємо тільки праві fixed колонки що йдуть після поточної
      if (foundColumn && col.fixed === "right") {
        const width = getColumnWidth(col.key, col.width);
        offset += width;
      }
    }
    return offset;
  };

  // z-index для стекування (лівіші колонки мають більший z-index)
  const getZIndex = (columnKey: string, column: Column): number => {
    const baseZIndex = 50; // Base для фіксованих колонок

    if (column.fixed === "left") {
      // Знаходимо індекс в оригінальному масиві
      const index = columns.value.findIndex((col) => col.key === columnKey);
      // Підраховуємо скільки лівих fixed колонок до цієї
      let leftFixedCount = 0;
      for (let i = 0; i < index; i++) {
        if (columns.value[i].fixed === "left") leftFixedCount++;
      }
      // Лівіші колонки вище (більший z-index)
      return baseZIndex + (leftFixedColumns.value.length - leftFixedCount);
    }

    if (column.fixed === "right") {
      // Знаходимо індекс в оригінальному масиві
      const index = columns.value.findIndex((col) => col.key === columnKey);
      // Підраховуємо скільки правих fixed колонок після цієї
      let rightFixedCount = 0;
      for (let i = index + 1; i < columns.value.length; i++) {
        if (columns.value[i].fixed === "right") rightFixedCount++;
      }
      // Правіші колонки вище
      return baseZIndex + rightFixedCount + 1;
    }

    return 1; // Звичайні колонки
  };

  // Отримуємо стилі для фіксованої колонки
  const getFixedStyles = (column: Column) => {
    if (!column.fixed) return {};

    const styles: Record<string, string> = {
      position: "sticky",
      zIndex: String(getZIndex(column.key, column)),
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

  // Перевірка чи колонка фіксована
  const isFixed = (column: Column): boolean => {
    return !!column.fixed;
  };

  // Перевірка чи це остання ліва фіксована колонка (для shadow)
  const isLastLeftFixed = (columnKey: string): boolean => {
    if (leftFixedColumns.value.length === 0) return false;

    // Знаходимо останню ліву fixed колонку в оригінальному порядку
    let lastLeftFixedKey: string | null = null;
    for (const col of columns.value) {
      if (col.fixed === "left") {
        lastLeftFixedKey = col.key;
      }
    }

    return lastLeftFixedKey === columnKey;
  };

  // Перевірка чи це перша права фіксована колонка (для shadow)
  const isFirstRightFixed = (columnKey: string): boolean => {
    if (rightFixedColumns.value.length === 0) return false;

    // Знаходимо першу праву fixed колонку в оригінальному порядку
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
 * Парсить ширину колонки (тільки px значення)
 * Для fr, auto, % повертає null
 */
function parseColumnWidth(width?: string): number | null {
  if (!width) return null;
  if (width.endsWith("px")) {
    return Number.parseInt(width, 10);
  }
  return null;
}

