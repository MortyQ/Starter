<script lang="ts" setup>
import DOMPurify from "dompurify";
import debounce from "lodash.debounce";
import { computed, onUnmounted, ref } from "vue";

import VIcon from "@/components/VIcon.vue";

type Props = {
  text?: string
  modelValue?: string
  placeholder?: string
  debounceProp?: boolean
  textArea?: boolean
  loading?: boolean
};

const props = withDefaults(defineProps<Props>(), {
  text: "Search",
  debounceProp: true,
  loading: false,
  modelValue: "",
  textArea: false,
  placeholder:"",
});

const emit = defineEmits<{
  "update:modelValue": [value: string]
}>();

const isFocused = ref(false);
const inputRef = ref<HTMLInputElement | HTMLTextAreaElement | null>(null);

const internalValue = computed({
  get: () => props.modelValue ?? "",
  set: (value: string) => {
    // DOMPurify already handles HTML escaping and XSS protection
    const sanitizedValue = DOMPurify.sanitize(value, { ALLOWED_TAGS: [] });

    if (props.debounceProp) {
      debouncedEmitUpdate(sanitizedValue);
    } else {
      emit("update:modelValue", sanitizedValue);
    }
  },
});

const debouncedEmitUpdate = debounce((value: string) => {
  emit("update:modelValue", value);
}, 800);

const clearInput = () => {
  emit("update:modelValue", "");
  inputRef.value?.focus();
};

onUnmounted(() => {
  debouncedEmitUpdate.cancel();
});
</script>

<template>
  <div
    class="relative w-full"
    :class="{ 'is-focused': isFocused }"
  >
    <!-- Search Icon -->
    <span
      class="search-icon"
      :class="isFocused ? 'text-primary scale-110' : 'text-secondaryText scale-100'"
    >
      <VIcon
        icon="mdi:search"
        :loading="props.loading"
      />
    </span>

    <!-- Input Field -->
    <input
      v-if="!props.textArea"
      ref="inputRef"
      :placeholder="props.placeholder ?? 'Search...'"
      :value="internalValue"
      class="search-input"
      type="text"
      v-bind="$attrs"
      @input="internalValue = ($event.target as HTMLInputElement).value"
      @focus="isFocused = true"
      @blur="isFocused = false"
    >

    <!-- Textarea Field -->
    <textarea
      v-else
      ref="inputRef"
      :placeholder="props.placeholder ?? 'Type here...'"
      :value="internalValue"
      class="search-textarea"
      v-bind="$attrs"
      @input="internalValue = ($event.target as HTMLTextAreaElement).value"
      @focus="isFocused = true"
      @blur="isFocused = false"
    />

    <!-- Clear Button -->
    <button
      v-if="props.modelValue && props.modelValue.length > 0"
      class="clear-button"
      :class="{ 'clear-button-textarea': props.textArea }"
      type="button"
      aria-label="Clear search"
      @click="clearInput"
    >
      <VIcon icon="mdi:close-circle" />
    </button>
  </div>
</template>

<style lang="scss" scoped>
.search-icon {
  position: absolute;
  left: 1rem;
  top: 1rem;
  display: flex;
  align-items: center;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
  z-index: 1;
}

.search-input,
.search-textarea {
  width: 100%;
  border: 2px solid transparent;
  background-color: var(--color-inputBg);
  color: var(--color-mainText);
  border-radius: 0.75rem;
  box-shadow:
    0 1px 3px 0 rgba(0, 0, 0, 0.1),
    0 1px 2px -1px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 0.875rem;
  line-height: 1.5;
  outline: none;

  &::placeholder {
    color: var(--color-secondaryText);
    opacity: 0.6;
    transition: opacity 0.2s ease;
  }

  &:hover {
    border-color: var(--color-primary);
    box-shadow:
      0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -2px rgba(0, 0, 0, 0.1),
      0 0 0 3px rgba(37, 99, 235, 0.1);
  }

  &:focus {
    border-color: var(--color-primary);
    box-shadow:
      0 4px 12px -2px rgba(0, 0, 0, 0.15),
      0 0 0 4px rgba(37, 99, 235, 0.15);
    background-color: var(--base-100);

    &::placeholder {
      opacity: 0.4;
    }
  }
}

.search-input {
  height: 48px;
  padding: 0.75rem 3rem 0.75rem 2.75rem;

  @media (max-width: 640px) {
    height: 44px;
    font-size: 0.8125rem;
  }
}

.search-textarea {
  min-height: 120px;
  padding: 1rem 3rem 0.875rem 2.75rem;
  resize: vertical;
  font-family: inherit;

  @media (max-width: 640px) {
    min-height: 100px;
    font-size: 0.8125rem;
  }
}

.clear-button {
  position: absolute;
  right: 0.875rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  padding: 0;
  border: none;
  background: transparent;
  color: var(--color-secondaryText);
  cursor: pointer;
  border-radius: 50%;
  transition: all 0.2s ease;
  outline: none;
  z-index: 1;

  &:hover {
    color: var(--color-negative);
    background-color: rgba(239, 68, 68, 0.1);
    transform: translateY(-50%) scale(1.1);
  }

  &:active {
    transform: translateY(-50%) scale(0.95);
  }

  &:focus-visible {
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2);
  }

  &.clear-button-textarea {
    top: 1rem;
    transform: translateY(0);

    &:hover {
      transform: translateY(0) scale(1.1);
    }

    &:active {
      transform: translateY(0) scale(0.95);
    }
  }
}

// Dark mode enhancements
@media (prefers-color-scheme: dark) {
  .search-input,
  .search-textarea {
    box-shadow:
      0 1px 3px 0 rgba(0, 0, 0, 0.3),
      0 1px 2px -1px rgba(0, 0, 0, 0.4);

    &:hover {
      box-shadow:
        0 4px 6px -1px rgba(0, 0, 0, 0.3),
        0 2px 4px -2px rgba(0, 0, 0, 0.4),
        0 0 0 3px rgba(96, 165, 250, 0.15);
    }

    &:focus {
      box-shadow:
        0 4px 12px -2px rgba(0, 0, 0, 0.4),
        0 0 0 4px rgba(96, 165, 250, 0.2);
    }
  }
}

// Animation for focus ring
@keyframes pulse-ring {
  0% {
    box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.4);
  }
  100% {
    box-shadow: 0 0 0 6px rgba(37, 99, 235, 0);
  }
}
</style>
