<script setup lang="ts">
/**
 * TableCellInteractive - обёртка для интерактивных элементов в ячейках таблицы
 *
 * Используйте этот компонент когда нужно разместить в ячейке:
 * - Select / MultiSelect
 * - Dropdown
 * - Popover
 * - Любые элементы с выпадающими меню
 *
 * Этот компонент "вырывается" из overflow: hidden родителя
 * и позволяет dropdown элементам открываться поверх таблицы
 */

interface Props {
  /**
   * Дополнительные CSS классы
   */
  class?: string
}

defineProps<Props>();
</script>

<template>
  <div class="table-cell-interactive">
    <slot />
  </div>
</template>

<style scoped>
.table-cell-interactive {
  /* Переопределяем overflow от родителя */
  position: relative;
  overflow: visible !important;

  /* Для того чтобы dropdown мог "выйти" за границы */
  z-index: 10;

  /* Минимальная ширина для правильной работы в grid */
  min-width: 0;
  width: 100%;
}

/* Все интерактивные элементы внутри получают overflow: visible */
.table-cell-interactive :deep(*) {
  overflow: visible;
}

/* Dropdown меню должны быть поверх всего */
.table-cell-interactive :deep(.multiselect__content),
.table-cell-interactive :deep(.dropdown-menu),
.table-cell-interactive :deep([role="listbox"]),
.table-cell-interactive :deep([role="menu"]) {
  z-index: 9999 !important;
}
</style>

