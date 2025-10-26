<script setup lang="ts">
interface Props {
  label: string
  align?: "left" | "center" | "right"
  columnKey: string
}

const props = withDefaults(defineProps<Props>(), {
  align: "left",
});

const emit = defineEmits<{
  "resize-start": [columnKey: string, event: MouseEvent]
  "resize-dblclick": [columnKey: string]
}>();

const handleResizeStart = (event: MouseEvent) => {
  emit("resize-start", props.columnKey, event);
};

const handleResizeDblClick = () => {
  emit("resize-dblclick", props.columnKey);
};
</script>

<template>
  <div
    class="table-header-cell"
    :class="{
      'table-header-cell--left': align === 'left',
      'table-header-cell--center': align === 'center',
      'table-header-cell--right': align === 'right'
    }"
  >
    <span class="table-header-label">{{ label }}</span>

    <!-- Resize Handle -->
    <div
      class="table-resize-handle group"
      @mousedown="handleResizeStart"
      @dblclick="handleResizeDblClick"
    >
      <!-- Grip indicator -->
      <div class="table-resize-indicator">
        <div class="table-resize-line" />
        <div class="table-resize-line" />
      </div>

      <!-- Divider line -->
      <div class="table-resize-divider" />
    </div>
  </div>
</template>

<style scoped>
/* Styles defined in assets/styles/_header.scss */
</style>
