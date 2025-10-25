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
    class="table-header-cell px-4 py-3 bg-cardBg
    border-b border-cardBorder font-semibold text-mainText relative group"
    :class="{
      'text-left': align === 'left',
      'text-center': align === 'center',
      'text-right': align === 'right'
    }"
  >
    <span class="select-none truncate block pr-3">{{ label }}</span>

    <!-- Resize Handle - помітний UI індикатор -->
    <div
      class="resize-handle absolute -right-1 top-0 bottom-0 w-3
             cursor-col-resize transition-all duration-150
             flex items-center justify-center
             hover:bg-primary/10 active:bg-primary/20"
      @mousedown="handleResizeStart"
      @dblclick="handleResizeDblClick"
    >
      <!-- Вертикальні лінії (grip indicator) -->
      <div
        class="resize-indicator flex gap-[2px] opacity-0
               group-hover:opacity-100 transition-opacity duration-150"
      >
        <div class="w-[2px] h-4 bg-primary/40 rounded-full" />
        <div class="w-[2px] h-4 bg-primary/40 rounded-full" />
      </div>

      <!-- Тонка роздільна лінія (завжди видима) -->
      <div class="absolute right-0 top-2 bottom-2 w-[2px] bg-cardBorder" />
    </div>
  </div>
</template>

<style scoped>
.table-header-cell {
  position: sticky;
  top: 0;
  z-index: 10;
  overflow: hidden;
  min-width: 0;
}

.resize-handle {
  z-index: 20;
  padding: 0 4px;
  margin: 8px -6px;
  @apply bg-cardBorder flex items-center
}

.resize-handle:hover .resize-indicator {
  opacity: 1;
}

.resize-handle:active {
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(99, 102, 241, 0.15) 50%,
    transparent 100%
  );
}
</style>
