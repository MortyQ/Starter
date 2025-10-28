<script setup lang="ts">
import Table from "@/widgets/table/Table.vue";
import TableToolbar from "@/widgets/table/components/TableToolbar.vue";
import type { Column } from "@/widgets/table/types";
import { mockDataUsers, mockDataUsersTotalRow } from "@/widgets/table/utils/mockData";

const columnsRegular: Column[] = [
  { key: "id", label: "ID", width: "80px", align: "center" },
  { key: "name", label: "Name", width: "2fr" },
  { key: "age", label: "Age", width: "100px", align: "center" },
  { key: "email", label: "Email", width: "2fr" },
  { key: "phone", label: "Phone", width: "150px" },
  { key: "position", label: "Position", width: "150px" },
  { key: "status", label: "Status", width: "150px" },
  { key: "performance", label: "Rating", width: "100px" },
  { key: "startDate", label: "Start Date", width: "130px" },
  { key: "projects", label: "Projects", width: "100px" },
  { key: "location", label: "Location", width: "150px" },
  { key: "manager", label: "Manager", width: "180px" },
  { key: "budget", label: "Budget", width: "130px" },
  { key: "revenue", label: "Revenue", width: "130px" },
];
</script>

<template>
  <div class="page-container gap-5">
    <Table
      :columns="columnsRegular"
      :data="mockDataUsers"
      :total-row="mockDataUsersTotalRow"
      height="40vh"
    >
      <template #toolbar>
        <TableToolbar />
      </template>
    </Table>

    <Table
      :columns="columnsRegular"
      :data="mockDataUsers"
      :total-row="mockDataUsersTotalRow"
      height="35vh"
    />
  </div>
</template>


