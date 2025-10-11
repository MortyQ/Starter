<script lang="ts" setup>
import { computed, useAttrs } from "vue";

interface Props {
  modelValue?: boolean;
  disabled?: boolean;
  trueIcon?: string;
  falseIcon?: string;
  trueLabel?: string;
  falseLabel?: string;
  color?: string; // tailwind color name, e.g. 'primary', 'success', etc.
}

const props = defineProps<Props>();
const emit = defineEmits(["update:modelValue"]);
const attrs = useAttrs();

const isChecked = computed({
  get: () => !!props.modelValue,
  set: (v) => emit("update:modelValue", v),
});

const colorClass = computed(() => {
  if (props.disabled) return "bg-gray-300 border-gray-300";
  if (props.color) return `bg-${props.color}-500 border-${props.color}-500`;
  return isChecked.value ? "bg-primary border-primary" : "bg-gray-300 border-gray-300";
});
</script>

<template>
  <label
    :class="props.disabled ? 'opacity-60 cursor-not-allowed' : ''"
    class="inline-flex items-center cursor-pointer select-none"
  >
    <span class="relative flex items-center">
      <input
        :checked="isChecked"
        :disabled="props.disabled"
        class="peer sr-only"
        type="checkbox"
        v-bind="attrs"
        @change="isChecked = $event.target.checked"
      >
      <span
        :class="colorClass"
        class="w-11 h-6 flex items-center rounded-full
        transition-colors duration-200 border-2 box-border"
      >
        <span
          :class="isChecked ? 'translate-x-5' : ''"
          class="absolute left-1 top-1 flex items-center justify-center
          w-4 h-4 rounded-full bg-white shadow-md transition-transform duration-200"
        >
          <slot
            v-if="$slots.icon"
            name="icon"
          >
            <slot :name="isChecked ? 'true-icon' : 'false-icon'" />
          </slot>
          <template v-else>
            <VueFeather
              v-if="isChecked && props.trueIcon"
              :type="props.trueIcon"
              size="16"
            />
            <VueFeather
              v-else-if="!isChecked && props.falseIcon"
              :type="props.falseIcon"
              size="16"
            />
          </template>
        </span>
      </span>
    </span>
    <span class="ml-3 text-sm text-secondaryText">
      <slot>
        {{ isChecked ? props.trueLabel : props.falseLabel }}
      </slot>
    </span>
  </label>
</template>

<style scoped>
  .w-11 {
    width: 44px;
  }

  .h-6 {
    height: 24px;
  }

  .left-1 {
    left: 4px;
  }

  .top-1 {
    top: 4px;
  }

  .translate-x-5 {
    transform: translateX(20px);
  }
</style>
