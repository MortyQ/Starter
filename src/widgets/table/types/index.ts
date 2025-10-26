export interface Column {
  key: string           // Key from data object
  label: string         // Header text
  width?: string        // CSS value (1fr, 150px, auto)
  align?: "left" | "center" | "right"
  interactive?: boolean // Whether column contains interactive elements (select, dropdown, etc.)
  fixed?: "left" | "right" // Fix column (sticky) to left or right
}

export interface ExpandableRow {
  id: string | number
  children?: ExpandableRow[]
  [key: string]: unknown
}

export interface FlattenedRow extends ExpandableRow {
  depth: number          // Nesting level (0 = root)
  parentId?: string | number
  hasChildren: boolean
  isExpanded: boolean
}

export interface VirtualTableOptions {
  estimateSize?: number
  overscan?: number
  measureElement?: boolean
}

export interface ResizeState {
  isResizing: boolean;
  columnKey: string | null;
  startX: number;
  startWidth: number;
}
