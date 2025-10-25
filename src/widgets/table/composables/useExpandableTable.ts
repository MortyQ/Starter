import { ref, computed, type Ref } from "vue";

import { ExpandableRow, FlattenedRow } from "@/widgets/table/types";

export function useExpandableTable(data: Ref<ExpandableRow[]>) {
  // Стан розгорнутих рядків (Set для O(1) lookup)
  const expandedRows = ref<Set<string | number>>(new Set());

  /**
   * Перетворює tree структуру у flat список з урахуванням expanded стану
   * Це ключова функція для роботи з TanStack Virtual
   */
  const flattenedData = computed<FlattenedRow[]>(() => {
    const result: FlattenedRow[] = [];

    const flatten = (
      rows: ExpandableRow[],
      depth = 0,
      parentId?: string | number,
    ) => {
      rows.forEach((row) => {
        const hasChildren = Boolean(
          row.children?.length ||
          (row.expandable && row.expandedContent),
        );
        const isExpanded = expandedRows.value.has(row.id);

        // Додаємо батьківський рядок
        result.push({
          ...row,
          depth,
          parentId,
          hasChildren,
          isExpanded,
        });

        // Якщо розгорнутий І має дочірні елементи — додаємо їх
        if (isExpanded && row.children?.length) {
          flatten(row.children, depth + 1, row.id);
        }
      });
    };

    flatten(data.value);
    return result;
  });

  /**
   * Toggle expand стану для конкретного рядка
   */
  const toggleRow = (id: string | number) => {
    if (expandedRows.value.has(id)) {
      expandedRows.value.delete(id);
    } else {
      expandedRows.value.add(id);
    }
    // Trigger reactivity
    expandedRows.value = new Set(expandedRows.value);
  };

  /**
   * Expand всіх рядків
   */
  const expandAll = () => {
    const collectExpandableIds = (rows: ExpandableRow[]): (string | number)[] => {
      const ids: (string | number)[] = [];
      rows.forEach((row) => {
        if (row.children?.length || row.expandable) {
          ids.push(row.id);
          if (row.children) {
            ids.push(...collectExpandableIds(row.children));
          }
        }
      });
      return ids;
    };

    expandedRows.value = new Set(collectExpandableIds(data.value));
  };

  /**
   * Collapse всіх рядків
   */
  const collapseAll = () => {
    expandedRows.value.clear();
    expandedRows.value = new Set();
  };

  /**
   * Перевірка чи рядок expandable
   */
  const isExpandable = (row: ExpandableRow): boolean => {
    return Boolean(row.children?.length || row.expandable);
  };

  return {
    flattenedData,      // Для передачі у virtualizer
    expandedRows,       // Для UI індикаторів
    toggleRow,          // Для click handlers
    expandAll,
    collapseAll,
    isExpandable,
  };
}

