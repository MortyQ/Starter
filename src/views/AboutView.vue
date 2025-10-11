<script setup lang="ts">
// This view is purely informational, no reactive state needed
</script>

<template>
  <div class="max-w-4xl mx-auto space-y-8">
    <!-- About Header -->
    <section class="text-center">
      <h1 class="text-4xl font-bold text-primary mb-4">
        About This Template
      </h1>
      <p class="text-xl text-secondary">
        Learn more about the architecture and decisions behind this starter template
      </p>
    </section>

    <!-- Architecture Overview -->
    <section class="card">
      <h2 class="text-2xl font-semibold mb-4">
        Architecture Overview
      </h2>
      <div class="prose prose-neutral max-w-none">
        <p class="mb-4">
          This Vue 3 starter template is designed with senior
          frontend architect principles in mind, focusing on
          maintainability, scalability, and developer experience.
        </p>

        <h3 class="text-lg font-medium mb-2">
          Key Design Decisions:
        </h3>
        <ul class="list-disc list-inside space-y-2 text-secondary">
          <li>
            <strong>Composition API:</strong>
            Modern Vue 3 approach for better TypeScript integration
          </li>
          <li>
            <strong>Minimal TypeScript:</strong>
            Strict mode disabled for easier adoption
          </li>
          <li>
            <strong>Custom Theme System:</strong>
            CSS custom properties with Tailwind integration
          </li>
          <li>
            <strong>Modular Architecture:</strong>
            Clear separation of concerns across folders
          </li>
          <li>
            <strong>Performance First:</strong>
            Lazy loading and code splitting by default
          </li>
        </ul>
      </div>
    </section>

    <!-- Folder Structure -->
    <section class="card">
      <h2 class="text-2xl font-semibold mb-4">
        Folder Structure
      </h2>
      <div class="bg-base-200 p-4 rounded-lg font-mono text-sm">
        <div class="space-y-1">
          <div>src/</div>
          <div class="ml-4">
            ├── components/
            <span class="text-secondary"># Reusable UI components</span>
          </div>
          <div class="ml-4">
            ├── views/
            <span class="text-secondary"># Page-level components</span>
          </div>
          <div class="ml-4">
            ├── stores/
            <span class="text-secondary"># Pinia state management</span>
          </div>
          <div class="ml-4">
            ├── router/
            <span class="text-secondary"># Vue Router configuration</span>
          </div>
          <div class="ml-4">
            ├── utils/
            <span class="text-secondary"># Helper functions</span>
          </div>
          <div class="ml-4">
            ├── types/
            <span class="text-secondary"># TypeScript type definitions</span>
          </div>
          <div class="ml-4">
            └── assets/
            <span class="text-secondary"># Static assets and styles</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Tech Stack -->
    <section class="card">
      <h2 class="text-2xl font-semibold mb-4">
        Technology Stack
      </h2>
      <div class="grid md:grid-cols-2 gap-6">
        <div>
          <h3 class="font-medium mb-2">
            Core Technologies
          </h3>
          <ul class="space-y-1 text-secondary">
            <li>• Vue 3 (Composition API)</li>
            <li>• TypeScript (Minimal config)</li>
            <li>• Vite (Build tool)</li>
            <li>• pnpm (Package manager)</li>
          </ul>
        </div>
        <div>
          <h3 class="font-medium mb-2">
            Development Tools
          </h3>
          <ul class="space-y-1 text-secondary">
            <li>• ESLint (Code linting)</li>
            <li>• Prettier (Code formatting)</li>
            <li>• Tailwind CSS (Styling)</li>
            <li>• Vue Router & Pinia</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Getting Started -->
    <section class="card">
      <h2 class="text-2xl font-semibold mb-4">
        Getting Started
      </h2>
      <div class="space-y-4">
        <div>
          <h3 class="font-medium mb-2">
            Development Commands
          </h3>
          <div class="bg-base-200 p-3 rounded font-mono text-sm space-y-1">
            <div>
              <span class="text-accent">pnpm dev</span>
              - Start development server
            </div>
            <div>
              <span class="text-accent">pnpm build</span>
              - Build for production
            </div>
            <div>
              <span class="text-accent">pnpm lint</span>
              - Lint and fix code issues
            </div>
          </div>
        </div>

        <div>
          <h3 class="font-medium mb-2">
            Theme System
          </h3>
          <p class="text-secondary mb-2">
            The custom theme system uses CSS custom properties and can be extended easily:
          </p>
          <div class="bg-base-200 p-3 rounded font-mono text-sm">
            <div>// Add new themes in tailwind.config.js</div>
            <div>createThemes({ newTheme: { primary: '#color' } })</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
