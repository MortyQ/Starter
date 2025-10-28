<script setup lang="ts">
import { ref } from "vue";

import VButton from "@/shared/ui/common/VButton.vue";
import VSearch from "@/shared/ui/common/VSearch.vue";

const searchQuery = ref("");
</script>

<template>
  <div class="toolbar toolbar--split ">
    <div class="toolbar-split-left">
      <div>
        <h3 class="toolbar-title">
          Employee Management
        </h3>
        <p class="toolbar-subtitle">
          Track employee performance and account details
        </p>
      </div>

      <div class="toolbar-search-split">
        <VSearch
          v-model="searchQuery"
          placeholder="Search employees..."
        />
      </div>
    </div>

    <div class="toolbar-split-right">
      <VButton
        variant="default"
        icon="mdi:filter-outline"
        text="Filter"
      />
      <VButton
        variant="default"
        icon="mdi:refresh"
      />
      <VButton
        variant="primary"
        icon="mdi:download"
        text="Export"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.toolbar {
  background: transparent;
  transition: all 0.2s ease;

  &--split {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.5rem;
    padding: 1.5rem;
    flex-wrap: wrap;
  }
}

.toolbar-split-left {
  display: flex;
  align-items: center;
  gap: 2rem;
  flex: 1;
  min-width: 300px;
  flex-wrap: wrap;
}

.toolbar-split-right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
}

.toolbar-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
  line-height: 1.4;
}

.toolbar-subtitle {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin: 0.25rem 0 0;
  line-height: 1.4;
}

.toolbar-search-split {
  flex: 1;
  min-width: 200px;
  max-width: 400px;
}

@media (max-width: 768px) {
  .toolbar--split {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }

  .toolbar-split-left {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
    width: 100%;
    min-width: 100%;
  }

  .toolbar-split-right {
    width: 100%;
    justify-content: stretch;
  }

  .toolbar-search-split {
    max-width: 100%;
    min-width: 100%;
  }
}

@media (max-width: 480px) {
  .toolbar--split {
    padding: 1rem;
  }

  .toolbar-split-right {
    flex-wrap: wrap;
  }
}
</style>
