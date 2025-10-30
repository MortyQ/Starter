<script setup lang="ts">
import VCheckbox from "@/shared/ui/common/VCheckbox.vue";
import type { CheckboxState } from "@/widgets/table/types";

interface Props {
  state: CheckboxState;
  disabled?: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  toggle: [];
}>();

const handleToggle = () => {
  if (!props.disabled) {
    emit("toggle");
  }
};
</script>

<template>
  <div
    class="table-header-checkbox-cell"
    @click.stop
  >
    <VCheckbox
      :model-value="state === 'checked'"
      :indeterminate="state === 'indeterminate'"
      :disabled="disabled"
      @update:model-value="handleToggle"
    />
  </div>
</template>

<style scoped>
.table-header-checkbox-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.875rem 0.5rem; /* 14px 8px - match header padding */
  height: 48px; /* Match $table-header-height from variables */
  min-height: 48px;
  box-sizing: border-box;
  background: color-mix(in srgb, theme('colors.cardBg') 98%, theme('colors.mainText') 2%);
  border-bottom: 1px solid theme('colors.cardBorder');
  border-right: 1px solid theme('colors.cardBorder');
  position: sticky;
  top: 0;
  z-index: 3;
  font-weight: 600;
}

/* Fixed column support */
:deep(.table-fixed-column) .table-header-checkbox-cell {
  z-index: 4;
}
</style>

