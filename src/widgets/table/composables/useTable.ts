import { computed } from "vue";

import { UseTableProps } from "@/widgets/table/types/props";

export function useTable(props: UseTableProps) {
  // Grid columns computation
  const gridTemplateColumns = computed(() => {
    return props.columns
      .map((col) => col.width || "1fr")
      .join(" ");
  });

  // Event handler
  const handleRowClick = (row: Record<string, unknown>) => {
    return row;
  };

  return {
    gridTemplateColumns,
    handleRowClick,
  };
}

