<script setup lang="ts">
import FileInputsTab from "@/pages/UIGallery/components/FileInputsTab.vue";
import IconsTab from "@/pages/UIGallery/components/IconsTab.vue";
import Modals from "@/pages/UIGallery/components/ModalsTab.vue";
import MultiSelectTab from "@/pages/UIGallery/components/MultiSelectTab.vue";
import ToastsTab from "@/pages/UIGallery/components/ToastsTab.vue";
import VTabs from "@/shared/ui/common/VTabs.vue";

const tabs = [
  { id: "modals", label: "Modals", component: Modals },
  { id: "toasts", label: "Toasts", component: ToastsTab },
  { id: "icons", label: "Icons", component: IconsTab },
  { id: "multiSelect", label: "Multi-Select", component: MultiSelectTab },
  { id:"fileInputs", label:"File Inputs", component: FileInputsTab },
];
</script>

<template>
  <div class="page-container">
    <VTabs
      :tabs="tabs"
      use-hash
    >
      <template
        v-for="tab in tabs"
        :key="tab.id"
        #[tab.id]
      >
        <component
          :is="tab.component"
          v-if="tab.component"
        />
      </template>
    </VTabs>
  </div>
</template>
