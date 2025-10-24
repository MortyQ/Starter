T# DragNDrop Component Usage

Modern, reusable drag-and-drop file upload component with validation and beautiful design.

## Features

✅ **Drag & Drop** - Visual feedback and smooth animations  
✅ **File Validation** - Size limits and file type restrictions  
✅ **Multiple/Single Mode** - Upload one or many files  
✅ **Error Handling** - User-friendly error messages  
✅ **Theme Integration** - Uses project's Tailwind theme colors  
✅ **Loading States** - Built-in loading indicator  
✅ **Custom Slots** - Fully customizable content  
✅ **File Preview** - Beautiful file cards with icons  
✅ **Responsive** - Works on all screen sizes  

## Basic Usage

```vue
<template>
  <DragNDrop
    @upload="handleUpload"
    @error="handleError"
  />
</template>

<script setup lang="ts">
import DragNDrop from "@/shared/ui/fileInputs/DragNDrop.vue";

const handleUpload = (files: File[], clearFiles: () => void) => {
  console.log("Files uploaded:", files);
  // Process files...
  clearFiles(); // Clear after processing
};

const handleError = (error: string) => {
  console.error(error);
};
</script>
```

## Multiple Files with Validation

```vue
<DragNDrop
  multiple
  :max-files="5"
  :max-size="5 * 1024 * 1024"
  accept="image/*,.pdf"
  @upload="handleUpload"
  @error="handleError"
/>
```

## With Submit Button

```vue
<DragNDrop
  multiple
  button
  @submit="handleSubmit"
  @error="handleError"
/>
```

## Loading State

```vue
<template>
  <DragNDrop
    :loading="isUploading"
    @submit="handleSubmit"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";

const isUploading = ref(false);

const handleSubmit = async (files: File[], clearFiles: () => void) => {
  isUploading.value = true;
  try {
    // Upload files to server
    await uploadToServer(files);
    clearFiles();
  } finally {
    isUploading.value = false;
  }
};
</script>
```

## Custom Content with Slots

```vue
<DragNDrop @upload="handleUpload">
  <template #title>
    <p class="text-xl font-bold text-primary">
      Upload Your Documents
    </p>
  </template>
  
  <template #subtitle>
    <p class="text-secondaryText">
      Support for PDF, DOC, DOCX up to 10MB
    </p>
  </template>
  
  <template #action>
    <VButton
      variant="primary"
      text="Choose Files"
      icon="mdi:file-upload"
    />
  </template>
</DragNDrop>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `loading` | `boolean` | `false` | Show loading state |
| `multiple` | `boolean` | `false` | Allow multiple file selection |
| `button` | `boolean` | `false` | Show submit button |
| `id` | `string` | `'drag-n-drop'` | Unique ID for input element |
| `accept` | `string` | `''` | Accepted file types (e.g., "image/*,.pdf") |
| `maxSize` | `number` | `10485760` | Maximum file size in bytes (10MB) |
| `maxFiles` | `number` | `10` | Maximum number of files (multiple mode) |
| `disabled` | `boolean` | `false` | Disable the component |

## Events

| Event | Parameters | Description |
|-------|------------|-------------|
| `upload` | `files: File[]`, `clearFiles: () => void` | Emitted when files are selected/dropped |
| `submit` | `files: File[]`, `clearFiles: () => void` | Emitted when submit button is clicked |
| `error` | `error: string` | Emitted on validation errors |

## Slots

| Slot | Description |
|------|-------------|
| `title` | Custom title in drop zone |
| `subtitle` | Custom subtitle with file info |
| `action` | Custom action button |

## Examples

### Image Upload Only

```vue
<DragNDrop
  accept="image/png,image/jpeg,image/gif"
  :max-size="2 * 1024 * 1024"
  @upload="handleImageUpload"
/>
```

### Document Upload with Preview

```vue
<template>
  <div>
    <DragNDrop
      multiple
      button
      accept=".pdf,.doc,.docx"
      :loading="uploading"
      @submit="handleSubmit"
      @error="showError"
    />
    
    <div v-if="errorMessage" class="text-negative mt-2">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const uploading = ref(false);
const errorMessage = ref("");

const handleSubmit = async (files: File[], clearFiles: () => void) => {
  uploading.value = true;
  errorMessage.value = "";
  
  try {
    const formData = new FormData();
    files.forEach(file => formData.append("files", file));
    
    await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    
    clearFiles();
  } catch (error) {
    errorMessage.value = "Upload failed. Please try again.";
  } finally {
    uploading.value = false;
  }
};

const showError = (error: string) => {
  errorMessage.value = error;
};
</script>
```

## Styling

The component uses your project's Tailwind theme colors:
- `primary` - Accent color for icons and borders
- `cardBg` - Background for cards
- `cardBorder` - Border colors
- `mainText` - Primary text color
- `secondaryText` - Secondary text color
- `base-200` - Hover backgrounds

All animations and transitions are smooth and follow modern design principles.

