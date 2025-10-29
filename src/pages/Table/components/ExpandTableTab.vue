<script setup lang="ts">
import VMultiSelect from "@/shared/ui/common/VMultiSelect.vue";
import Table from "@/widgets/table/Table.vue";
import TableToolbar from "@/widgets/table/components/TableToolbar.vue";
import { Column } from "@/widgets/table/types";
import { mockDataExpandable, mockDataExpandableTotalRow } from "@/widgets/table/utils/mockData";

const columnsExpandable: Column[] = [
  // All left fixed columns in a row
  { key: "name", label: "Name"  },
  { key: "count", label: "Count"  },
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
  { key: "revenue", label: "Revenue"  },
  // Right fixed at the end
  { key: "accountStatus", label: "Account Status", width: "200px", interactive: true },
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
      <template #toolbar>
        <TableToolbar />
      </template>

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

      <!-- Total row slots with custom formatting -->
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
