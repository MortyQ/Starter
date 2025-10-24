<script setup lang="ts">
import { ref, computed } from "vue";

import VButton from "@/shared/ui/common/VButton.vue";
import VIcon from "@/shared/ui/common/VIcon.vue";
import VLoader from "@/shared/ui/common/VLoader.vue";
import { truncateString, formatBytes, getFileExtension } from "@/shared/utils/formatters";

interface DragNDropProps {
  /** Show loading state */
  loading?: boolean;
  /** Allow multiple files */
  multiple?: boolean;
  /** Show submit button */
  button?: boolean;
  /** Unique ID for input */
  id?: string;
  /** Accept file types (e.g., "image/*,.pdf") */
  accept?: string;
  /** Maximum file size in bytes */
  maxSize?: number;
  /** Maximum number of files (only for multiple mode) */
  maxFiles?: number;
  /** Disabled state */
  disabled?: boolean;
}

const props = withDefaults(defineProps<DragNDropProps>(), {
  loading: false,
  multiple: false,
  button: false,
  id: "drag-n-drop",
  accept: "",
  maxSize: 10 * 1024 * 1024, // 10MB default
  maxFiles: 10,
  disabled: false,
});

const emits = defineEmits<{
  upload: [files: File[], callback: () => void];
  submit: [files: File[], callback: () => void];
  error: [error: string];
}>();

// State
const isDragging = ref(false);
const files = ref<File[]>([]);
const fileRef = ref<HTMLInputElement | null>(null);

// Computed
const hasFiles = computed(() => files.value.length > 0);
const canAddMore = computed(() => !props.multiple || files.value.length < props.maxFiles);

// File type icon mapping
const getFileIcon = (filename: string): string => {
  const ext = getFileExtension(filename).toLowerCase();
  const iconMap: Record<string, string> = {
    pdf: "mdi:file-pdf-box",
    doc: "mdi:file-word-box",
    docx: "mdi:file-word-box",
    xls: "mdi:file-excel-box",
    xlsx: "mdi:file-excel-box",
    ppt: "mdi:file-powerpoint-box",
    pptx: "mdi:file-powerpoint-box",
    zip: "mdi:folder-zip",
    rar: "mdi:folder-zip",
    jpg: "mdi:file-image",
    jpeg: "mdi:file-image",
    png: "mdi:file-image",
    gif: "mdi:file-image",
    svg: "mdi:file-image",
    txt: "mdi:file-document",
    csv: "mdi:file-delimited",
  };
  return iconMap[ext] || "mdi:file-document-outline";
};

// Methods
const validateFile = (file: File): string | null => {
  if (props.maxSize && file.size > props.maxSize) {
    return `File "${file.name}" exceeds maximum size of ${formatBytes(props.maxSize)}`;
  }
  return null;
};

const clearFiles = () => {
  files.value = [];
};

const remove = (index: number) => {
  files.value.splice(index, 1);
  // Emit upload event with updated files list
  emits("upload", files.value, () => {});
};

const handleFiles = (newFiles: File[]) => {
  // Validate and filter files
  const validFiles: File[] = [];

  for (const file of newFiles) {
    const error = validateFile(file);
    if (error) {
      emits("error", error);
      continue;
    }
    validFiles.push(file);
  }

  if (validFiles.length === 0) return;

  if (!props.multiple) {
    files.value = [validFiles[0]];
  } else {
    const remainingSlots = props.maxFiles - files.value.length;
    const filesToAdd = validFiles.slice(0, remainingSlots);

    if (validFiles.length > remainingSlots) {
      emits("error", `Maximum ${props.maxFiles} files allowed`);
    }

    files.value = [...files.value, ...filesToAdd];
  }

  console.log("Files added:", files.value);
  console.log("hasFiles:", hasFiles.value);

  // Emit upload event but don't pass clearFiles callback to prevent auto-clearing
  emits("upload", files.value, () => {});
};

const dragover = (e: DragEvent) => {
  if (props.disabled || props.loading) return;
  e.preventDefault();
  isDragging.value = true;
};

const dragleave = (e: DragEvent) => {
  e.preventDefault();
  isDragging.value = false;
};

