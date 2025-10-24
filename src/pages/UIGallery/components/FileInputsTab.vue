<script setup lang="ts">
import { useToast } from "@/shared/composables";
import DragNDrop from "@/shared/ui/fileInputs/DragNDrop.vue";

const toast = useToast();

const handleUpload = (files: File[]) => {
  console.log("Files uploaded:", files);
  if (files.length > 0) {
    toast.info(
      `${files.length} file${files.length > 1 ? "s" : ""} added`,
      files.map(f => f.name).join(", "),
    );
  }
};

const handleError = (error: string) => {
  console.error(error);
  toast.error("Upload Error", error);
};

const submitFiles = (files: File[], clearFiles: () => void) => {
  console.log("Files submitted:", files);

  // Simulate upload with promise
  const uploadPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.2) {
        resolve({ success: true });
        clearFiles();
      } else {
        reject(new Error("Upload failed"));
      }
    }, 2000);
  });

  toast.promise(uploadPromise, {
    loading: `Uploading ${files.length} file${files.length > 1 ? "s" : ""}...`,
    success: "Files uploaded successfully!",
    error: "Failed to upload files",
  });
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
