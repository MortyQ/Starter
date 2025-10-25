export interface Column {
  key: string           // Ключ з data об'єкта
  label: string         // Текст хедера
  width?: string        // CSS значення (1fr, 150px, auto)
  align?: "left" | "center" | "right"
}

export interface ExpandableRow {
  id: string | number
  children?: ExpandableRow[]
  [key: string]: unknown
}

export interface FlattenedRow extends ExpandableRow {
  depth: number          // Рівень вкладеності (0 = root)
  parentId?: string | number
  hasChildren: boolean
  isExpanded: boolean
}

export interface TableProps {
  columns: Column[]
  data: ExpandableRow[]
  loading?: boolean
  virtualized?: boolean  // Увімкнути віртуалізацію
  rowHeight?: number     // Висота рядка для віртуалізації (default: 50)
}

export interface TableEmits {
  "page-change": [page: number]
  "row-click": [row: Record<string, unknown>]
}

export interface VirtualTableOptions {
  estimateSize?: number
  overscan?: number
  measureElement?: boolean
}
