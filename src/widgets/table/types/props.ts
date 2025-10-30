import type { Column, ExpandableRow, MultiSelectConfig } from "@/widgets/table/types/index";

export type TableProps = {
  columns: Column[]
  data: ExpandableRow[]
  loading?: boolean
  virtualized?: boolean
  rowHeight?: number
  height?: string | number // Table height (CSS value or number in px)
  totalRow?: Record<string, unknown> // Summary row (sticky bottom)
  selectedRows?: ExpandableRow[] // Pre-selected rows (v-model support)
  multiSelect?: MultiSelectConfig // Multi-select configuration
  /**
   * Expand behavior mode:
   * - 'auto' (default): Rows expand/collapse automatically on click
   * - 'controlled': Expansion is controlled via @expand-click callback
   *   Parent must call the provided callback to toggle expansion
   */
  expandMode?: "auto" | "controlled"
};

export type UseTableProps = {
  columns: Column[]
  data: Record<string, unknown>[]
};


export interface TableEmits {
  "page-change": [page: number]
  "row-click": [row: Record<string, unknown>]
  "update:selected-rows": [selectedRows: ExpandableRow[]]
  "expand-click": [{ row: ExpandableRow, column: Column, callback: () => void, expanded: boolean }]
}
