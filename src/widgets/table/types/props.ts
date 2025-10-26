import type { Column, ExpandableRow } from "@/widgets/table/types/index";

export type TableProps = {
  columns: Column[]
  data: ExpandableRow[]
  loading?: boolean
  virtualized?: boolean
  rowHeight?: number
  height?: string | number // Висота таблиці (CSS значення або число в px)
  totalRow?: Record<string, unknown> // Підсумковий рядок (sticky bottom)
};

export type UseTableProps = {
  columns: Column[]
  data: Record<string, unknown>[]
};
