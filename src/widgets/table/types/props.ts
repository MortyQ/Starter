import type { Column, ExpandableRow } from "@/widgets/table/types/index";

export type TableProps = {
  columns: Column[]
  data: ExpandableRow[]
  loading?: boolean
  virtualized?: boolean
  rowHeight?: number
  height?: string | number // Table height (CSS value or number in px)
  totalRow?: Record<string, unknown> // Summary row (sticky bottom)
};

export type UseTableProps = {
  columns: Column[]
  data: Record<string, unknown>[]
};


export interface TableEmits {
  "page-change": [page: number]
  "row-click": [row: Record<string, unknown>]
}
