<script setup lang="ts">
import VMultiSelect from "@/shared/ui/common/VMultiSelect.vue";
import Table from "@/widgets/table/Table.vue";
import { Column } from "@/widgets/table/types";
import { mockDataExpandable } from "@/widgets/table/utils/mockData";

const columnsExpandable: Column[] = [
  { key: "name", label: "Назва", width: "300px" },
  { key: "status", label: "Статус", width: "150px" },
  { key: "count", label: "Кількість", width: "150px" },
  { key: "accountStatus", label: "Account Status", width: "200px", interactive: true },
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
</script>

<template>
  <div class="page-container">
    <Table
      :columns="columnsExpandable"
      :data="mockDataExpandable"
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
</template>

<style scoped>

</style>
