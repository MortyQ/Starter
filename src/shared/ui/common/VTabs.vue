<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import VIcon from "@/shared/ui/common/VIcon.vue";

const router = useRouter();
const route = useRoute();

export type ITab = {
  id: number | string
  label: string
  disabled?: boolean
  icon?: string
  styles?: string
  activeByDefault?: boolean
};

export interface TabSelectedPayload {
  tabId: number | string
  callback: () => void
  tab?: ITab
}

const props = defineProps<{
  tabs: ITab[]
  loader?: boolean
  reset?: boolean
  useHash?: boolean // Enable/disable URL hash synchronization (default: true)
  /**
   * Tab selection mode:
   * - 'auto' (default): Tabs switch immediately on click
   * - 'controlled': Tab switching is controlled via @tab-selected callback
   *   Parent must call the provided callback to complete the switch
   */
  tabSelectionMode?: "auto" | "controlled"
}>();

const emits = defineEmits<{
  tabSelected: [payload: TabSelectedPayload]
}>();

// Initialize active tab from URL hash or default
const getInitialTab = (): number | string => {
  // First, try to get tab from URL hash (synchronously, before render)
  // Only if useHash is enabled (default true)
  if (props.useHash !== false && route.hash) {
    const hashTabId = route.hash.replace("#tab-", "");
    const tabFromHash = props.tabs.find((tab) => String(tab.id) === hashTabId);
    if (tabFromHash) {
      return tabFromHash.id;
    }
  }

  // If no valid hash, use activeByDefault or first tab
  const defaultTab = props.tabs.find((tab) => tab.activeByDefault);
  return defaultTab?.id || props.tabs[0]?.id;
};

const currentTabId = ref<number | string>(getInitialTab());

// Handle tab selection
const selectTab = (tabId: number | string, updateRoute = true) => {
  const tab = props.tabs.find((t) => t.id === tabId);

  // Skip if tab doesn't exist or is disabled
  if (!tab || tab.disabled) return;

  // Create callback that completes the tab switch
  const completeTabSwitch = () => {
    currentTabId.value = tabId;

    // Update URL hash only if useHash is enabled (default true)
    if (props.useHash !== false && updateRoute && route.hash !== `#tab-${tabId}`) {
      router.push({
        hash: `#tab-${tabId}`,
        query: route.query,
      });
    }
  };

  if (props.tabSelectionMode === "controlled") {
    // Controlled mode: emit event with callback, parent controls tab switch
    emits("tabSelected", {
      tabId,
      callback: completeTabSwitch,
      tab,
    });
  } else {
    // Auto mode (default): switch immediately, emit for notification
    completeTabSwitch();
    emits("tabSelected", {
      tabId,
      callback: () => {}, // Already switched, callback is no-op
      tab,
    });
  }
};

// Watch for reset prop
watch(
  () => props.reset,
  (shouldReset) => {
    if (shouldReset && props.tabs.length > 0) {
      selectTab(props.tabs[0].id);
    }
  },
);

// Initialize from URL hash on mount
onMounted(() => {
  // Initial tab is already set correctly in getInitialTab()
  // Create callback for initial tab
  const completeInitialTabSwitch = () => {
    // Only sync URL hash if useHash is enabled (default true)
    if (props.useHash !== false && route.hash !== `#tab-${currentTabId.value}`) {
      router.replace({
        hash: `#tab-${currentTabId.value}`,
        query: route.query,
      });
    }
  };

  const initialTab = props.tabs.find((t) => t.id === currentTabId.value);

  // Complete initial tab switch and emit notification
  completeInitialTabSwitch();
  emits("tabSelected", {
    tabId: currentTabId.value,
    callback: () => {}, // Already initialized, callback is no-op
    tab: initialTab,
  });
});

const isTabActive = (tabId: number | string): boolean => {
  return currentTabId.value === tabId;
};

defineExpose({
  currentTabId,
  selectTab,
});
</script>

<template>
  <div class="flex flex-col flex-1 w-full">
    <!-- Tabs Header -->
    <div
      v-if="props.tabs.length > 0"
      class="flex justify-between items-center"
    >
      <!-- Loading Skeleton -->
      <section
        v-if="props.loader"
        class="flex gap-4 py-4"
        aria-busy="true"
      >
        <div
          v-for="item in props.tabs.length"
          :key="item"
          class="h-10 w-32 rounded-lg bg-base-200 animate-pulse"
        />
      </section>

      <!-- Tabs List -->
      <nav
        v-else
        role="tablist"
        class="flex overflow-x-auto scrollbar-hide scroll-smooth border-b border-base-300 w-full"
        aria-label="Tabs navigation"
      >
        <button
          v-for="tab in props.tabs"
          :key="tab.id"
          type="button"
          role="tab"
          :aria-selected="isTabActive(tab.id)"
          :aria-disabled="tab.disabled"
          :tabindex="tab.disabled ? -1 : 0"
          class="tab-button relative flex items-center
          justify-center gap-2 px-5 py-3.5 text-sm font-medium
          whitespace-nowrap transition-colors duration-200 ease-in-out border-b-2 -mb-px"
          :class="[
            {
              'text-primary border-primary': isTabActive(tab.id),
              'text-neutral/60 border-transparent hover:text-primary hover:bg-base-200/50':
                !isTabActive(tab.id) && !tab.disabled,
              'text-neutral/30 border-transparent cursor-not-allowed': tab.disabled,
              'cursor-pointer': !tab.disabled,
            },
            tab.styles,
          ]"
          @click="selectTab(tab.id)"
          @keydown.enter="selectTab(tab.id)"
          @keydown.space.prevent="selectTab(tab.id)"
        >
          <!-- Icon Slot or Icon -->
          <slot
            v-if="!tab.icon"
            :name="`tab-icon-${tab.id}`"
          />
          <VIcon
            v-else
            :icon="tab.icon"
            :class="
              isTabActive(tab.id)
                ? 'w-5 h-5 transition-transform duration-200 scale-110'
                : 'w-5 h-5 transition-transform duration-200'
            "
          />

          <!-- Tab Label -->
          <span>{{ tab.label }}</span>
        </button>
      </nav>

      <!-- Right Slot (e.g., actions, filters) -->
      <div
        v-if="$slots['tabs-right']"
        class="flex-shrink-0 ml-4"
      >
        <slot
          name="tabs-right"
          :current-tab-id="currentTabId"
        />
      </div>
    </div>

    <!-- Tab Content -->
    <div
      v-if="!props.loader"
      role="tabpanel"
      :aria-labelledby="`tab-${currentTabId}`"
      class="flex-1 flex flex-col min-h-0"
    >
      <div class="flex-1 overflow-auto pt-4">
        <slot :name="`${currentTabId}`" />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Hide scrollbar but keep functionality */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Remove ALL focus/outline effects like GitHub */
.tab-button {
  outline: none !important;
  box-shadow: none !important;
}

.tab-button:focus,
.tab-button:focus-visible,
.tab-button:active {
  outline: none !important;
  box-shadow: none !important;
}
</style>

