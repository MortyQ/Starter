<script lang="ts" setup>
import { computed, ref, watchEffect } from "vue";

interface Props {
  modelValue?: boolean | string | number | any;
  id?: string;
  label?: string;
  value?: string | number | boolean | any;
  disabled?: boolean;
  indeterminate?: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  // eslint-disable-next-line no-unused-vars
  (event: "update:modelValue", value: boolean | string | number | any): void;
}>();

const modelValue = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

const inputRef = ref<HTMLInputElement | null>(null);

watchEffect(() => {
  if (inputRef.value) {
    inputRef.value.indeterminate = !!props.indeterminate;
  }
});
</script>

<template>
  <div class="inline-flex items-center gap-2 select-none">
    <input
      :id="id"
      ref="inputRef"
      v-model="modelValue"
      :disabled="props.disabled"
      :value="value"
      class="checkbox-base"
      type="checkbox"
      v-bind="$attrs"
    >
    <label
      v-if="label || $slots.label"
      :class="[
        'text-[14px] text-secondaryText flex items-center gap-2',
        props.disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
      ]"
      :for="!props.disabled ? id : undefined"
    >
      <slot name="label">
        {{ label }}
      </slot>
    </label>
  </div>
</template>
