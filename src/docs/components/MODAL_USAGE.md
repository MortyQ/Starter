````markdown
# Modal System Documentation

## 📦 Overview

The new modal system is built on **Pinia store** and fully supports working with multiple modal windows simultaneously.

## ✨ Key Features

- ✅ **Automatic z-index management** - modals automatically stack on top of each other
- ✅ **Full reactivity** - all changes are tracked by Vue
- ✅ **TypeScript support** - complete typing
- ✅ **Theme integration** - uses CSS variables from Tailwind
- ✅ **Responsive design** - works on all devices
- ✅ **Flexible settings** - close on ESC, backdrop, etc.
- ✅ **Automatic cleanup** - components are automatically removed on unmount

## 🚀 Usage

### Option 1: With VModal Component (Recommended)

```vue
<script setup lang="ts">
import { useModal } from "@/composables/useModal";
import VModal from "@/components/common/VModal.vue";

const { open, close } = useModal("my-modal");
</script>

<template>
  <button @click="open">Open Modal</button>

  <VModal
    id="my-modal"
    title="My Modal Title"
    max-width="md"
  >
    <p>Modal content goes here</p>

    <template #footer>
      <button @click="close">Cancel</button>
      <button @click="close">Confirm</button>
    </template>
  </VModal>
</template>
```

### Option 2: Custom Modal Component

```vue
<script setup lang="ts">
import { useModal } from "@/composables/useModal";

const { isOpen, open, close, zIndex } = useModal("custom-modal");
</script>

<template>
  <button @click="open">Open</button>

  <Teleport to="body">
    <div v-if="isOpen" class="backdrop" :style="{ zIndex }">
      <div class="modal">
        <h2>Custom Modal</h2>
        <button @click="close">Close</button>
      </div>
    </div>
  </Teleport>
</template>
```

### Option 3: Programmatic Control via Store

```vue
<script setup lang="ts">
import { useModalStore } from "@/stores/modal";

const modalStore = useModalStore();

function openModal() {
  modalStore.open("my-modal");
}

function closeAll() {
  modalStore.closeAll();
}
</script>
```

## 📝 API Reference

### useModal(id: string, autoUnregister?: boolean)

**Parameters:**
- `id` - unique modal identifier
- `autoUnregister` - automatically unregister on unmount (default: `true`)

**Returns:**
```typescript
{
  isOpen: ComputedRef<boolean>;      // Whether the modal is open
  zIndex: ComputedRef<number>;       // Current z-index
  modal: ComputedRef<Modal | undefined>; // Modal object
  open: () => void;                  // Open the modal
  close: () => void;                 // Close the modal
  toggle: () => void;                // Toggle modal state
}
```

### VModal Props

```typescript
{
  id: string;                        // Unique ID (required)
  title?: string;                    // Modal title
  showCloseButton?: boolean;         // Show close button (default: true)
  closeOnBackdrop?: boolean;         // Close on backdrop click (default: true)
  closeOnEscape?: boolean;           // Close on ESC key (default: true)
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full"; // Maximum width
}
```

### VModal Slots

- `default` - main modal content
- `header` - custom header (replaces title and close button)
- `footer` - footer with action buttons

### VModal Events

- `@open` - emitted after modal opens
- `@close` - emitted when modal closes

### Modal Store API

```typescript
const modalStore = useModalStore();

// Methods
modalStore.register(id: string);           // Register modal
modalStore.unregister(id: string);         // Unregister modal
modalStore.open(id: string);               // Open modal
modalStore.close(id: string);              // Close modal
modalStore.toggle(id: string);             // Toggle modal state
modalStore.closeAll();                     // Close all modals

// Getters
modalStore.isOpen(id: string);             // Check if modal is open
modalStore.getZIndex(id: string);          // Get z-index
modalStore.getModal(id: string);           // Get modal object
modalStore.openModals;                     // Array of all open modals
modalStore.hasOpenModals;                  // Whether there are open modals
```

## 💡 Usage Examples

### Multiple Modals on One Page

```vue
<script setup lang="ts">
import { useModal } from "@/composables/useModal";

const modal1 = useModal("modal-1");
const modal2 = useModal("modal-2");
const modal3 = useModal("modal-3");
</script>

<template>
  <button @click="modal1.open">Open 1</button>
  <button @click="modal2.open">Open 2</button>
  <button @click="modal3.open">Open 3</button>

  <VModal id="modal-1" title="First">Content 1</VModal>
  <VModal id="modal-2" title="Second">Content 2</VModal>
  <VModal id="modal-3" title="Third">Content 3</VModal>
</template>
```

### Confirmation Modal

```vue
<script setup lang="ts">
import { useModal } from "@/composables/useModal";

const { open, close } = useModal("confirm-modal");

const handleConfirm = () => {
  // Your logic here
  close();
};
</script>

<template>
  <VModal
    id="confirm-modal"
    title="Confirm Action"
    max-width="sm"
    :close-on-backdrop="false"
  >
    <p>Are you sure you want to proceed?</p>

    <template #footer>
      <button @click="close">Cancel</button>
      <button @click="handleConfirm">Confirm</button>
    </template>
  </VModal>
</template>
```

### Form in Modal

```vue
<script setup lang="ts">
import { ref } from "vue";
import { useModal } from "@/composables/useModal";

const { close } = useModal("form-modal");
const formData = ref({ name: "", email: "" });

const handleSubmit = () => {
  console.log(formData.value);
  close();
};
</script>

<template>
  <VModal
    id="form-modal"
    title="Contact Form"
    max-width="lg"
    @close="formData = { name: '', email: '' }"
  >
    <form @submit.prevent="handleSubmit">
      <input v-model="formData.name" placeholder="Name" />
      <input v-model="formData.email" placeholder="Email" />
    </form>

    <template #footer>
      <button type="button" @click="close">Cancel</button>
      <button type="submit" @click="handleSubmit">Submit</button>
    </template>
  </VModal>
</template>
```

## 🔧 Technical Details

### Z-Index Management

Z-index starts at 1000 and automatically increases when opening each new modal. Each new modal automatically opens on top of previous ones.

### Memory Management

When using `autoUnregister: true` (default), modals are automatically removed from the store on component unmount. This prevents memory leaks.

### Keyboard Navigation

- **ESC** - closes the modal (if `closeOnEscape: true`)
- Click outside modal closes it (if `closeOnBackdrop: true`)

### Accessibility

- Proper ARIA attributes
- Focus management
- Keyboard navigation
- Screen reader support

## 🎨 Styling

Modals use CSS variables from your Tailwind theme:
- `--color-cardBg` - modal background
- `--color-cardBorder` - border
- `--color-mainText` - main text color
- `--color-secondaryText` - secondary text color
- `--color-primary` - accent color

## 🚀 Live Demo

Run the project and navigate to `/modals` to see examples of working with multiple modals.
````
