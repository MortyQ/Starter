# Table Styles Documentation

Модульна система стилів для компонента Table з повним контролем над кожним елементом.

## 📁 Структура файлів

```
assets/styles/
├── _variables.scss      # Design tokens & змінні
├── _wrapper.scss        # Обгортка таблиці
├── _grid.scss          # Grid layout
├── _header.scss        # Header row & cells
├── _row.scss           # Table rows
├── _cell.scss          # Table cells
├── _total.scss         # Total row
├── _fixed.scss         # Fixed columns
├── _pagination.scss    # Pagination
├── _utilities.scss     # Utilities & helpers
└── table.scss          # Головний файл (імпорти)
```

## 🎨 Основні класи

### Wrapper & Container
- `.table-wrapper` - головна обгортка
- `.table-scroll-container` - контейнер зі скролом
- `.table-loading` - стан завантаження
- `.table-empty` - порожній стан

### Grid
- `.table-grid` - головний grid контейнер
- `.table-grid.is-resizing` - стан при зміні розміру колонок
- `.table-virtual-spacer` - spacer для віртуалізації

### Header
- `.table-header-row` - wrapper для header
- `.table-header-cell` - окрема header cell
- `.table-header-cell--left/center/right` - вирівнювання
- `.table-header-label` - текст в header
- `.table-resize-handle` - handle для зміни розміру
- `.table-resize-indicator` - візуальний індикатор resize
- `.table-resize-divider` - роздільна лінія

### Row
- `.table-row-wrapper` - wrapper для row (display: contents)
- `.table-row-wrapper:hover` - hover стан
- `.table-row-wrapper--disabled` - disabled стан
- `.table-row-wrapper--selected` - selected стан
- `.table-row-virtual` - віртуалізований row
- `.table-row-expandable` - expandable row

### Cell
- `.table-cell` - базова cell
- `.table-cell--left/center/right` - вирівнювання
- `.table-cell--interactive` - інтерактивна cell
- `.table-cell--indented` - з indent для nested
- `.table-cell-content` - wrapper для контенту
- `.table-cell-text` - текстовий контент
- `.table-cell-text--truncate` - з обрізанням
- `.table-cell-text--wrap` - з переносом
- `.table-cell-expand-btn` - кнопка expand
- `.table-cell-expand-spacer` - spacer замість кнопки

### Total Row
- `.table-total-cell` - cell в total row
- `.table-total-cell--left/center/right` - вирівнювання
- `.table-total-content` - wrapper для контенту
- `.table-total-text` - текст (bold)
- `.table-total-spacer` - spacer для вирівнювання

### Fixed Columns
- `.table-fixed-column` - базова fixed колонка
- `.table-fixed-left` - прибита зліва
- `.table-fixed-right` - прибита справа
- `.table-fixed-left-last` - остання ліва (з тінню)
- `.table-fixed-right-first` - перша права (з тінню)

### Pagination
- `.table-pagination` - wrapper для pagination
- `.table-pagination-info` - інформація про сторінки
- `.table-pagination-controls` - кнопки навігації
- `.table-pagination-btn` - кнопка пагінації
- `.table-pagination-btn--active` - активна сторінка
- `.table-pagination-size` - вибір розміру сторінки

### Utilities
- `.table-scrollbar-styled` - кастомний scrollbar
- `.table-user-select-none` - вимкнути виділення
- `.table-transition-fast/normal/slow` - transitions
- `.table-skeleton` - skeleton loading
- `.table-ellipsis` - однорядкове обрізання
- `.table-ellipsis-2` - 2 рядки
- `.table-ellipsis-3` - 3 рядки

## 🔧 Змінні (variables.scss)

### Spacing
- `$table-cell-padding-x: 1rem`
- `$table-cell-padding-y: 0.75rem`
- `$table-header-padding-x: 1rem`
- `$table-header-padding-y: 0.75rem`

### Sizing
- `$table-default-height: 600px`
- `$table-row-height: 50px`
- `$table-expand-button-size: 28px`
- `$table-resize-handle-width: 12px`
- `$table-indent-size: 24px`

### Borders
- `$table-border-width: 1px`
- `$table-border-radius: 0.5rem`
- `$table-total-border-width: 2px`

### Shadows
- `$table-shadow-left: inset 10px 0 8px -8px rgba(0, 0, 0, 0.15)`
- `$table-shadow-right: inset -10px 0 8px -8px rgba(0, 0, 0, 0.15)`

### Z-index
- `$z-index-base: 1` - базові cells
- `$z-index-row-hover: 2` - hover стан рядка
- `$z-index-fixed-cell: 5` - **fixed cells (менше ніж header!)**
- `$z-index-total: 9` - total row
- `$z-index-header: 10` - **header (вище ніж fixed cells!)**
- `$z-index-total-fixed: 11` - total + fixed
- `$z-index-header-fixed: 15` - **header + fixed (найвищий!)**

**Важливо:** Header завжди має бути вище ніж звичайні fixed cells, щоб при вертикальному скролі fixed колонки не перекривали headers!

### Transitions
- `$transition-fast: 0.15s ease`
- `$transition-normal: 0.2s ease`
- `$transition-slow: 0.3s ease`

## 💡 Приклади кастомізації

### Змінити padding cells
```scss
// У _variables.scss
$table-cell-padding-x: 1.5rem;
$table-cell-padding-y: 1rem;
```

### Змінити колір hover
```scss
// У _row.scss
.table-row-wrapper:hover > .table-cell {
  background-color: theme('colors.primary' / 0.05);
}
```

### Змінити стиль resize handle
```scss
// У _header.scss
.table-resize-handle {
  background-color: theme('colors.primary' / 0.2);
  width: 8px;
}
```

### Додати нові модифікатори
```scss
// У _cell.scss
.table-cell--highlighted {
  background-color: theme('colors.warning' / 0.1);
  font-weight: 600;
}
```

## 🎯 Best Practices

1. **Модульність** - кожен файл відповідає за свою частину
2. **BEM-подібна нотація** - `.table-element`, `.table-element--modifier`
3. **Кастомні властивості** - всі змінні в одному місці
4. **Теми** - використання theme() функції Tailwind
5. **Перевикористання** - utilities для загальних паттернів
6. **Performance** - мінімум селекторів, оптимізовані transitions

## 📝 Як використовувати

### В компоненті Vue
```vue
<style lang="scss">
@import '@/widgets/table/assets/styles/table.scss';
</style>
```

### Імпорт окремих модулів
```scss
@import '@/widgets/table/assets/styles/variables';
@import '@/widgets/table/assets/styles/cell';
```

### Перевизначення змінних
```scss
// Спочатку ваші змінні
$table-cell-padding-x: 2rem;

// Потім імпорт
@import '@/widgets/table/assets/styles/table.scss';
```

