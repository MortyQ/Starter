<script setup lang="ts">
import VIcon from "@/shared/ui/common/VIcon.vue";
</script>

<template>
  <div class="table-pagination">
    <!-- Left: Info about displayed items -->
    <div class="table-pagination-info">
      Showing
      <span class="table-pagination-info-highlight">1–10</span>
      of
      <span class="table-pagination-info-highlight">100</span>
    </div>

    <!-- Center: Page controls -->
    <div class="table-pagination-controls">
      <!-- Previous button -->
      <button
        class="table-pagination-btn"
        disabled
        aria-label="Previous page"
      >
        <VIcon
          icon="mdi:chevron-left"
          :size="18"
        />
      </button>

      <!-- Page numbers -->
      <button class="table-pagination-btn table-pagination-btn--active">
        1
      </button>
      <button class="table-pagination-btn">
        2
      </button>
      <button class="table-pagination-btn">
        3
      </button>

      <!-- Ellipsis for many pages -->
      <span class="table-pagination-ellipsis">...</span>

      <button class="table-pagination-btn">
        10
      </button>

      <!-- Next button -->
      <button
        class="table-pagination-btn"
        aria-label="Next page"
      >
        <VIcon
          icon="mdi:chevron-right"
          :size="18"
        />
      </button>
    </div>

    <!-- Right: Items per page selector -->
    <div class="table-pagination-size">
      <label for="pagination-size">Rows:</label>
      <select id="pagination-size">
        <option value="10">
          10
        </option>
        <option value="25">
          25
        </option>
        <option value="50">
          50
        </option>
        <option value="100">
          100
        </option>
      </select>
    </div>
  </div>
</template>

<style scoped>
/* Styles defined in assets/styles/_pagination.scss */
</style>
