<script setup lang="ts">
import DOMPurify from "dompurify";
import { ref, computed } from "vue";

import VIcon from "@/components/VIcon.vue";

type ValidationError = {
  $message: string;
};

type Validation = {
  $error: boolean;
  $errors: ValidationError[];
};

type Props = {
  name?: string;
  // eslint-disable-next-line vue/require-prop-types
  modelValue?: string | number;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  supportText?: string;
  validation?: Validation;
  icon?: string;
  size?: "sm" | "md" | "lg";
};

const props = withDefaults(defineProps<Props>(), {
  type: "text",
  size: "md",
  name: "",
  placeholder: "",
  disabled: false,
  supportText: "",
  validation: undefined,
  icon: "",
  modelValue: "",
});

const emit = defineEmits<{
  "update:modelValue": [value: string]
}>();

const isShowPassword = ref(false);

const currentInputType = computed(() => {
  if (props.type === "password") {
    return isShowPassword.value ? "text" : "password";
  }
  return props.type;
});

const changeInputType = () => {
  isShowPassword.value = !isShowPassword.value;
};

const sizeClasses = computed(() => {
  const sizes = {
    sm: "h-9 text-sm px-3",
    md: "h-11 text-base px-4",
    lg: "h-12 text-lg px-5",
  };
  return sizes[props.size];
});

function handleInput(e: Event) {
  const value = (e.target as HTMLInputElement).value;
  const sanitizedValue = DOMPurify.sanitize(value, { ALLOWED_TAGS: [] });
  emit("update:modelValue", sanitizedValue);
}
</script>

<template>
  <div class="v-input-wrapper">
    <!-- Label -->
    <label
      v-if="name"
      class="v-input-label"
    >
      {{ name }}
    </label>

    <!-- Input Container -->
    <div class="v-input-container">
      <!-- Left Icon Slot -->
      <div
        v-if="$slots['icon-left'] || props.icon"
        class="v-input-icon v-input-icon-left"
      >
        <slot name="icon-left">
          <VIcon
            v-if="props.icon"
            :icon="props.icon"
            class="w-5 h-5 text-secondaryText transition-colors"
          />
        </slot>
      </div>

      <!-- Input Field -->
      <input
        :type="currentInputType"
        class="v-input"
        :class="[
          sizeClasses,
          {
            'v-input-with-left-icon': $slots['icon-left'] || props.icon,
            'v-input-with-right-icon': $slots['icon-right'] || props.type === 'password',
            'v-input-error': validation?.$error,
            'v-input-disabled': disabled,
            'cursor-pointer': type === 'date',
          },
        ]"
        :disabled="disabled"
        :value="modelValue"
        :placeholder="placeholder"
        v-bind="$attrs"
        @input="handleInput"
      >

      <!-- Right Icon Slot / Password Toggle -->
      <div
        v-if="$slots['icon-right'] || props.type === 'password'"
        class="v-input-icon v-input-icon-right"
      >
        <slot name="icon-right">
          <button
            v-if="props.type === 'password'"
            type="button"
            class="v-input-password-toggle"
            @click="changeInputType"
          >
            <VIcon
              :icon="currentInputType === 'text' ? 'mdi:eye-off' : 'mdi:eye'"
              class="w-5 h-5 text-secondaryText hover:text-mainText transition-colors"
            />
          </button>
        </slot>
      </div>
    </div>

    <!-- Support Text -->
    <p
      v-if="supportText && !validation?.$error"
      class="v-input-support-text"
    >
      {{ supportText }}
    </p>

    <!-- Error Message -->
    <transition
      name="error-slide"
      mode="out-in"
    >
      <p
        v-if="validation?.$error"
        class="v-input-error-message"
      >
        {{ validation?.$errors[0]?.$message }}
      </p>
    </transition>
  </div>
</template>

<style scoped lang="scss">
.v-input-wrapper {
  @apply w-full flex flex-col gap-1.5;
}

.v-input-label {
  @apply text-sm font-medium text-mainText mb-0.5 transition-colors;
}

.v-input-container {
  @apply relative w-full;
}

.v-input {
  @apply w-full rounded-lg border border-cardBorder bg-inputBg text-mainText
    placeholder:text-secondaryText
    transition-all duration-200 ease-in-out
    focus:outline-none focus:border-primary focus:ring-2
    disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-base-200;

  &:focus {
    --tw-ring-opacity: 0.15;
    --tw-ring-color: var(--color-primary);
  }

  &.v-input-with-left-icon {
    @apply pl-11;
  }

  &.v-input-with-right-icon {
    @apply pr-11;
  }

  &.v-input-error {
    @apply border-error focus:border-error focus:ring-2;

    &:focus {
      --tw-ring-opacity: 0.15;
      --tw-ring-color: var(--color-error);
    }
  }

  &.v-input-disabled {
    @apply bg-base-200 text-secondaryText;
  }

  &:hover:not(:disabled):not(.v-input-error) {
    border-color: var(--color-primary);
    opacity: 0.8;
  }
}

.v-input-icon {
  @apply absolute top-1/2 -translate-y-1/2 flex items-center justify-center;

  &.v-input-icon-left {
    @apply left-3;
  }

  &.v-input-icon-right {
    @apply right-3;
  }
}

.v-input-password-toggle {
  @apply flex items-center justify-center focus:outline-none
    focus:ring-1 rounded-md p-1 transition-all;

  &:focus {
    --tw-ring-opacity: 0.3;
    --tw-ring-color: var(--color-primary);
  }
}

.v-input-support-text {
  @apply text-xs text-secondaryText mt-0.5 transition-colors;
}

.v-input-error-message {
  @apply text-xs text-error font-medium mt-0.5;
}

// Transitions for error messages
.error-slide-enter-active,
.error-slide-leave-active {
  transition: all 0.3s ease;
}

.error-slide-enter-from {
  opacity: 0;
  transform: translateY(-8px);
}

.error-slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.error-slide-enter-to,
.error-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
