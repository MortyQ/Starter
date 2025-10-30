<script setup lang="ts">
import VCheckbox from "@/shared/ui/common/VCheckbox.vue";

interface Props {
  checked: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
}

defineProps<Props>();

const emit = defineEmits<{
  toggle: [];
}>();

const handleToggle = () => {
  emit("toggle");
};
</script>

<template>
  <div
    class="table-checkbox-cell"
    @click.stop
  >
    <VCheckbox
      :model-value="checked"
      :indeterminate="indeterminate"
      :disabled="disabled"
      @update:model-value="handleToggle"
    />
  </div>
</template>

<style scoped>
.table-checkbox-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.5rem; /* 8px */
  border-right: 1px solid theme('colors.cardBorder');
}
</style>

