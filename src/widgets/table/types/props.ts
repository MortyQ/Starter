import type { Column, ExpandableRow } from "@/widgets/table/types/index";

export type TableProps = {
  columns: Column[]
  data: ExpandableRow[]
  loading?: boolean
  virtualized?: boolean
  rowHeight?: number
};

export type UseTableProps = {
  columns: Column[]
  data: Record<string, unknown>[]
};
