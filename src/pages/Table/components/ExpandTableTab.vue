<script setup lang="ts">
import VMultiSelect from "@/shared/ui/common/VMultiSelect.vue";
import Table from "@/widgets/table/Table.vue";
import { Column } from "@/widgets/table/types";
import { mockDataExpandable, mockDataExpandableTotalRow } from "@/widgets/table/utils/mockData";

const columnsExpandable: Column[] = [
  // Всі left fixed колонки підряд
  { key: "name", label: "Назва", width: "300px", fixed: "left" },
  { key: "count", label: "Кількість", width: "120px", fixed: "left" },
  { key: "salary", label: "Salary", width: "120px", fixed: "left" },

  // Звичайні scrollable колонки
  { key: "email", label: "Email", width: "250px" },
  { key: "phone", label: "Phone", width: "150px" },
  { key: "position", label: "Position", width: "150px" },
  { key: "status", label: "Статус", width: "150px" },
  { key: "performance", label: "Rating", width: "100px" },
  { key: "startDate", label: "Start Date", width: "130px" },
  { key: "projects", label: "Projects", width: "100px" },
  { key: "location", label: "Location", width: "150px" },
  { key: "manager", label: "Manager", width: "180px" },
  { key: "budget", label: "Budget", width: "130px" },
  { key: "revenue", label: "Revenue", width: "130px" },

  // Right fixed в кінці
  { key: "accountStatus", label: "Account Status", width: "200px", interactive: true, fixed: "right" },
];

const accountStatusList = [
  {
    label: "Active",
    value: "active",
  },
  {
    label: "Inactive",
    value: "inactive",
  },
  {
    label: "Block",
    value: "block",
  },
];
</script>

<template>
  <div class="page-container">
    <Table
      :columns="columnsExpandable"
      :data="mockDataExpandable"
      :total-row="mockDataExpandableTotalRow"
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

      <!-- Total row slots з кастомним форматуванням -->
      <template #total-cell-name="{ value }">
        <span class="text-accent font-bold uppercase">
          {{ value }}
        </span>
      </template>
      <template #total-cell-salary="{ value }">
        <span class="text-positive font-bold">
          ${{ value.toLocaleString() }}
        </span>
      </template>
      <template #total-cell-budget="{ value }">
        <span class="text-info font-bold">
          ${{ value.toLocaleString() }}
        </span>
      </template>
      <template #total-cell-revenue="{ value }">
        <span class="text-positive font-bold">
          ${{ value.toLocaleString() }}
        </span>
      </template>
    </Table>
  </div>
</template>

