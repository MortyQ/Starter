<script setup lang="ts">
import { RouterLink, useRouter } from "vue-router";

const router = useRouter();

function goBack() {
  // Go back in history, or to home if no history
  if (window.history.length > 1) {
    router.go(-1);
  } else {
    router.push("/");
  }
}
</script>

<template>
  <div class="text-center py-16">
    <div class="max-w-md mx-auto">
      <div class="text-6xl mb-4">
        🔍
      </div>
      <h1 class="text-4xl font-bold text-primary mb-4">
        Page Not Found
      </h1>
      <p class="text-lg text-secondary mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div class="space-x-4">
        <RouterLink
          to="/"
          class="btn btn-primary"
        >
          Go Home
        </RouterLink>
        <button
          class="btn btn-secondary"
          @click="goBack"
        >
          Go Back
        </button>
      </div>
    </div>
  </div>
</template>
