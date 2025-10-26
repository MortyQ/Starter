<script setup lang="ts">
import Table from "@/widgets/table/Table.vue";
import type { Column } from "@/widgets/table/types";
import { mockDataUsers, mockDataUsersTotalRow } from "@/widgets/table/utils/mockData";

// Тест 1: Fixed колонки підряд (РЕКОМЕНДОВАНО)
const columnsGood: Column[] = [
  { key: "id", label: "ID", width: "80px", align: "center", fixed: "left" },
  { key: "name", label: "Ім'я", width: "200px", fixed: "left" },
  { key: "age", label: "Вік", width: "100px", align: "center" },
  { key: "email", label: "Email", width: "250px" },
  { key: "phone", label: "Phone", width: "150px" },
  { key: "salary", label: "Salary", width: "120px", fixed: "right" },
];

// Тест 2: Fixed колонки НЕ підряд (працює, але НЕ РЕКОМЕНДОВАНО)
const columnsBad: Column[] = [
  { key: "id", label: "ID", width: "80px", align: "center", fixed: "left" },
  { key: "age", label: "Вік", width: "100px", align: "center" }, // Normal між fixed
  { key: "name", label: "Ім'я", width: "200px", fixed: "left" }, // Ще один fixed після normal
  { key: "email", label: "Email", width: "250px" },
  { key: "phone", label: "Phone", width: "150px" },
  { key: "salary", label: "Salary", width: "120px", fixed: "right" },
];
</script>

<template>
  <div class="page-container flex flex-col gap-8">
    <!-- Good practice: fixed підряд -->
    <div>
      <h2 class="text-xl font-bold mb-4 text-mainText">
        ✅ Good Practice: Fixed колонки підряд
      </h2>
      <p class="text-secondaryText mb-4">
        ID та Name зліва фіксовані, Salary справа фіксований. Всі fixed підряд в масиві.
      </p>
      <Table
        :columns="columnsGood"
        :data="mockDataUsers"
        :total-row="mockDataUsersTotalRow"
        height="40vh"
      />
    </div>

    <!-- Bad practice: fixed НЕ підряд -->
    <div>
      <h2 class="text-xl font-bold mb-4 text-mainText">
        ⚠️ Not Recommended: Fixed колонки НЕ підряд
      </h2>
      <p class="text-secondaryText mb-4">
        ID fixed, потім Age normal, потім Name знову fixed.
        Технічно працює, але візуально може бути незрозуміло.
      </p>
      <Table
        :columns="columnsBad"
        :data="mockDataUsers"
        :total-row="mockDataUsersTotalRow"
        height="40vh"
      />
    </div>
  </div>
</template>

