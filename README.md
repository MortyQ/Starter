# Vue 3 TypeScript Starter Template

A modern, well-architected Vue 3 starter template with TypeScript, Tailwind CSS, ESLint, and Prettier - designed from a
senior frontend architect perspective with focus on maintainability, scalability, and best practices.

## 🚀 Features

- **Vue 3** with Composition API and `<script setup>`
- **TypeScript** with minimal configuration (strict mode off for easier adoption)
- **Tailwind CSS** with custom theme system using CSS custom properties
- **Vue Router 4** with lazy loading and navigation guards
- **Pinia** for state management with TypeScript support
- **Vite** for lightning-fast development and optimized builds
- **ESLint + Prettier** with modern best practices and auto-fix on save
- **pnpm** as package manager for faster installs
- **Modular architecture** with clear separation of concerns

## 📁 Project Structure

```
src/
├── components/     # Reusable UI components
├── views/          # Page-level components (route components)
├── stores/         # Pinia state management stores
├── router/         # Vue Router configuration
├── utils/          # Helper functions and utilities
├── types/          # TypeScript type definitions
└── assets/         # Static assets and global styles
```

## 🛠️ Tech Stack

### Core

- **Vue 3.4+** - Progressive JavaScript framework
- **TypeScript 5.3+** - Type-safe JavaScript
- **Vite 5.0+** - Next generation frontend tooling
- **pnpm 8.0+** - Fast, disk space efficient package manager

### Styling

- **Tailwind CSS 3.3+** - Utility-first CSS framework
- **PostCSS** - CSS post-processor
- **Custom theme system** with CSS custom properties

### Code Quality

- **ESLint 8.56+** - Linting utility for JavaScript and TypeScript
- **Prettier 3.1+** - Code formatter
- **Vue ESLint Plugin** - Vue-specific linting rules

### State & Routing

- **Vue Router 4.2+** - Official router for Vue.js
- **Pinia 2.1+** - Intuitive state management for Vue

## 🚦 Getting Started

### Prerequisites

- Node.js 18+
- pnpm 8+ (recommended) or npm/yarn

### Installation

1. **Clone or download this template**

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start development server**
   ```bash
   pnpm dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 📜 Available Scripts

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build locally
pnpm preview

# Lint and auto-fix code issues
pnpm lint

# Check linting without fixing
pnpm lint:check

# Format code with Prettier
pnpm format
```

## 🎨 Theme System

This template includes a custom theme system built on top of Tailwind CSS using CSS custom properties. This allows for
dynamic theme switching and easy customization.

### Usage

```vue

<template>
  <!-- Use theme colors directly -->
  <div class="bg-primary text-base-100">
    <h1 class="text-accent">Themed Content</h1>
  </div>
</template>
```

### Adding New Themes

Edit `tailwind.config.js` and add your theme to the `createThemes` function:

```javascript
createThemes({
    light: { /* existing colors */},
    dark: { /* existing colors */},
    custom: {
        primary: '#your-color',
        'base-100': '#your-background',
        // ... other colors
    }
})
```

## 🏗️ Architecture Decisions

### Component Organization

- **Views**: Page-level components that correspond to routes
- **Components**: Reusable UI components with clear props interfaces
- **Stores**: Pinia stores using Composition API for better TypeScript support

### TypeScript Configuration

- Strict mode disabled for easier adoption
- Path aliases configured (`@/` points to `src/`)
- Minimal typing approach while maintaining type safety

### Code Quality

- ESLint configured with Vue 3 and TypeScript rules
- Prettier integration without conflicts
- Auto-fix on save capabilities
- Modern JavaScript/TypeScript best practices

### Performance Optimizations

- Lazy-loaded routes for code splitting
- Vite's optimized build process
- Tree-shaking enabled
- CSS purging via Tailwind

## 🔧 Customization

### ESLint Rules

Modify `.eslintrc.cjs` to adjust linting rules according to your preferences.

### Prettier Configuration

Update `.prettierrc` to change code formatting rules.

### Tailwind Configuration

Extend `tailwind.config.js` to add custom utilities, components, or modify the design system.

### TypeScript Settings

Adjust `tsconfig.json` for stricter or looser type checking as needed.

## 📦 Build and Deployment

```bash
# Build for production
pnpm build

# The built files will be in the `dist/` directory
# Deploy the contents of `dist/` to your hosting service
```

### Build Optimizations Included

- Code splitting and lazy loading
- CSS extraction and minification
- Asset optimization and compression
- Tree shaking for smaller bundle sizes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run `pnpm lint` to ensure code quality
5. Submit a pull request

## 🙏 Acknowledgments

- [Vue.js](https://vuejs.org/) team for the amazing framework
- [Vite](https://vitejs.dev/) team for the incredible build tool
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first approach
- Community contributors and maintainers

---