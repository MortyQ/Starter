<script lang="ts" setup>
import Multiselect from "vue-multiselect";

import VIcon from "@/shared/ui/common/VIcon.vue";
import VLoader from "@/shared/ui/common/VLoader.vue";

type Option = {
  label: string
  value: string | number
  [key: string]: unknown
};

type Props = {
  modelValue?: Option | Option[] | null
  options?: Option[]
  placeholder?: string
  disabled?: boolean
  multiple?: boolean
  searchable?: boolean
  clearOnSelect?: boolean
  closeOnSelect?: boolean
  label?: string
  trackBy?: string
  loading?: boolean
  taggable?: boolean
  maxHeight?: number
  optionsLimit?: number
};

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  options: () => [],
  placeholder: "Select option",
  disabled: false,
  multiple: false,
  searchable: true,
  clearOnSelect: true,
  closeOnSelect: true,
  label: "label",
  trackBy: "value",
  loading: false,
  taggable: false,
  maxHeight: 300,
  optionsLimit: 1000,
});

const emit = defineEmits<{
  "update:modelValue": [value: Option | Option[] | null]
  "select": [option: Option]
  "remove": [option: Option]
  "search-change": [query: string]
}>();

// Forward all events
const handleInput = (value: Option | Option[] | null) => {
  emit("update:modelValue", value);
};

const handleSelect = (option: Option) => {
  emit("select", option);
};

const handleRemove = (option: Option) => {
  emit("remove", option);
};

const handleSearchChange = (query: string) => {
  emit("search-change", query);
};
</script>

<template>
  <div class="v-multiselect-wrapper">
    <Multiselect
      :model-value="props.modelValue"
      :options="props.options"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      :multiple="props.multiple"
      :searchable="props.searchable"
      :clear-on-select="props.clearOnSelect"
      :close-on-select="props.closeOnSelect"
      :label="props.label"
      :track-by="props.trackBy"
      :loading="props.loading"
      :taggable="props.taggable"
      :max-height="props.maxHeight"
      :options-limit="props.optionsLimit"
      :show-labels="false"
      v-bind="$attrs"
      @update:model-value="handleInput"
      @select="handleSelect"
      @remove="handleRemove"
      @search-change="handleSearchChange"
    >
      <!-- Custom caret icon -->
      <template #caret>
        <div class="multiselect__select">
          <!-- Show loader when loading, otherwise show chevron -->
          <VLoader
            v-if="props.loading"
            class="w-5 h-5"
          />
          <VIcon
            v-else
            icon="mdi:chevron-down"
            class="w-5 h-5 text-neutral/60 transition-transform duration-200"
          />
        </div>
      </template>

      <!-- Forward all other slots -->
      <template
        v-for="(__, slotName, index) in $slots"
        :key="index"
        #[slotName]="slotProps"
      >
        <slot
          :name="slotName"
          v-bind="slotProps"
        />
      </template>
    </Multiselect>
  </div>
</template>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>

