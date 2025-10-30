<script setup lang="ts">
interface Props {
  data: Record<string, unknown>
  columns: unknown[]
  depth?: number
  isExpanded?: boolean
  hasChildren?: boolean
}

withDefaults(defineProps<Props>(), {
  depth: 0,
  isExpanded: false,
  hasChildren: false,
});

const emit = defineEmits<{
  toggle: []
}>();
</script>

<template>
  <div
    class="table-row-wrapper"
    @click="emit('toggle')"
  >
    <slot />
  </div>
</template>
