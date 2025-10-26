import { useVirtualizer } from "@tanstack/vue-virtual";
import { computed, type Ref } from "vue";

import { VirtualTableOptions } from "@/widgets/table/types";


export function useVirtualTable(
  scrollContainerRef: Ref<HTMLElement | null>,
  data: Ref<Record<string, unknown>[]>,
  options: VirtualTableOptions = {},
) {
  const {
    estimateSize = 50,
    overscan = 5,
    measureElement = false,
  } = options;

  const virtualizerOptions: Record<string, unknown> = {
    // FIXED: use computed for reactive count
    get count() {
      return data.value.length;
    },
    getScrollElement: () => scrollContainerRef.value,
    estimateSize: () => estimateSize,
    overscan,
  };

  // 🔑 CRITICAL for expand/collapse: dynamic height measurement
  if (measureElement) {
    virtualizerOptions.measureElement = (el: Element | null) => {
      if (!el) return estimateSize;
      return el.getBoundingClientRect().height;
    };
  }

  const virtualizer = useVirtualizer(virtualizerOptions as never);

  // Get list of visible virtual elements
  const virtualItems = computed(() => virtualizer.value.getVirtualItems());

  // Total height of all elements
  const totalSize = computed(() => virtualizer.value.getTotalSize());

  return {
    virtualizer,
    virtualItems,
    totalSize,
  };
}
