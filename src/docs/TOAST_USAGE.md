# Toast Notifications Usage Guide

This project uses `vue-sonner` for toast notifications, fully styled to match your custom theme with Tailwind CSS and your color variables.

## Features

✅ Automatically adapts to light/dark theme  
✅ Uses project's custom color variables (primary, positive, negative, warning, info)  
✅ Smooth animations and transitions  
✅ Close button for manual dismissal  
✅ Promise toasts with loading states  
✅ Positioned at top-right by default  
✅ Auto-dismissal with configurable duration  

## Quick Start

```typescript
import { useToast } from '@/shared/composables';

const toast = useToast();

// Show success notification
toast.success('Success!', 'Operation completed successfully');

// Show error notification
toast.error('Error!', 'Something went wrong');

// Show warning notification
toast.warning('Warning!', 'Please check your input');

// Show info notification
toast.info('Info', 'Here is some information');
```

## API Reference

### Basic Toast Methods

#### `toast.success(message, description?)`
Shows a success toast with green accent color.

```typescript
toast.success('Account created', 'Welcome to the platform!');
```

#### `toast.error(message, description?)`
Shows an error toast with red accent color.

```typescript
toast.error('Failed to save', 'Please try again later');
```

#### `toast.warning(message, description?)`
Shows a warning toast with yellow/orange accent color.

```typescript
toast.warning('Unsaved changes', 'Your changes will be lost');
```

#### `toast.info(message, description?)`
Shows an info toast with blue accent color.

```typescript
toast.info('New update', 'Version 2.0 is available');
```

### Advanced Methods

#### `toast.custom(message, options?)`
Shows a custom toast without a specific type.

```typescript
toast.custom('Custom notification', {
  description: 'This is a custom toast',
  duration: 5000,
});
```

#### `toast.promise(promise, options)`
Shows a toast that updates based on promise state (loading → success/error).

```typescript
const uploadData = async () => {
  // Your async operation
};

toast.promise(uploadData(), {
  loading: 'Uploading data...',
  success: 'Data uploaded successfully!',
  error: 'Failed to upload data',
});
```

You can also use functions for dynamic messages:

```typescript
toast.promise(fetchUser(), {
  loading: 'Loading user...',
  success: (data) => `Welcome ${data.name}!`,
  error: (err) => `Error: ${err.message}`,
});
```

#### `toast.dismiss(toastId?)`
Dismisses a specific toast or all toasts.

```typescript
// Dismiss all toasts
toast.dismiss();

// Dismiss specific toast
const id = toast.success('Message');
toast.dismiss(id);
```

## Customization

The toast styles are defined in `/src/shared/ui/common/VToaster.vue` and use your project's Tailwind custom colors:

- **Success**: Uses `positive` color
- **Error**: Uses `negative` color  
- **Warning**: Uses `warning` color
- **Info**: Uses `info` color
- **Background**: Uses `cardBg` color
- **Border**: Uses `cardBorder` color
- **Text**: Uses `mainText` and `secondaryText` colors

All colors automatically adapt when switching between light and dark themes.

## Configuration

The Toaster component is configured in `/src/app/App.vue`:

```vue
<VToaster />
```

Default settings:
- **Position**: top-right
- **Duration**: 4000ms (4 seconds)
- **Close button**: Enabled
- **Theme**: Auto-syncs with your app theme

## Examples

### File Upload with Toast

```typescript
import { useToast } from '@/shared/composables';

const toast = useToast();

const uploadFile = async (file: File) => {
  const uploadPromise = uploadToServer(file);
  
  toast.promise(uploadPromise, {
    loading: `Uploading ${file.name}...`,
    success: 'File uploaded successfully!',
    error: 'Upload failed. Please try again.',
  });
};
```

### Form Validation with Toast

```typescript
const handleSubmit = () => {
  if (!isValid) {
    toast.warning('Validation Error', 'Please fill in all required fields');
    return;
  }
  
  toast.success('Form submitted!', 'Your data has been saved');
};
```

### API Error Handling

```typescript
try {
  const response = await api.post('/data', payload);
  toast.success('Success!', 'Data saved successfully');
} catch (error) {
  toast.error('Failed to save', error.message);
}
```

## Demo

Visit the **More Components > Toasts** page in your app to see live examples and test all toast variants.

## Troubleshooting

### Toasts not showing
- Ensure `<VToaster />` is added to your App.vue
- Check that you're importing from `@/shared/composables`

### Theme not syncing
- Verify that your theme store is properly initialized
- Check that `useThemeStore` is correctly imported in VToaster.vue

### Styling issues
- Make sure all custom Tailwind colors are defined in `tailwind.config.js`
- Verify that the theme plugin (`createThemes`) is active