<style lang="scss" scoped>
.v-multiselect-wrapper {
  @apply w-full;

  :deep(.multiselect) {
    @apply min-h-[44px];

    /* Remove default borders from main container */
    border: none !important;
    box-shadow: none !important;

    /* Tags container */
    .multiselect__tags {
      @apply bg-base-100 border border-base-300 rounded-lg shadow-sm
        text-neutral transition-all duration-200
        hover:border-primary focus-within:border-primary min-h-[44px] px-3 py-2;

      /* Focus ring with opacity using custom property */
      &:focus-within {
        box-shadow: 0 0 0 3px hsl(var(--p) / 0.2);
      }
    }

    /* Fix for non-searchable mode - remove inner input border */
    .multiselect__tags-wrap {
      @apply border-0;
    }

    /* Single selected value */
    .multiselect__single {
      @apply bg-transparent text-neutral text-sm font-normal
        mb-0 leading-normal pt-1;
      border: none !important; /* Remove any border from single value */
    }

    /* Input field */
    .multiselect__input {
      @apply bg-transparent text-neutral
        text-sm border-none outline-none ring-0 mb-0 py-1 px-0;

      &::placeholder {
        color: hsl(var(--n) / 0.5);
      }
    }

    /* Placeholder */
    .multiselect__placeholder {
      @apply text-sm font-normal mb-0 pt-1;
      color: hsl(var(--n) / 0.5);
    }

    /* Dropdown content wrapper */
    .multiselect__content-wrapper {
      @apply bg-base-100 border border-base-300 rounded-lg shadow-lg
        mt-1 overflow-hidden;
      border-top: none !important; /* Remove top border to prevent double border */
    }

    /* Dropdown content */
    .multiselect__content {
      @apply bg-base-100;
    }

    /* Dropdown option */
    .multiselect__element {
      @apply list-none;
    }

    .multiselect__option {
      @apply text-neutral text-sm font-normal px-4 py-2.5
        transition-colors duration-150 cursor-pointer
        hover:bg-base-200;

      /* Highlight state (keyboard navigation) */
      &.multiselect__option--highlight {
        @apply bg-base-200 text-neutral;
      }

      /* Selected state */
      &.multiselect__option--selected {
        @apply bg-primary text-white font-medium;

        /* Hover on already selected item - soft red/pink to indicate removal */
        &.multiselect__option--highlight {
          background-color: #fca5a5; /* Tailwind red-300 - soft red/pink */
          color: #991b1b; /* Tailwind red-800 - dark red text */
          @apply font-medium;
        }
      }

      /* Group title */
      &.multiselect__option--group {
        @apply bg-base-200 text-primary font-semibold;
      }

      /* Disabled state */
      &.multiselect__option--disabled {
        @apply cursor-not-allowed bg-transparent;
        color: hsl(var(--n) / 0.3);
      }
    }

    /* Selected tags (multiple mode) */
    .multiselect__tag {
      @apply bg-primary text-white text-sm font-medium
        rounded-md mb-0 mr-2;
      padding: 4px 28px 4px 12px; /* Extra padding on right for X icon */
      position: relative;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }

    .multiselect__tag-icon {
      @apply cursor-pointer rounded-full
        transition-all duration-150;
      position: absolute;
      right: 4px;
      top: 50%;
      transform: translateY(-50%);
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;

      &::after {
        @apply text-white;
        font-size: 16px;
        line-height: 1;
      }

      &:hover {
        background-color: hsl(var(--p) / 0.8);
        transform: translateY(-50%) scale(1.1);
      }
    }

    /* Loading spinner - hide default, we use VLoader instead */
    .multiselect__spinner {
      display: none !important; /* Hide default spinner completely */
    }

    /* Custom caret/arrow icon */
    .multiselect__select {
      @apply absolute right-1 top-1/2 -translate-y-1/2 w-10 h-10
        flex items-center justify-center cursor-pointer
        transition-all duration-200;

      /* Hide default arrow */
      &::before {
        display: none;
      }

      /* Icon color with opacity */
      svg {
        color: hsl(var(--n) / 0.6);
      }
    }

    /* Rotate arrow when dropdown is open */
    &.multiselect--active {
      .multiselect__tags {
        @apply border-primary;
        box-shadow: 0 0 0 3px hsl(var(--p) / 0.2);
      }

      .multiselect__select svg {
        @apply rotate-180;
      }
    }

    /* Fix for dropdown opening above - remove extra border */
    &.multiselect--above {
      .multiselect__content-wrapper {
        border: none !important;
        @apply border border-base-300 rounded-lg;
      }

      /* Fix border issue when opening above without search */
      &.multiselect--active:not(.multiselect--above) {
        .multiselect__content-wrapper {
          border-top: 1px solid transparent !important;
        }
      }
    }

    /* Disabled state */
    &.multiselect--disabled {
      .multiselect__tags {
        @apply bg-base-200 cursor-not-allowed opacity-60;
      }

      .multiselect__select {
        @apply cursor-not-allowed opacity-60;
      }
    }
  }
}
</style>
