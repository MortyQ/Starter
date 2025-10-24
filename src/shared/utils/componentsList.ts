import VButton from "@/shared/ui/common/VButton.vue";
import VCard from "@/shared/ui/common/VCard.vue";
import VCheckbox from "@/shared/ui/common/VCheckbox.vue";
import VIcon from "@/shared/ui/common/VIcon.vue";
import VInput from "@/shared/ui/common/VInput.vue";
import VMultiSelect from "@/shared/ui/common/VMultiSelect.vue";
import VSearch from "@/shared/ui/common/VSearch.vue";
import VSwitch from "@/shared/ui/common/VSwitch.vue";
import VTabs from "@/shared/ui/common/VTabs.vue";

/**
 * List of reusable UI components for the /components library page.
 * Each entry contains:
 * - name: Display name
 * - anchor: URL anchor for navigation
 * - description: Short usage description
 * - component: The imported component
 * - props: Array of prop definitions (name, type, default, description)
 * - examples: Array of usage examples
 */
export const componentsList = [
  {
    name: "VCard",
    anchor: "vcard",
    description:
            "Flexible card component with multiple variants, sizes, and interactive capabilities for displaying content with consistent styling.",
    component: VCard,
    props: [
      {
        name: "variant",
        type: '"default" | "elevated" | "outlined" | "ghost"',
        default: '"default"',
        description: "Visual style variant of the card",
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg" | "xl" | "full"',
        default: '"md"',
        description: "Size of the card",
      },
      {
        name: "title",
        type: "string",
        default: "—",
        description: "Main title text",
      },
      {
        name: "subtitle",
        type: "string",
        default: "—",
        description: "Secondary title text",
      },
      {
        name: "description",
        type: "string",
        default: "—",
        description: "Description text below title",
      },
      {
        name: "loading",
        type: "boolean",
        default: "false",
        description: "Show loading state",
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        description: "Disable card interactions",
      },
      {
        name: "clickable",
        type: "boolean",
        default: "false",
        description: "Add hover effects and cursor pointer",
      },
      {
        name: "href",
        type: "string",
        default: "—",
        description: "Make card a link element",
      },
      {
        name: "icon",
        type: "string | Component",
        default: "—",
        description: "Icon name in VIcon format (e.g., 'mdi:link') or Vue component",
      },
      {
        name: "image",
        type: "string",
        default: "—",
        description: "Header image URL",
      },
      {
        name: "as",
        type: "string",
        default: '"div"',
        description: "HTML element type (div, button, etc.)",
      },
    ],
    examples: [
      {
        title: "Variant Comparison",
        exampleProps: { variant: "default", title: "Default", size: "sm" },
        code: `<div class="grid grid-cols-4 gap-4">
  <VCard variant="default" title="Default" size="sm">Standard card with shadow</VCard>
  <VCard variant="elevated" title="Elevated" size="sm">Interactive with hover effects</VCard>
  <VCard variant="outlined" title="Outlined" size="sm">Visible border style</VCard>
  <VCard variant="ghost" title="Ghost" size="sm">Transparent minimal style</VCard>
</div>`,
      },
      {
        title: "Interactive Link Card",
        exampleProps: {
          variant: "outlined",
          href: "https://vuejs.org",
          target: "_blank",
          title: "Vue.js Documentation",
          subtitle: "Official Framework Guide",
          icon: "mdi:link",
          clickable: true,
        },
        code: `<VCard 
  variant="outlined"
  href="https://vuejs.org" 
  target="_blank" 
  title="Vue.js Documentation"
  subtitle="Official Framework Guide"
  icon="mdi:link"
  clickable
>
  Click to visit Vue.js official website
</VCard>`,
      },
      {
        title: "Card with Image and Footer",
        exampleProps: {
          variant: "elevated",
          size: "lg",
          image: "https://picsum.photos/400/200?random=1",
          title: "Premium Feature",
          subtitle: "Advanced Component",
          radius: "lg",
        },
        code: `<VCard 
  variant="elevated"
  size="lg"
  image="https://picsum.photos/400/200?random=1"
  title="Premium Feature"
  subtitle="Advanced Component"
  radius="lg"
>
  <p>Rich content with image and footer</p>
  <template #footer>
    <div class="flex justify-between">
      <span class="text-xs bg-blue-100 px-2 py-1 rounded">Featured</span>
      <button class="px-3 py-1 bg-blue-500 text-white rounded text-sm">Learn More</button>
    </div>
  </template>
</VCard>`,
      },
      {
        title: "Loading States",
        exampleProps: { loading: true, title: "Loading Card", variant: "outlined" },
        code: `<VCard loading title="Loading Card" variant="outlined">
  <template #loading>
    <div class="text-center py-8">
      <div class="animate-spin h-8 w-8 border-b-2 border-blue-500 rounded-full mx-auto"></div>
      <p class="mt-2">Loading content...</p>
    </div>
  </template>
</VCard>`,
      },
    ],
  },
  {
    name: "VButton",
    anchor: "vbutton",
    description:
            "Universal button component with multiple variants, sizes, loading state, and router-link support. Now includes a modern 'link' variant for navigation and inline actions.",
    component: VButton,
    props: [
      {
        name: "variant",
        type: '"default" | "primary" | "positive" | "negative" | "warning" | "link"',
        default: '"default"',
        description: "Visual style variant of the button (including modern 'link' style)",
      },
      {
        name: "type",
        type: '"button" | "submit" | "reset"',
        default: '"button"',
        description: "Button type attribute (for native button only)",
      },
      {
        name: "to",
        type: "string | object",
        default: "—",
        description: "If set, button acts as a router-link (for navigation)",
      },
      {
        name: "replace",
        type: "boolean",
        default: "false",
        description: "Use router replace mode (for router-link)",
      },
      {
        name: "activeClass",
        type: "string",
        default: "—",
        description: "Custom active class for router-link",
      },
      {
        name: "exactActiveClass",
        type: "string",
        default: "—",
        description: "Custom exact active class for router-link",
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        description: "Disable button interactions",
      },
      {
        name: "loader",
        type: "boolean",
        default: "false",
        description: "Show loading spinner inside button",
      },
      {
        name: "icon",
        type: "string",
        default: "—",
        description: "Icon name in VIcon format (e.g., 'mdi:plus') for left side",
      },
      {
        name: "text",
        type: "string",
        default: "—",
        description: "Button text (if not using slot)",
      },
    ],
    examples: [
      {
        title: "Variants including Link",
        exampleProps: {
          variant: "link",
          text: "Route Link",
        },
        code: `<div class="flex flex-wrap gap-4">
  <VButton variant="link" to="about" text="Link">Link (Router)</VButton>
</div>`,
      },
      {
        title: "Positive Icon Button",
        exampleProps: { icon: "mdi:plus", variant: "positive" },
        code: '<VButton icon="mdi:plus" variant="positive" />',
      },
      {
        title: "Negative Button with Text",
        exampleProps: { text: "Delete", icon: "mdi:trash", variant: "negative" },
        code: '<VButton text="Delete" icon="mdi:trash" variant="negative" />',
      },
      {
        title: "Primary Button",
        exampleProps: { text: "Save", variant: "primary" },
        code: '<VButton text="Save" variant="primary" />',
      },
      {
        title: "Disabled Button",
        exampleProps: { text: "Disabled", disabled: true },
        code: '<VButton text="Disabled" disabled />',
      },
      {
        title: "Warning Icon Button",
        exampleProps: { icon: "mdi:alert-circle", variant: "warning" },
        code: '<VButton icon="mdi:alert-circle" variant="warning" />',
      },
    ],
  },
  {
    name: "VCheckbox",
    anchor: "vcheckbox",
    description: "Accessible, modern checkbox with indeterminate and disabled support, custom design, and label slot.",
    component: VCheckbox,
    props: [
      {
        name: "modelValue",
        type: "boolean | string | number | any",
        default: "false",
        description: "Checkbox value (v-model)",
      },
      { name: "id", type: "string", default: "—", description: "Input id (for label association)" },
      { name: "label", type: "string", default: "—", description: "Label text (or use slot)" },
      {
        name: "value",
        type: "string | number | boolean | any",
        default: "true",
        description: "Value for checkbox (for array/complex use)",
      },
      { name: "disabled", type: "boolean", default: "false", description: "Disable checkbox" },
      { name: "indeterminate", type: "boolean", default: "false", description: "Indeterminate visual state" },
    ],
    examples: [
      {
        title: "Basic Usage",
        exampleProps: { label: "Accept terms" },
        code: `<VCheckbox v-model="checked" label="Accept terms" />`,
      },
      {
        title: "Disabled",
        exampleProps: { disabled: true, label: "Disabled" },
        code: `<VCheckbox v-model="checked" label="Disabled" :disabled="true" />`,
      },
      {
        title: "Indeterminate",
        exampleProps: { indeterminate: true, label: "Indeterminate" },
        code: `<VCheckbox v-model="checked" label="Indeterminate" :indeterminate="true" />`,
      },
      {
        title: "Custom Label Slot",
        exampleProps: { label: "Custom label" },
        code: `<VCheckbox v-model="checked">
  <template #label>
    <span class='font-bold text-primary'>Custom label</span>
  </template>
</VCheckbox>`,
      },
    ],
  },
  {
    name: "VSwitch",
    anchor: "vswitch",
    description:
            "Modern switch/toggle component with theme support, custom colors, icons, and slots. Suitable for modern UIs.",
    component: VSwitch,
    props: [
      {
        name: "modelValue",
        type: "boolean",
        default: "false",
        description: "Current switch state (on/off)",
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        description: "Disables the switch",
      },
      {
        name: "trueIcon",
        type: "string",
        default: "—",
        description: "Icon for ON state (format: collection:name, e.g., mdi:check)",
      },
      {
        name: "falseIcon",
        type: "string",
        default: "—",
        description: "Icon for OFF state (format: collection:name, e.g., mdi:close-thick)",
      },
      {
        name: "trueLabel",
        type: "string",
        default: "—",
        description: "Text for ON state",
      },
      {
        name: "falseLabel",
        type: "string",
        default: "—",
        description: "Text for OFF state",
      },
      {
        name: "color",
        type: "string",
        default: "primary",
        description: "Tailwind/dark color for active state",
      },
    ],
    examples: [
      {
        title: "Basic Switch",
        exampleProps: { modelValue: true },
        code: `<VSwitch v-model="value" />`,
      },
      {
        title: "Switch with icons and color",
        exampleProps: { modelValue: true, trueIcon: "mdi:check", falseIcon: "mdi:close-thick", color: "red" },
        code: `<VSwitch v-model="value" trueIcon="mdi:check" falseIcon="mdi:close-thick" color="red" />`,
      },
      {
        title: "Switch with custom label via slot",
        exampleProps: { modelValue: true },
        code: `<VSwitch v-model="value">
  <template #default>
    {{ value ? 'Enabled' : 'Disabled' }}
  </template>
</VSwitch>`,
      },
      {
        title: "Disabled Switch",
        exampleProps: { modelValue: false, disabled: true },
        code: `<VSwitch v-model="value" disabled />`,
      },
    ],
  },
  {
    name: "VSearch",
    anchor: "vsearch",
    description:
            "Modern search input and textarea component with debounce, clear button, animated search icon, and focus effects. Supports both single-line and multi-line text input.",
    component: VSearch,
    props: [
      {
        name: "modelValue",
        type: "string",
        default: '""',
        description: "Input value (v-model)",
      },
      {
        name: "placeholder",
        type: "string",
        default: '"Search..." | "Type here..."',
        description: "Placeholder text for input/textarea",
      },
      {
        name: "debounceProp",
        type: "boolean",
        default: "true",
        description: "Enable debounce (800ms delay)",
      },
      {
        name: "textArea",
        type: "boolean",
        default: "false",
        description: "Render as textarea instead of input",
      },
      {
        name: "loading",
        type: "boolean",
        default: "false",
        description: "Show loading state (reserved for future use)",
      },
      {
        name: "text",
        type: "string",
        default: '"Search"',
        description: "Label text (currently unused)",
      },
    ],
    examples: [
      {
        title: "Basic Search Input with Debounce",
        exampleProps: { modelValue: "", placeholder: "Search products..." },
        code: `<VSearch v-model="searchQuery" placeholder="Search products..." />`,
      },
      {
        title: "Search without Debounce",
        exampleProps: { modelValue: "", placeholder: "Instant search", debounceProp: false },
        code: `<VSearch v-model="searchQuery" placeholder="Instant search" :debounceProp="false" />`,
      },
      {
        title: "Textarea Mode",
        exampleProps: { modelValue: "", placeholder: "Enter your message...", textArea: true },
        code: `<VSearch v-model="message" placeholder="Enter your message..." :textArea="true" />`,
      },
      {
        title: "With Initial Value",
        exampleProps: { modelValue: "Vue.js", placeholder: "Search..." },
        code: `<VSearch v-model="searchQuery" placeholder="Search..." />
<!-- searchQuery = "Vue.js" -->`,
      },
    ],
  },
  {
    name: "VIcon",
    anchor: "vicon",
    description:
            "Universal icon component using unplugin-icons. Supports dynamic icon loading from multiple icon sets (Material Design Icons, Heroicons, etc.) with customizable size, color, and loading state.",
    component: VIcon,
    props: [
      {
        name: "icon",
        type: "string",
        default: "—",
        description: 'Icon name in format "collection:name" (e.g., "mdi:home", "heroicons:user-solid")',
      },
      {
        name: "size",
        type: "string | number",
        default: "24",
        description: "Icon size in pixels",
      },
      {
        name: "color",
        type: "string",
        default: '"currentColor"',
        description: "Icon color (CSS color value)",
      },
      {
        name: "class",
        type: "string",
        default: '""',
        description: "Additional CSS classes",
      },
      {
        name: "loading",
        type: "boolean",
        default: "false",
        description: "Show loading spinner (mdi:loading with animation)",
      },
    ],
    examples: [
      {
        title: "Basic Icons",
        exampleProps: { icon: "mdi:home", size: 24 },
        code: `<div class="flex gap-4 items-center">
  <VIcon icon="mdi:home" />
  <VIcon icon="mdi:account" />
  <VIcon icon="mdi:cog" />
  <VIcon icon="mdi:heart" />
</div>`,
      },
      {
        title: "Different Sizes",
        exampleProps: { icon: "mdi:star" },
        code: `<div class="flex gap-4 items-center">
  <VIcon icon="mdi:star" :size="16" />
  <VIcon icon="mdi:star" :size="24" />
  <VIcon icon="mdi:star" :size="32" />
  <VIcon icon="mdi:star" :size="48" />
</div>`,
      },
      {
        title: "Custom Colors",
        exampleProps: { icon: "mdi:palette", size: 32, color: "#f59e0b" },
        code: `<div class="flex gap-4 items-center">
  <VIcon icon="mdi:palette" :size="32" color="#f59e0b" />
  <VIcon icon="mdi:palette" :size="32" color="#3b82f6" />
  <VIcon icon="mdi:palette" :size="32" color="#22c55e" />
  <VIcon icon="mdi:palette" :size="32" color="#f59e0b" />
</div>`,
      },
      {
        title: "Loading State",
        exampleProps: { icon: "mdi:loading", size: 32, loading: true },
        code: `<VIcon icon="mdi:loading" :size="32" :loading="true" />
`,
      },
    ],
  },
  {
    name: "VInput",
    anchor: "vinput",
    description:
            "Modern input component with icon support, validation states, password toggle, multiple sizes, and XSS protection. Fully themed with light/dark mode support.",
    component: VInput,
    props: [
      {
        name: "modelValue",
        type: "string | number",
        default: '""',
        description: "Input value (v-model)",
      },
      {
        name: "name",
        type: "string",
        default: '""',
        description: "Label text displayed above input",
      },
      {
        name: "type",
        type: "string",
        default: '"text"',
        description: "Input type (text, password, email, number, date, etc.)",
      },
      {
        name: "placeholder",
        type: "string",
        default: '""',
        description: "Placeholder text",
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        description: "Disable input",
      },
      {
        name: "supportText",
        type: "string",
        default: '""',
        description: "Helper text displayed below input",
      },
      {
        name: "validation",
        type: "Validation",
        default: "undefined",
        description: "Validation object with $error and $errors properties",
      },
      {
        name: "icon",
        type: "string",
        default: '""',
        description: 'Icon name for left side (e.g., "mdi:email")',
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        default: '"md"',
        description: "Input size (sm: 36px, md: 44px, lg: 48px)",
      },
    ],
    examples: [
      {
        title: "Basic Input",
        exampleProps: { placeholder: "Enter your name", name: "Name" },
        code: `<VInput v-model="name" placeholder="Enter your name" name="Name" />`,
      },
      {
        title: "Input with Icon",
        exampleProps: {
          placeholder: "Enter email",
          name: "Email",
          icon: "mdi:email",
          type: "email",
        },
        code: `<VInput 
  v-model="email" 
  placeholder="Enter email" 
  name="Email"
  icon="mdi:email"
  type="email" 
/>`,
      },
      {
        title: "Password Input",
        exampleProps: {
          type: "password",
          placeholder: "Enter password",
          name: "Password",
          icon: "mdi:lock",
        },
        code: `<VInput 
  v-model="password" 
  type="password" 
  placeholder="Enter password"
  name="Password"
  icon="mdi:lock"
/>`,
      },
      {
        title: "Input with Support Text",
        exampleProps: {
          placeholder: "Username",
          name: "Username",
          supportText: "Choose a unique username (4-20 characters)",
        },
        code: `<VInput 
  v-model="username" 
  placeholder="Username" 
  name="Username"
  supportText="Choose a unique username (4-20 characters)" 
/>`,
      },
      {
        title: "Different Sizes",
        exampleProps: { placeholder: "Small input", size: "sm" },
        code: `<div class="space-y-4">
  <VInput v-model="value" placeholder="Small input" size="sm" />
  <VInput v-model="value" placeholder="Medium input" size="md" />
  <VInput v-model="value" placeholder="Large input" size="lg" />
</div>`,
      },
      {
        title: "Disabled State",
        exampleProps: {
          placeholder: "Disabled input",
          disabled: true,
          modelValue: "Cannot edit this",
        },
        code: `<VInput 
  v-model="value" 
  placeholder="Disabled input" 
  :disabled="true" 
/>`,
      },
      {
        title: "Error State with Validation",
        exampleProps: {
          placeholder: "Enter email",
          name: "Email with error",
          icon: "mdi:email",
          validation: {
            $error: true,
            $errors: [{ $message: "Please enter a valid email address" }],
          },
        },
        code: `<VInput 
  v-model="email" 
  placeholder="Enter email"
  name="Email"
  icon="mdi:email"
  :validation="{ 
    $error: true, 
    $errors: [{ $message: 'Please enter a valid email address' }] 
  }" 
/>`,
      },
    ],
  },
  {
    name: "VMultiSelect",
    anchor: "vmultiselect",
    description:
      "Modern select and multi-select component based on vue-multiselect with custom styling, search functionality, loading state, and full theme support. Supports single and multiple selection modes.",
    component: VMultiSelect,
    props: [
      {
        name: "modelValue",
        type: "Option | Option[] | null",
        default: "null",
        description: "Selected value(s) - single object or array of objects",
      },
      {
        name: "options",
        type: "Option[]",
        default: "[]",
        description: "Array of options with { label, value } structure",
      },
      {
        name: "placeholder",
        type: "string",
        default: '"Select option"',
        description: "Placeholder text when no option is selected",
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        description: "Disable the select input",
      },
      {
        name: "multiple",
        type: "boolean",
        default: "false",
        description: "Enable multiple selection mode",
      },
      {
        name: "searchable",
        type: "boolean",
        default: "true",
        description: "Enable search/filter functionality",
      },
      {
        name: "clearOnSelect",
        type: "boolean",
        default: "true",
        description: "Clear search input after selection",
      },
      {
        name: "closeOnSelect",
        type: "boolean",
        default: "true",
        description: "Close dropdown after selection",
      },
      {
        name: "loading",
        type: "boolean",
        default: "false",
        description: "Show loading state with spinner",
      },
      {
        name: "label",
        type: "string",
        default: '"label"',
        description: "Property name to use for option label",
      },
      {
        name: "trackBy",
        type: "string",
        default: '"value"',
        description: "Property name to track option by",
      },
    ],
    examples: [
      {
        title: "Single Select",
        exampleProps: {
          options: [
            { label: "Option 1", value: "opt1" },
            { label: "Option 2", value: "opt2" },
            { label: "Option 3", value: "opt3" },
          ],
          placeholder: "Choose one option",
        },
        code: `<VMultiSelect
  v-model="selectedValue"
  :options="options"
  placeholder="Choose one option"
/>

// options = [
//   { label: "Option 1", value: "opt1" },
//   { label: "Option 2", value: "opt2" },
//   { label: "Option 3", value: "opt3" }
// ]`,
      },
      {
        title: "Multiple Select",
        exampleProps: {
          options: [
            { label: "Vue", value: "vue" },
            { label: "React", value: "react" },
            { label: "Angular", value: "angular" },
            { label: "Svelte", value: "svelte" },
          ],
          placeholder: "Choose frameworks",
          multiple: true,
          closeOnSelect: false,
        },
        code: `<VMultiSelect
  v-model="selectedFrameworks"
  :options="frameworks"
  placeholder="Choose frameworks"
  multiple
  :close-on-select="false"
/>`,
      },
      {
        title: "Not Searchable",
        exampleProps: {
          options: [
            { label: "Small", value: "sm" },
            { label: "Medium", value: "md" },
            { label: "Large", value: "lg" },
          ],
          placeholder: "Select size",
          searchable: false,
        },
        code: `<VMultiSelect
  v-model="size"
  :options="sizes"
  placeholder="Select size"
  :searchable="false"
/>`,
      },
      {
        title: "Loading State",
        exampleProps: {
          options: [],
          placeholder: "Loading...",
          loading: true,
        },
        code: `<VMultiSelect
  v-model="value"
  :options="options"
  placeholder="Loading..."
  :loading="true"
/>`,
      },
      {
        title: "Disabled State",
        exampleProps: {
          options: [{ label: "Option", value: "opt" }],
          placeholder: "Disabled",
          disabled: true,
          modelValue: { label: "Option", value: "opt" },
        },
        code: `<VMultiSelect
  v-model="value"
  :options="options"
  placeholder="Disabled"
  :disabled="true"
/>`,
      },
    ],
  },
  {
    name: "VTabs",
    anchor: "vtabs",
    description:
      "Modern tabs component with URL hash support, keyboard navigation, loading states, and customizable styling. Automatically syncs active tab with browser URL for better UX and bookmarkability.",
    component: VTabs,
    props: [
      {
        name: "tabs",
        type: "ITab[]",
        default: "[]",
        description: "Array of tab objects with { id, label, disabled?, icon?, styles?, activeByDefault? }",
      },
      {
        name: "loader",
        type: "boolean",
        default: "false",
        description: "Show loading skeleton instead of tabs",
      },
      {
        name: "reset",
        type: "boolean",
        default: "false",
        description: "Reset to first tab when changed to true",
      },
    ],
    examples: [
      {
        title: "Basic Tabs",
        exampleProps: {
          tabs: [
            { id: "tab1", label: "First Tab" },
            { id: "tab2", label: "Second Tab" },
            { id: "tab3", label: "Third Tab" },
          ],
        },
        code: `<VTabs :tabs="tabs">
  <template #tab1>
    <div class="p-4">Content for First Tab</div>
  </template>
  <template #tab2>
    <div class="p-4">Content for Second Tab</div>
  </template>
  <template #tab3>
    <div class="p-4">Content for Third Tab</div>
  </template>
</VTabs>

// tabs = [
//   { id: "tab1", label: "First Tab" },
//   { id: "tab2", label: "Second Tab" },
//   { id: "tab3", label: "Third Tab" }
// ]`,
      },
      {
        title: "Tabs with Icons",
        exampleProps: {
          tabs: [
            { id: "home", label: "Home", icon: "mdi:home" },
            { id: "settings", label: "Settings", icon: "mdi:cog" },
            { id: "profile", label: "Profile", icon: "mdi:account" },
          ],
        },
        code: `<VTabs :tabs="tabs">
  <template #home>
    <div class="p-4">Home Content</div>
  </template>
  <template #settings>
    <div class="p-4">Settings Content</div>
  </template>
  <template #profile>
    <div class="p-4">Profile Content</div>
  </template>
</VTabs>

// tabs = [
//   { id: "home", label: "Home", icon: "mdi:home" },
//   { id: "settings", label: "Settings", icon: "mdi:cog" },
//   { id: "profile", label: "Profile", icon: "mdi:account" }
// ]`,
      },
      {
        title: "Tabs with Disabled State",
        exampleProps: {
          tabs: [
            { id: "available", label: "Available" },
            { id: "disabled", label: "Disabled", disabled: true },
            { id: "active", label: "Active" },
          ],
        },
        code: `<VTabs :tabs="tabs">
  <template #available>
    <div class="p-4">Available Content</div>
  </template>
  <template #disabled>
    <div class="p-4">This tab is disabled</div>
  </template>
  <template #active>
    <div class="p-4">Active Content</div>
  </template>
</VTabs>

// tabs = [
//   { id: "available", label: "Available" },
//   { id: "disabled", label: "Disabled", disabled: true },
//   { id: "active", label: "Active" }
// ]`,
      },
      {
        title: "Loading State",
        exampleProps: {
          tabs: [{ id: "tab1", label: "Tab 1" }, { id: "tab2", label: "Tab 2" }],
          loader: true,
        },
        code: `<VTabs :tabs="tabs" :loader="true">
  <!-- Content slots -->
</VTabs>`,
      },
    ],
  },
  {
    name: "Toast",
    anchor: "toast",
    description:
      "Beautiful toast notifications powered by vue-sonner. Fully styled to match your theme. Import the composable to use toast notifications throughout your app.",
    component: null as never,
    props: [
      {
        name: "toast.success(message, description?)",
        type: "function",
        default: "—",
        description: "Show success toast with green accent",
      },
      {
        name: "toast.error(message, description?)",
        type: "function",
        default: "—",
        description: "Show error toast with red accent",
      },
      {
        name: "toast.warning(message, description?)",
        type: "function",
        default: "—",
        description: "Show warning toast with yellow/orange accent",
      },
      {
        name: "toast.info(message, description?)",
        type: "function",
        default: "—",
        description: "Show info toast with blue accent",
      },
      {
        name: "toast.promise(promise, options)",
        type: "function",
        default: "—",
        description: "Show toast with promise states (loading → success/error)",
      },
      {
        name: "toast.dismiss(toastId?)",
        type: "function",
        default: "—",
        description: "Dismiss a specific toast or all toasts",
      },
    ],
    examples: [
      {
        title: "Import and Initialize",
        exampleProps: {},
        code: `import { useToast } from '@/shared/composables';

const toast = useToast();

// Now you can use toast methods anywhere in your component`,
      },
      {
        title: "Basic Toast Types",
        exampleProps: {},
        code: `// Success notification
toast.success('Success!', 'Operation completed successfully');

// Error notification
toast.error('Error!', 'Something went wrong');

// Warning notification
toast.warning('Warning!', 'Please check your input');

// Info notification
toast.info('Information', 'Here is some information');`,
      },
      {
        title: "Promise-based Toast (Async Operations)",
        exampleProps: {},
        code: `// Show loading state, then success or error
const uploadData = async () => {
  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData
  });
  return response.json();
};

toast.promise(uploadData(), {
  loading: 'Uploading data...',
  success: 'Data uploaded successfully!',
  error: 'Failed to upload data',
});

// With dynamic messages
toast.promise(fetchUser(id), {
  loading: 'Loading user...',
  success: (data) => 'Welcome ' + data.name + '!',
  error: (err) => 'Error: ' + err.message,
});`,
      },
    ],
  },
];
