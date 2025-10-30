import { computed, type Ref, ref, watch } from "vue";

import type {
  CheckboxState,
  ExpandableRow,
  FlattenedRow,
  MultiSelectConfig,
} from "@/widgets/table/types";

interface UseTableSelectionOptions {
  config: Ref<MultiSelectConfig | undefined>;
  flattenedData: Ref<FlattenedRow[]>;
  selectedRows: Ref<ExpandableRow[]>;
  // eslint-disable-next-line no-unused-vars
  onSelectionChange: (selected: ExpandableRow[]) => void;
}

export function useTableSelection(options: UseTableSelectionOptions) {
  const { config, flattenedData, selectedRows, onSelectionChange } = options;

  // Internal state: Set of selected row IDs for fast lookup
  const selectedIds = ref(new Set<string | number>());

  // Sync selectedIds with selectedRows prop
  watch(
    selectedRows,
    (rows) => {
      selectedIds.value = new Set(rows.map((row) => row.id));
    },
    { immediate: true },
  );

  /**
   * Check if multi-select is enabled
   */
  const isEnabled = computed(() => config.value?.enabled ?? false);

  /**
   * Check if selection mode is dependent (parent-child relationships)
   */
  const isDependentMode = computed(
    () => config.value?.selectionMode === "dependent",
  );

  /**
   * Check if a row is selected
   */
  const isRowSelected = (rowId: string | number): boolean => {
    return selectedIds.value.has(rowId);
  };

  /**
   * Check if a row can be selected (custom validation)
   */
  const isRowSelectable = (row: ExpandableRow): boolean => {
    if (!config.value?.isRowSelectable) return true;
    return config.value.isRowSelectable(row);
  };

  /**
   * Get all children IDs recursively
   */
  const getAllChildrenIds = (row: ExpandableRow): (string | number)[] => {
    if (!row.children || row.children.length === 0) return [];

    const ids: (string | number)[] = [];
    const traverse = (items: ExpandableRow[]) => {
      items.forEach((item) => {
        ids.push(item.id);
        if (item.children) {
          traverse(item.children);
        }
      });
    };
    traverse(row.children);
    return ids;
  };

  /**
   * Get visible children IDs (only expanded children)
   */
  const getVisibleChildrenIds = (row: FlattenedRow): (string | number)[] => {
    if (!row.children || row.children.length === 0) return [];

    const visibleIds: (string | number)[] = [];
    const expandedRows = flattenedData.value.filter((r) => r.isExpanded);
    const expandedIds = new Set(expandedRows.map((r) => r.id));

    const traverse = (items: ExpandableRow[], parentExpanded: boolean) => {
      items.forEach((item) => {
        if (parentExpanded) {
          visibleIds.push(item.id);
          const isExpanded = expandedIds.has(item.id);
          if (item.children) {
            traverse(item.children, isExpanded);
          }
        }
      });
    };

    traverse(row.children, true);
    return visibleIds;
  };

  /**
   * Find parent row by ID
   */
  const findParentRow = (
    childId: string | number,
  ): FlattenedRow | undefined => {
    return flattenedData.value.find((row) =>
      row.children?.some((child) => child.id === childId),
    );
  };

  /**
   * Get checkbox state for a parent row
   */
  const getParentCheckboxState = (row: FlattenedRow): CheckboxState => {
    if (!row.children || row.children.length === 0) {
      return isRowSelected(row.id) ? "checked" : "unchecked";
    }

    const childrenIds = config.value?.selectOnlyVisible
      ? getVisibleChildrenIds(row)
      : getAllChildrenIds(row);

    if (childrenIds.length === 0) {
      return isRowSelected(row.id) ? "checked" : "unchecked";
    }

    const selectedChildrenCount = childrenIds.filter((id) =>
      selectedIds.value.has(id),
    ).length;

    if (selectedChildrenCount === 0 && !isRowSelected(row.id)) {
      return "unchecked";
    }

    if (
      selectedChildrenCount === childrenIds.length
      && isRowSelected(row.id)
    ) {
      return "checked";
    }

    return "indeterminate";
  };

  /**
   * Toggle row selection (with parent-child logic if enabled)
   */
  const toggleRow = (row: FlattenedRow) => {
    if (!isEnabled.value || !isRowSelectable(row)) return;

    const isSelected = isRowSelected(row.id);
    const newSelectedIds = new Set(selectedIds.value);

    if (isSelected) {
      // Deselect row
      newSelectedIds.delete(row.id);

      // Dependent mode: deselect children
      if (isDependentMode.value && config.value?.selectChildren) {
        const childrenIds = config.value?.selectOnlyVisible
          ? getVisibleChildrenIds(row)
          : getAllChildrenIds(row);
        childrenIds.forEach((id) => newSelectedIds.delete(id));
      }
    } else {
      // Select row
      newSelectedIds.add(row.id);

      // Dependent mode: select children
      if (isDependentMode.value && config.value?.selectChildren) {
        const childrenIds = config.value?.selectOnlyVisible
          ? getVisibleChildrenIds(row)
          : getAllChildrenIds(row);
        childrenIds.forEach((id) => newSelectedIds.add(id));
      }
    }

    // Dependent mode: check parent state
    if (isDependentMode.value && config.value?.selectParent) {
      const parent = findParentRow(row.id);
      if (parent) {
        const siblingIds = parent.children?.map((child) => child.id) || [];
        const allSiblingsSelected = siblingIds.every((id) =>
          newSelectedIds.has(id),
        );

        if (allSiblingsSelected) {
          newSelectedIds.add(parent.id);
        } else {
          newSelectedIds.delete(parent.id);
        }
      }
    }

    // Update selection
    selectedIds.value = newSelectedIds;
    emitSelection();
  };

  /**
   * Get header checkbox state
   */
  const getHeaderCheckboxState = (): CheckboxState => {
    const selectableRows = flattenedData.value.filter((row) =>
      isRowSelectable(row),
    );

    if (selectableRows.length === 0) return "unchecked";

    const selectedCount = selectableRows.filter((row) =>
      isRowSelected(row.id),
    ).length;

    if (selectedCount === 0) return "unchecked";
    if (selectedCount === selectableRows.length) return "checked";
    return "indeterminate";
  };

  /**
   * Toggle all rows selection (header checkbox)
   */
  const toggleAllRows = () => {
    if (!isEnabled.value) return;

    const headerState = getHeaderCheckboxState();
    const newSelectedIds = new Set(selectedIds.value);

    const selectableRows = flattenedData.value.filter((row) =>
      isRowSelectable(row),
    );

    if (headerState === "checked") {
      // Deselect all
      selectableRows.forEach((row) => {
        newSelectedIds.delete(row.id);
      });
    } else {
      // Select all
      selectableRows.forEach((row) => {
        newSelectedIds.add(row.id);
      });
    }

    selectedIds.value = newSelectedIds;
    emitSelection();
  };

  /**
   * Emit selection change event
   */
  const emitSelection = () => {
    const findRowById = (
      id: string | number,
      rows: ExpandableRow[],
    ): ExpandableRow | undefined => {
      for (const row of rows) {
        if (row.id === id) return row;
        if (row.children) {
          const found = findRowById(id, row.children);
          if (found) return found;
        }
      }
      return undefined;
    };

    // Get original data from flattenedData to maintain structure
    const originalData = flattenedData.value.map((row) => {
      // Remove flattened-specific properties
      // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
      const { depth, parentId, hasChildren, isExpanded, ...originalRow } = row;
      return originalRow as ExpandableRow;
    });

    const selected = Array.from(selectedIds.value)
      .map((id) => findRowById(id, originalData))
      .filter((row): row is ExpandableRow => row !== undefined);

    onSelectionChange(selected);
  };

  /**
   * Clear all selections
   */
  const clearSelection = () => {
    selectedIds.value = new Set();
    emitSelection();
  };

  /**
   * Select specific rows by IDs
   */
  const selectRows = (rowIds: (string | number)[]) => {
    selectedIds.value = new Set(rowIds);
    emitSelection();
  };

  return {
    // State
    isEnabled,
    isDependentMode,
    selectedIds,

    // Methods
    isRowSelected,
    isRowSelectable,
    toggleRow,
    toggleAllRows,
    getParentCheckboxState,
    getHeaderCheckboxState,
    clearSelection,
    selectRows,
  };
}

