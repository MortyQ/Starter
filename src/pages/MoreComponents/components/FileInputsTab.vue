<script setup lang="ts">

import DragNDrop from "@/shared/ui/fileInputs/DragNDrop.vue";

const handleUpload = (files: File[], clearFiles: () => void) => {
  console.log("Files uploaded:", files);
  clearFiles();
};

const handleError = (error: string) => {
  console.error(error);
};

const submitFiles = (files: File[], clearFiles: () => void) => {
  console.log("Files submitted:", files);
  clearFiles();
};
</script>

<template>
  <div>
    <DragNDrop
      multiple
      button
      @upload="handleUpload"
      @error="handleError"
      @submit="submitFiles"
    />
  </div>
</template>

<style scoped>

</style>
