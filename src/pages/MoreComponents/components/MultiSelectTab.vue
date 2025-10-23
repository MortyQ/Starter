<script setup lang="ts">
import { ref } from "vue";

import VMultiSelect from "@/shared/ui/common/VMultiSelect.vue";

const options = [
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
  { label: "Option 3", value: "option3" },
  { label: "Option 4", value: "option4" },
  { label: "Option 5", value: "option5" },
];

const singleValue = ref(null);
const multipleValue = ref([]);
const disabledValue = ref(options[0]);
</script>

<template>
  <div class="p-8 space-y-8">
    <h1 class="text-3xl font-bold text-neutral mb-8">
      VMultiSelect Component Demo
    </h1>

    <!-- Single Select -->
    <section class="space-y-4">
      <h2 class="text-xl font-semibold text-neutral">
        Single Select
      </h2>
      <VMultiSelect
        v-model="singleValue"
        :options="options"
        placeholder="Choose one option"
      />
      <p class="text-sm text-neutral/60">
        Selected: {{ singleValue }}
      </p>
    </section>

    <!-- Multiple Select -->
    <section class="space-y-4">
      <h2 class="text-xl font-semibold text-neutral">
        Multiple Select
      </h2>
      <VMultiSelect
        v-model="multipleValue"
        :options="options"
        placeholder="Choose multiple options"
        multiple
        :close-on-select="false"
      />
      <p class="text-sm text-neutral/60">
        Selected: {{ multipleValue }}
      </p>
    </section>

    <!-- Disabled -->
    <section class="space-y-4">
      <h2 class="text-xl font-semibold text-neutral">
        Disabled State
      </h2>
      <VMultiSelect
        v-model="disabledValue"
        :options="options"
        placeholder="Disabled"
        disabled
      />
    </section>

    <!-- Not Searchable -->
    <section class="space-y-4">
      <h2 class="text-xl font-semibold text-neutral">
        Not Searchable
      </h2>
      <VMultiSelect
        v-model="singleValue"
        :options="options"
        placeholder="Select without search"
        :searchable="false"
      />
    </section>

    <!-- Loading State -->
    <section class="space-y-4">
      <h2 class="text-xl font-semibold text-neutral">
        Loading State
      </h2>
      <VMultiSelect
        v-model="singleValue"
        :options="options"
        placeholder="Loading..."
        loading
      />
    </section>
  </div>
</template>

<style scoped>

</style>
