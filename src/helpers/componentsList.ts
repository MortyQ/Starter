import VIcon from "@/components/VIcon.vue";
import VButton from "@/components/common/VButton.vue";
import VCard from "@/components/common/VCard.vue";
import VCheckbox from "@/components/common/VCheckbox.vue";
import VModal from "@/components/common/VModal.vue";
import VSearch from "@/components/common/VSearch.vue";
import VSwitch from "@/components/common/VSwitch.vue";

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
        description: "Feather icon name or Vue component",
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
          icon: "external-link",
          clickable: true,
        },
        code: `<VCard 
  variant="outlined"
  href="https://vuejs.org" 
  target="_blank" 
  title="Vue.js Documentation"
  subtitle="Official Framework Guide"
  icon="external-link"
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
        description: "Feather icon name (left side)",
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
        exampleProps: { icon: "plus", variant: "positive" },
        code: '<VButton icon="plus" variant="positive" />',
      },
      {
        title: "Negative Button with Text",
        exampleProps: { text: "Delete", icon: "trash", variant: "negative" },
        code: '<VButton text="Delete" icon="trash" variant="negative" />',
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
        exampleProps: { icon: "alert-triangle", variant: "warning" },
        code: '<VButton icon="alert-triangle" variant="warning" />',
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
      "Modern switch/toggle component с поддержкой тем, кастомных цветов, иконок и слотов. Подходит для современных UI.",
    component: VSwitch,
    props: [
      {
        name: "modelValue",
        type: "boolean",
        default: "false",
        description: "Текущее состояние переключателя (on/off)",
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        description: "Отключает переключатель",
      },
      {
        name: "trueIcon",
        type: "string",
        default: "—",
        description: "Иконка для состояния ON (использует иконки VButton)",
      },
      {
        name: "falseIcon",
        type: "string",
        default: "—",
        description: "Иконка для состояния OFF (использует иконки VButton)",
      },
      {
        name: "trueLabel",
        type: "string",
        default: "—",
        description: "Текст для состояния ON",
      },
      {
        name: "falseLabel",
        type: "string",
        default: "—",
        description: "Текст для состояния OFF",
      },
      {
        name: "color",
        type: "string",
        default: "primary",
        description: "Tailwind/темный цвет для активного состояния",
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
        exampleProps: { modelValue: false, trueIcon: "check", falseIcon: "x", color: "success" },
        code: `<VSwitch v-model="value" trueIcon="check" falseIcon="x" color="success" />`,
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
    name: "VModal",
    anchor: "vmodal",
    description:
      "Flexible modal dialog component with backdrop blur, transitions, multiple sizes, and slot support for header, content, and footer. Includes keyboard shortcuts and accessibility features.",
    component: VModal,
    props: [
      {
        name: "id",
        type: "string",
        default: "—",
        description: "Unique modal identifier (required)",
      },
      {
        name: "title",
        type: "string",
        default: '""',
        description: "Modal title text",
      },
      {
        name: "showCloseButton",
        type: "boolean",
        default: "true",
        description: "Show close button in header",
      },
      {
        name: "closeOnBackdrop",
        type: "boolean",
        default: "true",
        description: "Close modal when clicking backdrop",
      },
      {
        name: "closeOnEscape",
        type: "boolean",
        default: "true",
        description: "Close modal when pressing Escape key",
      },
      {
        name: "maxWidth",
        type: '"sm" | "md" | "lg" | "xl" | "2xl" | "full"',
        default: '"md"',
        description: "Maximum width of modal container",
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
];
