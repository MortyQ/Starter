<script setup lang="ts">
import { ref } from "vue";

import VMultiSelect from "@/shared/ui/common/VMultiSelect.vue";
import Table from "@/widgets/table/Table.vue";
import type { Column } from "@/widgets/table/types/index";
import { mockDataUsers, mockDataExpandable } from "@/widgets/table/utils/mockData";

// Колонки для звичайної таблиці
const columnsRegular: Column[] = [
  { key: "id", label: "ID", width: "80px", align: "center" },
  { key: "name", label: "Ім'я", width: "2fr" },
  { key: "age", label: "Вік", width: "100px", align: "center" },
  { key: "email", label: "Email", width: "2fr" },
];

// Колонки для expandable таблиці
const columnsExpandable: Column[] = [
  { key: "name", label: "Назва", width: "300px" },
  { key: "status", label: "Статус", width: "150px" },
  { key: "count", label: "Кількість", width: "150px" },
  { key: "accountStatus", label: "Account Status", width: "150px" },
];

const accountStatusList = [{
  label: "Active",value: "active",
},
{
  label: "Inactive",value: "inactive",
},
{
  label: "Block", value: "block",
}];

const showExpandable = ref(false);

const handleRowClick = (row: Record<string, unknown>) => {
  console.log("Row clicked:", row);
};
</script>

<template>
  <div class="container mx-auto p-6 space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold text-mainText">
        Таблиця з віртуалізацією
      </h1>

      <button
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600
               transition-colors"
        @click="showExpandable = !showExpandable"
      >
        {{ showExpandable ? 'Звичайна таблиця' : 'Expandable таблиця' }}
      </button>
    </div>

    <!-- Звичайна таблиця -->
    <div v-if="!showExpandable">
      <h2 class="text-xl font-semibold mb-4 text-mainText">
        Звичайна таблиця ({{ mockDataUsers.length }} записів)
      </h2>
      <Table
        :columns="columnsRegular"
        :data="mockDataUsers"
        @row-click="handleRowClick"
      />
    </div>

    <!-- Expandable таблиця -->
    <div v-else>
      <h2 class="text-xl font-semibold mb-4 text-mainText">
        Expandable таблиця з nested структурою
      </h2>
      <Table
        :columns="columnsExpandable"
        :data="mockDataExpandable"
        @row-click="handleRowClick"
      >
        <template #cell-status="{depth, value}">
          TEXT  TEXT  TEXT  TEXT {{ value }}: {{ depth }}
        </template>
        <template #cell-accountStatus>
          <VMultiSelect
            :options="accountStatusList"
            label="label"
            placeholder="Account Status"
            :searchable="false"
          />
        </template>
      </Table>
    </div>
  </div>
</template>

<style scoped>

</style>

