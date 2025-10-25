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
  <h2 class="text-xl font-semibold mb-4 text-mainText">
    Звичайна таблиця ({{ mockDataUsers.length }} записів)
  </h2>
  <Table
    :columns="columnsRegular"
    :data="mockDataUsers"
  />
</template>