const drop = (e: DragEvent) => {
  e.preventDefault();
  isDragging.value = false;

  if (props.disabled || props.loading || !canAddMore.value) return;

  const droppedFiles = Array.from(e.dataTransfer?.files || []);
  handleFiles(droppedFiles);
};

const onChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const selectedFiles = Array.from(target.files || []);

  handleFiles(selectedFiles);

  if (fileRef.value) {
    fileRef.value.value = "";
  }
};

const submit = () => {
  if (files.value.length === 0) return;
  emits("submit", files.value, clearFiles);
};

const triggerFileInput = () => {
  if (props.disabled || props.loading || !canAddMore.value) return;
  fileRef.value?.click();
};
</script>

<template>
  <div class="drag-n-drop">
    <!-- Hidden file input -->
    <input
      :id="`fileInput-${props.id}`"
      ref="fileRef"
      type="file"
      :multiple="props.multiple"
      :accept="props.accept"
      :disabled="props.disabled || props.loading"
      name="file"
      class="drag-n-drop__input"
      v-bind="$attrs"
      @change="onChange"
    >

    <!-- Drop zone -->
    <div
      class="drag-n-drop__dropzone"
      :class="{
        'drag-n-drop__dropzone--dragging': isDragging,
        'drag-n-drop__dropzone--disabled': props.disabled || props.loading,
        'drag-n-drop__dropzone--has-files': hasFiles,
      }"
      @dragover="dragover"
      @dragleave="dragleave"
      @drop="drop"
      @click="triggerFileInput"
    >
      <!-- Loading state -->
      <div
        v-if="props.loading"
        class="drag-n-drop__loading"
      >
        <VLoader class="w-8 h-8" />
        <p class="text-secondaryText text-sm mt-2">
          Processing files...
        </p>
      </div>

      <!-- Drop zone content -->
      <div
        v-else-if="!hasFiles"
        class="drag-n-drop__content"
      >
        <div class="drag-n-drop__icon-wrapper">
          <VIcon
            :icon="isDragging ? 'mdi:cloud-download' : 'mdi:cloud-upload-outline'"
            :size="48"
            class="drag-n-drop__icon"
          />
        </div>

        <div class="drag-n-drop__text">
          <p
            v-if="isDragging"
            class="text-primary font-medium text-base"
          >
            Release to drop files here
          </p>
          <template v-else>
            <slot name="title">
              <p class="text-mainText font-medium text-base mb-1">
                Drop files here or click to browse
              </p>
            </slot>
            <slot name="subtitle">
              <p class="text-secondaryText text-sm">
                <span v-if="props.accept">Supported: {{ props.accept }}</span>
                <span v-if="props.accept && props.maxSize"> • </span>
                <span v-if="props.maxSize">Max: {{ formatBytes(props.maxSize) }}</span>
              </p>
            </slot>
          </template>
        </div>

        <slot name="action">
          <VButton
            variant="primary"
            text="Browse Files"
            icon="mdi:folder-open-outline"
            class="mt-2"
            @click.stop="triggerFileInput"
          />
        </slot>
      </div>
      <!-- File list preview in dropzone when has files -->
      <div
        v-else
        class="drag-n-drop__preview"
      >
        <div class="drag-n-drop__preview-header">
          <VIcon
            icon="mdi:file-multiple-outline"
            :size="24"
            class="text-primary"
          />
          <span class="text-mainText font-medium">
            {{ files.length }} file{{ files.length > 1 ? 's' : '' }} selected
          </span>
        </div>
        <p class="text-secondaryText text-xs mt-1">
          Click to add {{ props.multiple ? 'more' : 'another' }} file{{ props.multiple ? 's' : '' }}
        </p>
      </div>
    </div>

    <!-- Files list -->
    <transition-group
      v-if="hasFiles && !props.loading"
      name="file-list"
      tag="div"
      class="drag-n-drop__files"
    >
      <div
        v-for="(file, index) in files"
        :key="`${file.name}-${file.size}-${index}`"
        class="drag-n-drop__file-item"
      >
        <!-- File icon -->
        <div class="drag-n-drop__file-icon">
          <VIcon
            :icon="getFileIcon(file.name)"
            :size="20"
            class="text-primary"
          />
        </div>

        <!-- File info -->
        <div class="drag-n-drop__file-info">
          <p
            :title="file.name"
            class="drag-n-drop__file-name"
          >
            {{ truncateString(file.name, 40) }}
          </p>
          <p class="drag-n-drop__file-size">
            {{ formatBytes(file.size) }}
          </p>
        </div>

        <!-- Remove button -->
        <button
          type="button"
          class="drag-n-drop__file-remove"
          :disabled="props.loading"
          @click.stop="remove(index)"
        >
          <VIcon
            icon="mdi:close-circle"
            :size="20"
          />
        </button>
      </div>
    </transition-group>

    <!-- Submit button -->
    <div
      v-if="hasFiles && props.button && !props.loading"
      class="drag-n-drop__actions"
    >
      <VButton
        variant="primary"
        text="Submit Files"
        icon="mdi:check-circle-outline"
        class="w-full"
        @click="submit"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.drag-n-drop {
  @apply w-full;

  &__input {
    @apply sr-only;
  }

  &__dropzone {
    @apply relative w-full rounded-lg border-2 border-dashed border-cardBorder
           bg-cardBg transition-all duration-300 ease-in-out
           cursor-pointer overflow-hidden;
    min-height: 200px;

    &:hover:not(&--disabled) {
      @apply border-primary bg-base-200;
    }

    &--dragging {
      @apply border-primary bg-base-200 scale-[1.02];
      box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
    }

    &--disabled {
      @apply opacity-50 cursor-not-allowed;
    }

    &--has-files {
      min-height: 100px;
    }
  }

  &__loading,
  &__content,
  &__preview {
    @apply flex flex-col items-center justify-center p-8 text-center;
  }

  &__loading {
    @apply py-12;
  }

  &__content {
    @apply py-12;
  }

  &__preview {
    @apply py-6;

    &-header {
      @apply flex items-center gap-2;
    }
  }

  &__icon-wrapper {
    @apply mb-4 p-4 rounded-full bg-base-200 transition-all duration-300;

    .drag-n-drop__dropzone:hover:not(.drag-n-drop__dropzone--disabled) & {
      @apply scale-110;
      background-color: rgba(37, 99, 235, 0.1);
    }

    .drag-n-drop__dropzone--dragging & {
      @apply scale-110;
      background-color: rgba(37, 99, 235, 0.2);
    }
  }

  &__icon {
    @apply text-primary transition-colors duration-300;

    .drag-n-drop__dropzone--dragging & {
      @apply animate-bounce;
    }
  }

  &__text {
    @apply mb-4;
  }

  &__files {
    @apply mt-4;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    position: relative;
    width: 100%;
    min-height: 50px;
    background-color: transparent;
  }

  &__file-item {
    @apply flex items-center gap-3 p-3 rounded-lg
           transition-all duration-200;
    position: relative;
    width: 100%;
    background-color: white;
    border: 1px solid #e5e7eb;
    min-height: 60px;

    &:hover {
      @apply shadow-md;
      border-color: rgb(var(--color-primary) / 0.5);
    }
  }

  &__file-icon {
    @apply flex-shrink-0 w-10 h-10 flex items-center justify-center
           rounded-lg bg-base-200;
  }

  &__file-info {
    @apply flex-1 min-w-0;
  }

  &__file-name {
    @apply text-sm font-medium text-mainText truncate;
  }

  &__file-size {
    @apply text-xs text-secondaryText;
  }

  &__file-remove {
    @apply flex-shrink-0 text-secondaryText hover:text-negative
           transition-colors duration-200 rounded-full
           hover:bg-lightNegative p-1;

    &:disabled {
      @apply opacity-50 cursor-not-allowed;
    }
  }

  &__actions {
    @apply mt-4;
  }
}

// Animation for file list
.file-list-enter-active {
  transition: all 0.3s ease;
}

.file-list-leave-active {
  transition: all 0.3s ease;
  position: absolute;
  width: 100%;
  z-index: 0;
}

.file-list-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.file-list-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.file-list-move {
  transition: transform 0.3s ease;
}
</style>
