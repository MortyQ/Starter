# 🏗️ Архитектура проекта

## 📋 Оглавление

- [Обзор архитектуры](#обзор-архитектуры)
- [Структура проекта](#структура-проекта)
- [Слои архитектуры](#слои-архитектуры)
- [Правила импортов](#правила-импортов)
- [Сравнение с FSD](#сравнение-с-fsd)
- [Масштабирование](#масштабирование)
- [Best Practices](#best-practices)
- [Примеры использования](#примеры-использования)

---

## 🎯 Обзор архитектуры

Данный проект использует **Component-based / Feature-based архитектуру**, которая является стандартом в 70-80% украинских и западных компаний (Grammarly, GitLab, Atlassian, Shopify).

### Почему именно эта архитектура?

✅ **Простота входа** — новые разработчики понимают структуру за 1-2 дня  
✅ **Гибкость** — легко адаптируется под любой размер проекта  
✅ **Переиспользование** — четкое разделение shared/features/pages  
✅ **Скорость разработки** — меньше бюрократии, чем в FSD  
✅ **Индустриальный стандарт** — легко найти разработчиков, знакомых с подходом

---

## 📁 Структура проекта

```
src/
├── app/                          # 🚀 Application Layer (Initialization)
│   ├── App.vue                   # Root component
│   ├── main.ts                   # Entry point
│   ├── main.scss                 # Global styles
│   └── router/                   # Vue Router configuration
│       └── index.ts
│
├── pages/                        # 📄 Pages Layer (Routes)
│   ├── Home/
│   │   ├── index.vue             # Main page component
│   │   └── components/           # Page-specific components (optional)
│   │       └── HeroSection.vue
│   ├── About/
│   │   └── index.vue
│   ├── Components/
│   │   └── index.vue
│   ├── Modals/
│   │   └── index.vue
│   ├── Icons/
│   │   └── index.vue
│   └── NotFound/
│       └── index.vue
│
├── features/                     # 🎨 Features Layer (Business Logic)
│   ├── theme/
│   │   ├── index.ts              # Public API
│   │   ├── components/
│   │   │   └── ThemeToggle.vue
│   │   ├── composables/
│   │   │   └── useTheme.ts       # Pinia store
│   │   └── utils/
│   │       └── createThemes.ts
│   │
│   └── modal/
│       ├── index.ts              # Public API
│       └── composables/
│           └── useModalStore.ts  # Pinia store
│
├── widgets/                      # 🧩 Widgets Layer (Complex UI Blocks)
│   └── (reserved for Header, Sidebar, Footer, etc.)
│
└── shared/                       # 🔧 Shared Layer (Reusable Code)
    ├── ui/                       # UI Kit components
    │   ├── ThemeToggle.vue
    │   └── common/
    │       ├── VButton.vue
    │       ├── VCard.vue
    │       ├── VCheckbox.vue
    │       ├── VIcon.vue
    │       ├── VInput.vue
    │       ├── VLoader.vue
    │       ├── VModal.vue
    │       ├── VSearch.vue
    │       └── VSwitch.vue
    │
    ├── composables/              # Reusable Vue composables
    │   ├── index.ts
    │   └── useModal.ts
    │
    ├── utils/                    # Pure utility functions
    │   ├── index.ts
    │   └── componentsList.ts
    │
    ├── api/                      # API client & services
    │   ├── index.ts
    │   └── client.ts             # Axios instance
    │
    ├── config/                   # App configuration
    │   └── icons.ts
    │
    ├── types/                    # TypeScript types
    │   ├── index.ts
    │   ├── icons.d.ts
    │   ├── vite-env.d.ts
    │   └── components/
    │       └── card.ts
    │
    └── assets/                   # Static assets & styles
        └── styles/
            ├── customComponents.scss
            └── components/
                ├── vcard.scss
                └── vcheckbox.scss
```

---

## 🏛️ Слои архитектуры

### 1️⃣ **app/** — Application Layer

**Назначение:** Инициализация приложения, глобальные провайдеры, роутинг.

**Содержит:**
- Точку входа (`main.ts`)
- Корневой компонент (`App.vue`)
- Конфигурацию роутера
- Глобальные стили

**Правило:** НЕ содержит бизнес-логику, только инициализацию.

---

### 2️⃣ **pages/** — Pages Layer

**Назначение:** Страницы-роуты приложения.

**Структура:**
```
pages/
└── PageName/
    ├── index.vue              # Главный файл страницы
    ├── components/            # Компоненты только для этой страницы
    │   └── LocalComponent.vue
    └── hooks/                 # (опционально) Хуки только для страницы
        └── usePageLogic.ts
```

**Правила:**
- Каждая страница — отдельная папка с `index.vue`
- Компоненты в `components/` используются ТОЛЬКО на этой странице
- Если компонент нужен в 2+ страницах → переносим в `shared/ui/`
- Можно импортировать из: `features/`, `widgets/`, `shared/`

---

### 3️⃣ **features/** — Features Layer

**Назначение:** Бизнес-фичи приложения (аутентификация, темы, уведомления).

**Структура:**
```
features/
└── featureName/
    ├── index.ts               # Public API (обязательно!)
    ├── components/            # UI компоненты фичи
    ├── composables/           # Pinia stores, composables
    ├── utils/                 # Утилиты фичи
    └── api/                   # (опционально) API запросы фичи
```

**Примеры фич:**
- `auth/` — авторизация, логин, регистрация
- `theme/` — управление темой (dark/light)
- `modal/` — управление модальными окнами
- `notifications/` — уведомления пользователю
- `cart/` — корзина товаров (для e-commerce)

**Правила:**
- **Обязательно** экспортируем через `index.ts` (Public API)
- Можно импортировать только из `shared/`
- НЕ может импортировать другие `features/` (избегаем циклических зависимостей)

**Пример Public API:**
```typescript
// features/theme/index.ts
export { default as ThemeToggle } from './components/ThemeToggle.vue';
export { useThemeStore } from './composables/useTheme';
export { createThemes } from './utils/createThemes';
```

---

### 4️⃣ **widgets/** — Widgets Layer

**Назначение:** Сложные самодостаточные UI-блоки, которые используют несколько фич.

**Примеры:**
- `Header/` — шапка сайта (использует `theme`, `auth`, `notifications`)
- `Sidebar/` — боковое меню
- `Footer/` — подвал сайта
- `UserProfile/` — профиль пользователя

**Отличие от features:**
- Widget — это UI-блок, который **комбинирует** несколько features
- Feature — это изолированная бизнес-логика

**Правила:**
- Может импортировать из `features/`, `shared/`
- Не может импортировать другие `widgets/`

---

### 5️⃣ **shared/** — Shared Layer

**Назначение:** Переиспользуемый код без бизнес-логики.

#### `shared/ui/` — UI Kit
Библиотека визуальных компонентов (кнопки, инпуты, карточки).

**Правила:**
- Компоненты должны быть **generic** (универсальные)
- Получают данные через props
- НЕ содержат бизнес-логику
- НЕ делают API запросы

#### `shared/composables/` — Composables
Vue composables, которые можно переиспользовать.

**Примеры:**
- `useModal.ts` — работа с модалками
- `useDebounce.ts` — debounce для инпутов
- `useLocalStorage.ts` — работа с localStorage

#### `shared/utils/` — Utilities
Чистые функции без зависимостей от Vue.

**Примеры:**
- `formatDate.ts`
- `validateEmail.ts`
- `calculateDiscount.ts`

#### `shared/api/` — API Client
Настройка axios, базовые API методы.

#### `shared/types/` — TypeScript Types
Общие типы и интерфейсы.

---

## 🔗 Правила импортов

### Матрица зависимостей

| Слой        | Может импортировать                  |
|-------------|--------------------------------------|
| `app/`      | `pages/`, `features/`, `widgets/`, `shared/` |
| `pages/`    | `features/`, `widgets/`, `shared/`   |
| `widgets/`  | `features/`, `shared/`               |
| `features/` | `shared/`                            |
| `shared/`   | ничего (изолирован)                  |

### ✅ Правильные импорты

```typescript
// ✅ pages импортирует features
import { ThemeToggle } from '@/features/theme';

// ✅ features импортирует shared
import { VButton } from '@/shared/ui/common/VButton.vue';

// ✅ features использует Public API
import { useThemeStore } from '@/features/theme';
```

### ❌ Неправильные импорты

```typescript
// ❌ shared не может импортировать features
import { useAuth } from '@/features/auth'; // В shared/

// ❌ features не импортирует другие features напрямую
import { useTheme } from '@/features/theme'; // В features/auth

// ❌ Обход Public API
import ThemeToggle from '@/features/theme/components/ThemeToggle.vue';
// Правильно: import { ThemeToggle } from '@/features/theme';
```

---

## 🆚 Сравнение с FSD (Feature-Sliced Design)

| Критерий                  | Component-based | FSD                          |
|---------------------------|-----------------|------------------------------|
| **Сложность**             | Низкая          | Высокая                      |
| **Onboarding**            | 1-2 дня         | 1-2 недели                   |
| **Количество слоев**      | 5               | 7+ (app/pages/widgets/features/entities/shared/processes) |
| **Гибкость**              | Высокая         | Средняя (строгие правила)    |
| **Best for**              | Большинство проектов | Enterprise (100+ разработчиков) |
| **Документация**          | Простая         | Требует детальной            |
| **Подходит для стартапов**| ✅              | ❌ (overkill)                |

### Когда использовать FSD?

- Команда 50+ разработчиков
- Проект живет 5+ лет
- Критична архитектурная строгость
- Есть выделенный архитектор

### Когда использовать Component-based?

- Команда до 30 разработчиков
- Нужна скорость разработки
- MVP или стартап
- 90% современных проектов ✅

---

## 📈 Масштабирование

### Добавление новой фичи

**Пример:** Добавляем фичу "Авторизация"

1. Создаем структуру:
```bash
mkdir -p src/features/auth/{components,composables,api,utils}
```

2. Создаем файлы:
```
features/auth/
├── index.ts                    # Public API
├── components/
│   ├── LoginForm.vue
│   └── RegisterForm.vue
├── composables/
│   └── useAuth.ts              # Pinia store
├── api/
│   └── authApi.ts              # API методы
└── utils/
    └── validatePassword.ts
```

3. Экспортируем через Public API:
```typescript
// features/auth/index.ts
export { default as LoginForm } from './components/LoginForm.vue';
export { default as RegisterForm } from './components/RegisterForm.vue';
export { useAuthStore } from './composables/useAuth';
export * from './api/authApi';
```

4. Используем в страницах:
```vue
<script setup>
import { LoginForm, useAuthStore } from '@/features/auth';

const authStore = useAuthStore();
</script>
```

---

### Добавление нового виджета

**Пример:** Шапка сайта с темой и авторизацией

```
widgets/Header/
├── index.vue                   # Главный компонент
└── components/                 # Внутренние компоненты
    ├── Logo.vue
    └── Navigation.vue
```

```vue
<!-- widgets/Header/index.vue -->
<script setup>
import { ThemeToggle } from '@/features/theme';
import { useAuthStore } from '@/features/auth';
import Logo from './components/Logo.vue';
import Navigation from './components/Navigation.vue';

const authStore = useAuthStore();
</script>

<template>
  <header>
    <Logo />
    <Navigation />
    <ThemeToggle />
    <div v-if="authStore.isAuthenticated">
      {{ authStore.user.name }}
    </div>
  </header>
</template>
```

---

### Добавление новой страницы

```bash
mkdir src/pages/Dashboard
touch src/pages/Dashboard/index.vue
```

```vue
<!-- pages/Dashboard/index.vue -->
<script setup>
import { useAuthStore } from '@/features/auth';
import { VCard, VButton } from '@/shared/ui/common';

const authStore = useAuthStore();
</script>

<template>
  <div class="dashboard">
    <h1>Welcome, {{ authStore.user.name }}!</h1>
    <VCard title="Statistics">
      <p>Your dashboard content here</p>
    </VCard>
  </div>
</template>
```

Обновляем роутер:
```typescript
// app/router/index.ts
{
  path: '/dashboard',
  name: 'Dashboard',
  component: () => import('@/pages/Dashboard/index.vue'),
  meta: { requiresAuth: true }
}
```

---

## 🎯 Best Practices

### 1. Public API для features

**Всегда** экспортируем через `index.ts`:

```typescript
// features/auth/index.ts
export { LoginForm, RegisterForm } from './components';
export { useAuthStore } from './composables/useAuth';
export { login, logout, register } from './api/authApi';
```

### 2. Именование компонентов

```
✅ VButton.vue      — Shared UI компонент (префикс V)
✅ ThemeToggle.vue  — Feature компонент (без префикса)
✅ LoginForm.vue    — Feature компонент
✅ Header.vue       — Widget (без префикса)
```

### 3. Composables vs Utils

```typescript
// ✅ Composable (использует Vue API)
export function useDebounce(value: Ref<string>, delay: number) {
  const debouncedValue = ref(value.value);
  // uses watchEffect, onUnmounted, etc.
  return debouncedValue;
}

// ✅ Util (чистая функция)
export function formatDate(date: Date): string {
  return date.toLocaleDateString('uk-UA');
}
```

### 4. Pinia Stores в features

```typescript
// features/auth/composables/useAuth.ts
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const isAuthenticated = computed(() => !!user.value);
  
  async function login(credentials) {
    // API call
  }
  
  return { user, isAuthenticated, login };
});
```

### 5. TypeScript типы

```typescript
// shared/types/user.ts
export interface User {
  id: string;
  name: string;
  email: string;
}

// features/auth/composables/useAuth.ts
import type { User } from '@/shared/types/user';

const user = ref<User | null>(null);
```

---

## 📚 Примеры использования

### Пример 1: Создание формы с валидацией

```vue
<!-- pages/Contact/index.vue -->
<script setup>
import { ref } from 'vue';
import { VInput, VButton, VCard } from '@/shared/ui/common';
import { validateEmail } from '@/shared/utils/validators';

const email = ref('');
const message = ref('');
const errors = ref({});

const handleSubmit = () => {
  errors.value = {};
  
  if (!validateEmail(email.value)) {
    errors.value.email = 'Invalid email';
  }
  
  if (message.value.length < 10) {
    errors.value.message = 'Message too short';
  }
  
  if (Object.keys(errors.value).length === 0) {
    // Submit form
  }
};
</script>

<template>
  <VCard title="Contact Us">
    <form @submit.prevent="handleSubmit">
      <VInput 
        v-model="email" 
        label="Email" 
        :error="errors.email"
      />
      <VInput 
        v-model="message" 
        type="textarea" 
        label="Message"
        :error="errors.message"
      />
      <VButton type="submit">Send</VButton>
    </form>
  </VCard>
</template>
```

### Пример 2: Feature с API интеграцией

```typescript
// features/products/api/productsApi.ts
import apiClient from '@/shared/api/client';

export async function getProducts() {
  const { data } = await apiClient.get('/products');
  return data;
}

export async function getProductById(id: string) {
  const { data } = await apiClient.get(`/products/${id}`);
  return data;
}
```

```typescript
// features/products/composables/useProducts.ts
import { defineStore } from 'pinia';
import { getProducts } from '../api/productsApi';

export const useProductsStore = defineStore('products', () => {
  const products = ref([]);
  const loading = ref(false);
  
  async function fetchProducts() {
    loading.value = true;
    try {
      products.value = await getProducts();
    } finally {
      loading.value = false;
    }
  }
  
  return { products, loading, fetchProducts };
});
```

```typescript
// features/products/index.ts
export { useProductsStore } from './composables/useProducts';
export * from './api/productsApi';
```

---

## 🚀 Migration Checklist

- [x] Создана структура `features/`
- [x] Создана структура `widgets/`
- [x] Переименована `shared/libs/` → `shared/composables/` и `shared/utils/`
- [x] Перемещен `app/providers/axios.ts` → `shared/api/client.ts`
- [x] Перенесена тема в `features/theme/`
- [x] Перенесены модалки в `features/modal/`
- [x] Реорганизованы страницы в папочную структуру
- [x] Обновлены все импорты
- [x] Созданы Public API (`index.ts`) для features
- [x] Проверена сборка проекта
- [x] Создана документация

---

## 📖 Дополнительные ресурсы

- [Vue 3 Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)
- [Pinia Store Best Practices](https://pinia.vuejs.org/core-concepts/)
- [Component Design Patterns](https://www.patterns.dev/posts/vue-patterns)

---

## 🤝 Для команды

### Code Review Guidelines

1. ✅ Проверяем правильность слоя (shared/features/pages)
2. ✅ Проверяем правила импортов
3. ✅ Проверяем наличие Public API для features
4. ✅ Проверяем TypeScript типы
5. ✅ Проверяем переиспользование компонентов

### Когда создавать новый feature?

Создавайте feature если:
- Это бизнес-логика (auth, payments, cart)
- Код будет использоваться в нескольких местах
- Есть state management (Pinia store)

НЕ создавайте feature если:
- Это просто UI компонент → `shared/ui/`
- Используется только на одной странице → `pages/PageName/components/`

---

**Версия архитектуры:** 1.0  
**Дата обновления:** Октябрь 2025  
**Контакт:** Ваша команда разработки

