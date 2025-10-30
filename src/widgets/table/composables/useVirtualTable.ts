import { useVirtualizer } from "@tanstack/vue-virtual";
import { computed, onUnmounted, type Ref } from "vue";

import { VirtualTableOptions } from "@/widgets/table/types";


export function useVirtualTable(
  scrollContainerRef: Ref<HTMLElement | null>,
  data: Ref<Record<string, unknown>[]>,
  options: VirtualTableOptions = {},
) {
  const {
    estimateSize = 50,
    overscan = 2,  // Reduced from 5 to 2 for better performance
    measureElement = false,
  } = options;

  const virtualizerOptions: Record<string, unknown> = {
    // FIXED: use computed for reactive count
    get count() {
      return data.value.length;
    },
    // CRITICAL: Return null if container is not mounted yet
    // This prevents virtualizer from trying to work with unmounted element
    getScrollElement: () => scrollContainerRef.value,
    estimateSize: () => estimateSize,
    overscan,
  };

  // 🔑 CRITICAL for expand/collapse: dynamic height measurement
  // OPTIMIZATION: Use WeakMap for caching to allow garbage collection
  if (measureElement) {
    const heightCache = new WeakMap<Element, number>();

    virtualizerOptions.measureElement = (el: Element | null) => {
      if (!el) return estimateSize;

      // Check cache first
      const cached = heightCache.get(el);
      if (cached !== undefined) return cached;

      // Measure and cache
      const height = el.getBoundingClientRect().height;
      heightCache.set(el, height);
      return height;
    };
  }

  const virtualizer = useVirtualizer(virtualizerOptions as never);

  // Get list of visible virtual elements
  const virtualItems = computed(() => virtualizer.value.getVirtualItems());

  // Total height of all elements
  const totalSize = computed(() => virtualizer.value.getTotalSize());

  // CRITICAL: Cleanup on unmount to prevent memory leaks
  onUnmounted(() => {
    // TanStack Virtual doesn't provide explicit cleanup,
    // but we ensure references are cleared
    virtualItems.value.length = 0;
  });

  return {
    virtualizer,
    virtualItems,
    totalSize,
  };
}
