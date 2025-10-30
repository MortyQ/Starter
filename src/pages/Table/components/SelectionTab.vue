<script setup lang="ts">
import { ref } from "vue";

import VCheckbox from "@/shared/ui/common/VCheckbox.vue";
import Table from "@/widgets/table/Table.vue";
import type { Column, ExpandableRow, MultiSelectConfig } from "@/widgets/table/types";
import { mockDataExpandable, mockDataExpandableTotalRow } from "@/widgets/table/utils/mockData";

const columns: Column[] = [
  // All left fixed columns in a row
  { key: "name", label: "Name"  },
  { key: "count", label: "Count" },
  { key: "salary", label: "Salary" },
  // Regular scrollable columns
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "position", label: "Position" },
  { key: "status", label: "Status" },
  { key: "performance", label: "Rating" },
  { key: "startDate", label: "Start Date" },
  { key: "projects", label: "Projects" },
  { key: "location", label: "Location" },
  { key: "manager", label: "Manager" },
  { key: "budget", label: "Budget" },
  { key: "revenue", label: "Revenue" },
  // Right fixed at the end
];


// Selected rows state
const selectedRows = ref<ExpandableRow[]>([]);

// Multi-select configurations
const independentConfig = ref<MultiSelectConfig>({
  enabled: true,
  selectionMode: "independent",
});

const dependentConfig = ref<MultiSelectConfig>({
  enabled: true,
  selectionMode: "dependent",
  selectChildren: true,
  selectParent: true,
});

// Current config
const currentMode = ref<"independent" | "dependent">("independent");
const currentConfig = ref(independentConfig.value);
const showHeaderCheckbox = ref(true);

const switchMode = (mode: "independent" | "dependent") => {
  currentMode.value = mode;
  const baseConfig = mode === "independent" ? independentConfig.value : dependentConfig.value;
  currentConfig.value = {
    ...baseConfig,
    showHeaderCheckbox: showHeaderCheckbox.value,
  };
  selectedRows.value = []; // Clear selection on mode change
};

const toggleHeaderCheckbox = () => {
  currentConfig.value = {
    ...currentConfig.value,
    showHeaderCheckbox: showHeaderCheckbox.value,
  };
};
</script>

<template>
  <div class="selection-demo">
    <div class="demo-header">
      <h2>Multi-Select Demo</h2>

      <div class="mode-switcher">
        <button
          :class="{ active: currentMode === 'independent' }"
          @click="switchMode('independent')"
        >
          Independent Mode
        </button>
        <button
          :class="{ active: currentMode === 'dependent' }"
          @click="switchMode('dependent')"
        >
          Dependent Mode (Parent-Child)
        </button>
      </div>

      <div class="header-checkbox-toggle">
        Configuration:
        <code class="pl-5">
          {{ currentConfig }}
        </code>
      </div>
      <div class="header-checkbox-toggle">
        <label>
          <VCheckbox
            v-model="showHeaderCheckbox"
            @change="toggleHeaderCheckbox"
          />
          Show Header Checkbox
        </label>
      </div>
    </div>

    <div class="grid grid-cols-5 gap-2">
      <Table
        v-model:selected-rows="selectedRows"
        :columns="columns"
        :data="mockDataExpandable"
        :multi-select="currentConfig"
        :height="400"
        class="col-span-3"
        :total-row="mockDataExpandableTotalRow"
      />

      <div class=" col-span-2 flex flex-col gap-2">
        <div class="mode-description">
          <template v-if="currentMode === 'independent'">
            <strong>Independent Mode:</strong> Each row can be selected independently.
            Selecting a parent doesn't affect children.
          </template>
          <template v-else>
            <strong>Dependent Mode:</strong> Selecting a parent automatically selects all children.
            Selecting all children automatically selects the parent.
          </template>
        </div>

        <div class="info-panel">
          <h3>Selected Rows: {{ selectedRows.length }}</h3>
          <div
            v-if="selectedRows.length > 0"
            class="selected-list"
          >
            <div
              v-for="row in selectedRows"
              :key="row.id"
              class="selected-item"
            >
              {{ row.name }} (ID: {{ row.id }})
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.selection-demo {
  padding: 20px;
}

.demo-header {
  margin-bottom: 20px;
}

.demo-header h2 {
  margin-bottom: 16px;
  font-size: 24px;
  font-weight: 600;
}

.mode-switcher {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.mode-switcher button {
  padding: 8px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
}

.mode-switcher button:hover {
  background: #f3f4f6;
}

.mode-switcher button.active {
  background: #3b82f6;
  color: white;
  border-color: #3b82f6;
}

.header-checkbox-toggle {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  margin-bottom: 16px;
}

.header-checkbox-toggle label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
}

.header-checkbox-toggle input[type="checkbox"] {
  cursor: pointer;
}

.info-panel {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.info-panel h3 {
  margin-bottom: 12px;
  font-size: 16px;
  font-weight: 600;
}

.selected-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.selected-item {
  padding: 8px 12px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  font-size: 14px;
}

.mode-description {
  padding: 12px;
  background: #eff6ff;
  border-left: 4px solid #3b82f6;
  border-radius: 4px;
  font-size: 14px;
  line-height: 1.6;
}
</style>

