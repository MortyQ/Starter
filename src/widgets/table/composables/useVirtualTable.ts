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
    // ВИПРАВЛЕНО: використовуємо computed для reactive count
    get count() {
      return data.value.length;
    },
    getScrollElement: () => scrollContainerRef.value,
    estimateSize: () => estimateSize,
    overscan,
  };

  // 🔑 КРИТИЧНО для expand/collapse: динамічне вимірювання висоти
  if (measureElement) {
    virtualizerOptions.measureElement = (el: Element | null) => {
      if (!el) return estimateSize;
      return el.getBoundingClientRect().height;
    };
  }

  const virtualizer = useVirtualizer(virtualizerOptions as never);

  // Отримуємо список видимих віртуальних елементів
  const virtualItems = computed(() => virtualizer.value.getVirtualItems());

  // Загальна висота всіх елементів
  const totalSize = computed(() => virtualizer.value.getTotalSize());

  return {
    virtualizer,
    virtualItems,
    totalSize,
  };
}
