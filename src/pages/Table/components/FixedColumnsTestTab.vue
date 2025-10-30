<script setup lang="ts">
import Table from "@/widgets/table/Table.vue";
import TableToolbar from "@/widgets/table/components/TableToolbar.vue";
import { Column } from "@/widgets/table/types";
import { mockDataUsers, mockDataUsersTotalRow } from "@/widgets/table/utils/mockData";

const columnsGood: Column[] = [
  { key: "id", label: "ID", width: "80px", align: "center", fixed: "left" },
  { key: "name", label: "Name", width: "200px", fixed: "left" },
  { key: "age", label: "Age", width: "100px", align: "center" },
  { key: "email", label: "Email", width: "250px" },
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
  { key: "salary", label: "Salary", width: "120px", fixed: "right" },
];

const columnsBad: Column[] = [
  { key: "id", label: "ID", width: "80px", align: "center", fixed: "left" },
  { key: "age", label: "Age", width: "100px", align: "center" }, // Normal between fixed
  { key: "name", label: "Name", width: "200px" }, // Another fixed after normal
  { key: "email", label: "Email", width: "250px",  fixed: "left" },
  { key: "phone", label: "Phone", width: "150px" },
  { key: "position", label: "Position", width: "150px" },
  { key: "status", label: "Status", width: "150px" },
  { key: "performance", label: "Rating", width: "100px" },
  { key: "startDate", label: "Start Date", width: "230px" },
  { key: "projects", label: "Projects", width: "180px" },
  { key: "location", label: "Location", width: "150px" },
  { key: "manager", label: "Manager", width: "180px" },
  { key: "budget", label: "Budget", width: "130px" },
  { key: "salary", label: "Salary", width: "120px", fixed: "right" },
];
</script>

<template>
  <div class="page-container flex flex-col gap-8">
    <!-- Good practice: fixed in a row -->
    <div>
      <h2 class="text-xl font-bold mb-4 text-mainText">
        ✅ Good Practice: Fixed columns in a row
      </h2>
      <p class="text-secondaryText mb-4">
        ID and Name are fixed on the left, Salary is fixed on the right.
        All fixed columns are in a row in the array.
      </p>
      <Table
        :columns="columnsGood"
        :data="mockDataUsers"
        :total-row="mockDataUsersTotalRow"
        height="40vh"
      />
    </div>

    <!-- Bad practice: fixed NOT in a row -->
    <div>
      <h2 class="text-xl font-bold mb-4 text-mainText">
        ⚠️ Not Recommended: Fixed columns scattered
      </h2>
      <p class="text-secondaryText mb-4">
        Fixed columns are not grouped together, which can cause layout issues.
      </p>
      <Table
        :columns="columnsBad"
        :data="mockDataUsers"
        :total-row="mockDataUsersTotalRow"
        height="40vh"
      >
        <template #toolbar>
          <TableToolbar />
        </template>
      </Table>
    </div>
  </div>
</template>

