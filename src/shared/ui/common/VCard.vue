<script lang="ts" setup>
import { computed } from "vue";

import type { CardProps, CardEmits, CardSlots } from "@/shared/types/components/card";
import VIcon from "@/shared/ui/common/VIcon.vue";
import BaseLoader from "@/shared/ui/common/VLoader.vue";

const props = withDefaults(defineProps<CardProps>(), {
  variant: "default",
  size: "md",
  radius: "md",
  padding: "md",
  as: "div",
  target: "_self",
});

const emit = defineEmits<CardEmits>();

// Computed properties
const hasHeader = computed(() => props.title
    || props.subtitle || props.icon
    || props.image || !!slots.header);

const hasFooter = computed(() => !!slots.footer);

const isInteractive = computed(() => props.clickable || props.href || props.as === "button");

const componentTag = computed(() => {
  if (props.href) return "a";
  return props.as;
});

// Style classes computation
const cardClasses = computed(() => {
  const classes = ["card"];

  // Card variant - always apply variant class for consistency
  classes.push(`card--${props.variant}`);

  // Size
  classes.push(`card--${props.size}`);

  // Border radius
  classes.push(`card--radius-${props.radius}`);

  // Padding
  classes.push(`card--padding-${props.padding}`);

  // States
  if (props.disabled) classes.push("card--disabled");
  if (props.loading) classes.push("card--loading");
  if (isInteractive.value) classes.push("card--interactive");

  return classes;
});

const linkAttrs = computed(() => {
  if (!props.href) return {};

  return {
    href: props.href,
    target: props.target,
    rel: props.target === "_blank" ? "noopener noreferrer" : undefined,
  };
});

// Slots
const slots = defineSlots<CardSlots>();

// Event handlers
const handleClick = (event: MouseEvent) => {
  if (props.disabled || props.loading) {
    event.preventDefault();
    return;
  }

  emit("click", event);
};
</script>

<template>
  <component
    :is="componentTag"
    :class="cardClasses"
    v-bind="linkAttrs"
    @click="handleClick"
  >
    <!-- Loading state -->
    <div
      v-if="loading"
      class="card__loading"
    >
      <slot name="loading">
        <BaseLoader />
      </slot>
    </div>

    <!-- Main content -->
    <template v-else>
      <!-- Image -->
      <div
        v-if="image || slots.image"
        class="card__image"
      >
        <slot name="image">
          <img
            :alt="imageAlt || title || 'Card image'"
            :src="image"
          >
        </slot>
      </div>

      <!-- Header -->
      <header
        v-if="hasHeader"
        class="card__header"
      >
        <slot name="header">
          <div class="card__header-content">
            <!-- Icon -->
            <VIcon
              v-if="props.icon"
              :icon="props.icon"
              class="card__icon"
            />
            <component
              :is="icon"
              v-else-if="icon && typeof icon !== 'string'"
              class="card__icon"
            />

            <!-- Header text content -->
            <div
              v-if="title || subtitle"
              class="card__header-text"
            >
              <h3
                v-if="title"
                class="card__title"
              >
                {{ title }}
              </h3>
              <p
                v-if="subtitle"
                class="card__subtitle"
              >
                {{ subtitle }}
              </p>
            </div>
          </div>

          <p
            v-if="description"
            class="card__description"
          >
            {{ description }}
          </p>
        </slot>
      </header>

      <!-- Main content -->
      <main class="card__content">
        <slot />
      </main>

      <!-- Footer -->
      <footer
        v-if="hasFooter"
        class="card__footer"
      >
        <slot name="footer" />
      </footer>
    </template>
  </component>
</template>
