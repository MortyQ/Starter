<script setup lang="ts">
import DefaultTablesTab from "@/pages/Table/components/DefaultTablesTab.vue";
import ExpandTableTab from "@/pages/Table/components/ExpandTableTab.vue";
import FixedColumnsTestTab from "@/pages/Table/components/FixedColumnsTestTab.vue";
import GroupedHeadersTab from "@/pages/Table/components/GroupedHeadersTab.vue";
import VTabs from "@/shared/ui/common/VTabs.vue";

const tabs = [
  { id: "default", label: "Simple Tables", component: DefaultTablesTab },
  { id: "expand", label: "Expand Table", component: ExpandTableTab },
  { id: "fixed", label: "Fixed Columns", component: FixedColumnsTestTab },
  { id: "grouped", label: "Grouped Headers", component: GroupedHeadersTab },
];
</script>

<template>
  <div class="page-container">
    <VTabs
      :tabs="tabs"
      use-hash
    >
      <template
        v-for="tab in tabs"
        :key="tab.id"
        #[tab.id]
      >
        <component
          :is="tab.component"
          v-if="tab.component"
        />
      </template>
    </VTabs>
  </div>
</template>
