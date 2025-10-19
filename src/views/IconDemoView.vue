<script setup lang="ts">
import VIcon from "@/components/VIcon.vue";
import VButton from "@/components/common/VButton.vue";

// Example of dynamic icon in array
const navigationItems = [
  { id: 1, name: "Home", icon: "mdi:home" },
  { id: 2, name: "Search", icon: "mdi:search" },
  { id: 3, name: "Settings", icon: "mdi:settings" },
  { id: 4, name: "User Profile", icon: "mdi:user" },
];

const actionButtons = [
  { action: "add", icon: "mdi:plus", color: "#10b981" },
  { action: "edit", icon: "mdi:edit", color: "#3b82f6" },
  { action: "delete", icon: "mdi:delete", color: "#ef4444" },
  { action: "check", icon: "mdi:check", color: "#8b5cf6" },
];
</script>

<template>
  <div class="p-8 space-y-8">
    <h1 class="text-3xl font-bold text-mainText mb-8">
      VIcon Component Demo
    </h1>

    <!-- Basic Usage -->
    <section class="space-y-4">
      <h2 class="text-2xl font-semibold text-mainText">
        Basic Usage
      </h2>
      <div class="flex gap-4 items-center flex-wrap">
        <VIcon icon="mdi:home" />
        <VIcon icon="mdi:search" />
        <VIcon icon="mdi:settings" />
        <VIcon icon="mdi:user" />
        <VIcon icon="mdi:menu" />
      </div>
    </section>

    <!-- Different Sizes -->
    <section class="space-y-4">
      <h2 class="text-2xl font-semibold text-mainText">
        Different Sizes
      </h2>
      <div class="flex gap-4 items-center flex-wrap">
        <VIcon
          icon="mdi:home"
          :size="16"
        />
        <VIcon
          icon="mdi:home"
          :size="24"
        />
        <VIcon
          icon="mdi:home"
          :size="32"
        />
        <VIcon
          icon="mdi:home"
          :size="48"
        />
        <VIcon
          icon="mdi:home"
          :size="64"
        />
      </div>
    </section>

    <!-- Different Colors -->
    <section class="space-y-4">
      <h2 class="text-2xl font-semibold text-mainText">
        Different Colors
      </h2>
      <div class="flex gap-4 items-center flex-wrap">
        <VIcon
          icon="mdi:home"
          :size="32"
          color="#ef4444"
        />
        <VIcon
          icon="mdi:home"
          :size="32"
          color="#10b981"
        />
        <VIcon
          icon="mdi:home"
          :size="32"
          color="#3b82f6"
        />
        <VIcon
          icon="mdi:home"
          :size="32"
          color="#f59e0b"
        />
        <VIcon
          icon="mdi:home"
          :size="32"
          color="#8b5cf6"
        />
      </div>
    </section>

    <!-- Dynamic Icons in v-for -->
    <section class="space-y-4">
      <h2 class="text-2xl font-semibold text-mainText">
        Dynamic Icons (v-for)
      </h2>
      <div class="flex gap-4 flex-wrap">
        <div
          v-for="item in navigationItems"
          :key="item.id"
          class="flex items-center gap-2 px-4 py-2 bg-cardBg border border-cardBorder rounded-lg"
        >
          <VIcon
            :icon="item.icon"
            :size="20"
            color="currentColor"
          />
          <span class="text-mainText">{{ item.name }}</span>
        </div>
      </div>
    </section>

    <!-- Action Buttons with Icons -->
    <section class="space-y-4">
      <h2 class="text-2xl font-semibold text-mainText">
        Action Buttons with Colored Icons
      </h2>
      <div class="flex gap-4 flex-wrap">
        <VButton
          v-for="btn in actionButtons"
          :key="btn.action"
        >
          <VIcon
            :icon="btn.icon"
            :size="20"
            :color="btn.color"
          />
          <span class="capitalize">{{ btn.action }}</span>
        </VButton>
      </div>
    </section>

    <!-- Icon Collections -->
    <section class="space-y-4">
      <h2 class="text-2xl font-semibold text-mainText">
        Different Icon Collections
      </h2>

      <div class="space-y-6">
        <!-- Material Design Icons -->
        <div class="space-y-2">
          <h3 class="text-lg font-medium text-secondaryText">
            Material Design Icons (mdi)
          </h3>
          <div class="flex gap-4 items-center flex-wrap">
            <VIcon
              icon="mdi:home"
              :size="32"
            />
            <VIcon
              icon="mdi:alert"
              :size="32"
            />
            <VIcon
              icon="mdi:info"
              :size="32"
            />
            <VIcon
              icon="mdi:check"
              :size="32"
            />
            <VIcon
              icon="mdi:close"
              :size="32"
            />
          </div>
        </div>

        <!-- Heroicons -->
        <div class="space-y-2">
          <h3 class="text-lg font-medium text-secondaryText">
            Heroicons
          </h3>
          <div class="flex gap-4 items-center flex-wrap">
            <VIcon
              icon="heroicons:home-solid"
              :size="32"
            />
            <VIcon
              icon="heroicons:user-solid"
              :size="32"
            />
            <VIcon
              icon="heroicons:cog-solid"
              :size="32"
            />
            <VIcon
              icon="heroicons:x-mark-solid"
              :size="32"
            />
          </div>
        </div>

        <!-- Lucide -->
        <div class="space-y-2">
          <h3 class="text-lg font-medium text-secondaryText">
            Lucide Icons
          </h3>
          <div class="flex gap-4 items-center flex-wrap">
            <VIcon
              icon="lucide:home"
              :size="32"
            />
            <VIcon
              icon="lucide:user"
              :size="32"
            />
            <VIcon
              icon="lucide:settings"
              :size="32"
            />
            <VIcon
              icon="lucide:menu"
              :size="32"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Chevrons and Arrows -->
    <section class="space-y-4">
      <h2 class="text-2xl font-semibold text-mainText">
        Navigation Icons
      </h2>
      <div class="flex gap-4 items-center flex-wrap">
        <VIcon
          icon="mdi:chevron-left"
          :size="32"
        />
        <VIcon
          icon="mdi:chevron-right"
          :size="32"
        />
        <VIcon
          icon="mdi:chevron-up"
          :size="32"
        />
        <VIcon
          icon="mdi:chevron-down"
          :size="32"
        />
        <VIcon
          icon="mdi:arrow-left"
          :size="32"
        />
        <VIcon
          icon="mdi:arrow-right"
          :size="32"
        />
      </div>
    </section>

    <!-- Loading Icon -->
    <section class="space-y-4">
      <h2 class="text-2xl font-semibold text-mainText">
        Animated Icon (Loading)
      </h2>
      <div class="flex gap-4 items-center">
        <VIcon
          icon="mdi:loading"
          :size="32"
          class="animate-spin"
        />
        <span class="text-secondaryText">Loading...</span>
      </div>
    </section>

    <!-- Usage Info -->
    <section class="mt-8 p-6 bg-cardBg border border-cardBorder rounded-lg">
      <h2 class="text-xl font-semibold text-mainText mb-4">
        Usage Information
      </h2>
      <div class="space-y-2 text-secondaryText">
        <p>
          <strong>Icon Format:</strong>
          Use "collection:name" format
          (e.g., "mdi:home", "heroicons:user-solid")
        </p>
        <p>
          <strong>Size:</strong> Pass number (pixels) or string with units
        </p>
        <p>
          <strong>Color:</strong> Use any valid CSS color
          (hex, rgb, named colors, or "currentColor")
        </p>
        <p>
          <strong>Dynamic Usage:</strong> Works perfectly with v-for loops and dynamic data
        </p>
        <p>
          <strong>Add New Icons:</strong> Edit the iconMap in VIcon.vue component
        </p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.space-y-2 > * + * {
  margin-top: 0.5rem;
}

.space-y-4 > * + * {
  margin-top: 1rem;
}

.space-y-6 > * + * {
  margin-top: 1.5rem;
}

.space-y-8 > * + * {
  margin-top: 2rem;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>

