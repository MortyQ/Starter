<script setup lang="ts">
import Table from "@/widgets/table/Table.vue";
import TableToolbar from "@/widgets/table/components/TableToolbar.vue";
import type { Column } from "@/widgets/table/types";
import { mockDataUsers, mockDataUsersTotalRow } from "@/widgets/table/utils/mockData";

// Columns with grouped headers (AG-Grid style)
const columnsGrouped: Column[] = [
  // Group 1: Personal Information
  {
    key: "personal",
    label: "Personal Information",
    align: "center",
    children: [
      { key: "id", label: "ID", width: "80px", align: "center" },
      { key: "name", label: "Full Name", width: "200px" },
      { key: "age", label: "Age", width: "100px", align: "center" },
    ],
  },
  { key: "startDate", label: "Start Date", width: "130px" },

  // Group 2: Contact Details
  {
    key: "contact",
    label: "Contact Details",
    align: "center",
    children: [
      { key: "email", label: "Email Address", width: "250px" },
      { key: "phone", label: "Phone Number", width: "150px" },
    ],
  },

  // Group 3: Work Information
  {
    key: "work",
    label: "Work Information",
    align: "center",
    children: [
      { key: "position", label: "Position", width: "150px" },
      { key: "status", label: "Status", width: "120px" },
      { key: "manager", label: "Manager", width: "180px" },
    ],
  },

  // Group 4: Performance Metrics
  {
    key: "performance",
    label: "Performance Metrics",
    align: "center",
    children: [
      { key: "performance", label: "Rating", width: "100px", align: "center" },
      { key: "projects", label: "Projects", width: "100px", align: "center" },
    ],
  },

  // Single columns without group
  { key: "location", label: "Location", width: "150px" },
];
</script>

<template>
  <div class="page-container">
    <TableToolbar />
    <Table
      :columns="columnsGrouped"
      :data="mockDataUsers"
      :total-row="mockDataUsersTotalRow"
      height="60vh"
    >
      <!-- Custom cell rendering examples -->
      <template #cell-status="{ value }">
        <span
          class="px-2 py-1 rounded text-xs font-semibold"
          :class="{
            'bg-green-500/20 text-green-600': value === 'Active',
            'bg-yellow-500/20 text-yellow-600': value === 'Away',
            'bg-red-500/20 text-red-600': value === 'Inactive',
          }"
        >
          {{ value }}
        </span>
      </template>

      <!-- Total row slots -->
      <template #total-cell-name="{ value }">
        <span class="text-accent font-bold uppercase">
          {{ value }}
        </span>
      </template>
      <template #total-cell-performance="{ value }">
        <span class="text-warning font-bold">
          ⭐ {{ value }}
        </span>
      </template>
      <template #total-cell-projects="{ value }">
        <span class="text-info font-bold">
          {{ value }} total
        </span>
      </template>
    </Table>
  </div>
</template>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>

