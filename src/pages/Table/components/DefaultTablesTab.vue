<script setup lang="ts">
import Table from "@/widgets/table/Table.vue";
import type { Column } from "@/widgets/table/types";
import { mockDataUsers } from "@/widgets/table/utils/mockData";

const columnsRegular: Column[] = [
  { key: "id", label: "ID", width: "80px", align: "center" },
  { key: "name", label: "Ім'я", width: "2fr" },
  { key: "age", label: "Вік", width: "100px", align: "center" },
  { key: "email", label: "Email", width: "2fr" },
];
</script>

<template>
  <div class="page-container gap-5">
    <Table
      :columns="columnsRegular"
      :data="mockDataUsers"
      height="40vh"
    />
    <Table
      :columns="columnsRegular"
      :data="mockDataUsers"
      height="20vh"
    />
  </div>
</template>
