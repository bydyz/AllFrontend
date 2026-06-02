# Conventions

## Code Style

### Vue 3 Composition API

**Primary Pattern:** All Vue components use `<script setup>` syntax

```javascript
<script setup>
import Component from './Component.vue'

// Import reactive utilities
import { ref, computed, shallowRef, markRaw } from 'vue'
</script>
```

**Key Conventions:**

1. **Import Order:** External imports → Local imports → Vue utilities → Helper functions
2. **Component Imports:** Import all sub-components at the top
3. **State Declaration:** Declare reactive state before helper functions
4. **Helper Functions:** Defined after state, before template
5. **Comments:** Use Chinese comments with clear explanations

### Style Block Organization

**Default Pattern:** Use `<style scoped lang="scss">`

```vue
<style scoped lang="scss">
.container {
  margin: 16px 0;
  div {
    margin-right: 8px;
  }
}
</style>
```

**Key Conventions:**

1. **Use SCSS nesting** for better organization
2. **Avoid global styles** - always use `<style scoped>`
3. **Combine SCSS and Tailwind** - use SCSS for complex layouts, Tailwind for utilities
4. **Comments in Chinese** explaining CSS concepts
5. **Group related styles** logically

### Inline Styles

**Usage:** Inline styles for quick demos and educational purposes

```vue
<template>
  <div style="display: flex; flex-wrap: wrap">
    <div id="myDivButton" @click="handleClick">
      Click me
    </div>
  </div>
</template>
```

**Key Conventions:**

1. Use inline styles for **educational demonstrations** (not production code)
2. Keep inline styles simple and focused
3. Prefer Tailwind classes over inline styles for layout

### Naming Conventions

#### Variables
- `ref()` → camelCase: `componentsArray`, `componentValue`, `item`, `index`
- `shallowRef()` → camelCase with `Id` suffix: `componentId`
- **Arrays** → plural: `componentsArray`, `items`
- **Components** → PascalCase: `UniversalSelector`, `LearnSelector`

#### Component Names
- **Topic directories:** PascalCase starting with `Learn`: `LearnSelector`, `LearnDisplay`
- **Topic index:** PascalCase: `index.vue`
- **Sub-components:** PascalCase: `JustifyContent.vue`, `AlignItems.vue`

#### Function Names
- camelCase: `getSelectedValue()`, `lazyLoad()`
- Verbs for actions: `getSelectedValue`, `handleClick`

#### File Names
- PascalCase for Vue components: `UniversalSelector.vue`
- kebab-case for HTML examples: `a.html`, `example1.html`

### Template Syntax

**Key Patterns:**

1. **v-for with unique keys:**
   ```vue
   <div v-for="(item, index) in componentsArray" :key="index">
   ```

2. **Conditional rendering:**
   ```vue
   <div :class="componentValue === item.value ? 'bg-[pink]' : ''">
   ```

3. **Event handling:**
   ```vue
   <div @click="componentValue = item.value">
   ```

4. **Dynamic components:**
   ```vue
   <component :is="currentComponent" />
   ```

## Code Patterns

### Dynamic Component Loading

**Pattern:** Topic index components use `shallowRef` + `markRaw` to prevent reactivity issues

```javascript
// src/components/LearnSelector/index.vue
import UniversalSelector from "./UniversalSelector.vue";
import { ref, shallowRef, markRaw } from "vue";

let componentsArray = ref([
  {
    name: "通配选择器",
    component: markRaw(UniversalSelector), // Prevents reactivity
  },
]);
let componentId = shallowRef(NestSelector); // shallowRef for components
```

**Why:**
- `markRaw()` prevents Vue from making component objects reactive
- `shallowRef()` prevents deep reactivity for component references
- Improves performance by avoiding unnecessary reactivity overhead

### Button Navigation Pattern

**Pattern:** Consistent navigation button styling and behavior

```vue
<div style="display: flex; flex-wrap: wrap">
  <div
    id="myDivButton"
    class="cursor-pointer"
    :class="componentId === item.component ? 'bg-[pink]' : ''"
    v-for="(item, index) in componentsArray"
    :key="index"
    @click="componentId = item.component"
  >
    {{ item.name }}
  </div>
</div>
```

**Key Elements:**
- Flex container with wrap
- Unique `id="myDivButton"` for consistency
- `cursor-pointer` for hover effect
- Dynamic class for active state (pink background)
- `v-for` with `:key="index"`
- `@click` to switch components

### Interactive Demo Pattern

**Pattern:** Controls + preview area for CSS property exploration

```vue
<template>
  <!-- Control area -->
  <div class="selectArea flex">
    <div>
      <input type="radio" name="111" value="flex-start" id="a" checked />
      <label for="a">flex-start</label>
    </div>
    <!-- ... more options -->
    <button type="button" @click="getSelectedValue()">
      获取选择
    </button>
  </div>

  <!-- Preview area -->
  <div class="textarea">
    <!-- Grid of items -->
  </div>
</template>

<script setup>
const getSelectedValue = () => {
  const selected = document.querySelector('input[name="111"]:checked');
  const element = document.querySelector(".textarea");
  if (element) {
    element.style.justifyContent = selected.defaultValue;
  }
};
</script>
```

**Key Elements:**
- Radio buttons for value selection
- Button to apply changes
- Preview area with grid of items
- JavaScript to update styles via DOM manipulation

## Comments and Documentation

### Comment Style

**Chinese comments** explaining CSS concepts:

```scss
/* 通配选择器 *：表示每一个元素 */
.container * {
  width: 500px;
  /* ... */
}

/* justify-content: flex-start;
  项目从主轴的起始位置开始排列。
  flex-end: 项目从主轴的结束位置开始排列。
  center: 项目在主轴上居中对齐。
  ... */
```

**Purpose:**
- Educational focus - explains what each CSS property does
- Detailed explanations of different values
- Commented examples showing alternatives

### No JSDoc or TypeScript Types

Despite TypeScript support, project uses **JavaScript** without JSDoc or type definitions.

## Error Handling

**Simple patterns:**

1. **Async components** have loading and error states:
   ```javascript
   defineAsyncComponent({
     loader,
     loadingComponent: { template: '<div>加载中...</div>' },
     errorComponent: { template: '<div>加载失败</div>' },
     delay: 200,
     timeout: 5000
   })
   ```

2. **DOM queries** include null checks:
   ```javascript
   const element = document.querySelector(".textarea");
   if (element) {
     element.style.justifyContent = selected.defaultValue;
   }
   ```

## Testing Conventions

**No formal test files found.** This is a learning project focused on demonstration, not unit or E2E testing.

## Build and Development

### Build Scripts (package.json)

```json
{
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}
```

**No linting or type-checking configured in package.json.**

### Git Conventions

Based on project structure, appears to be personal learning repository with no CI/CD configured.

## CSS Best Practices (for educational purposes)

**Heavy use of inline styles for demonstrations:**

```vue
<div style="margin-bottom: 12px;">
```

**However, production-style patterns also used:**

```scss
.container {
  margin: 16px 0;
  @apply border-[1px] border-solid border-[#999] rounded-[4px];
}
```

**Note:** The project uses inline styles primarily for **educational demonstrations** showing how CSS properties work, rather than as a production code style guide.

## Accessibility

**Basic accessibility practices:**

1. **Labels for inputs:**
   ```vue
   <label for="a">flex-start</label>
   <input type="radio" id="a" value="flex-start" checked />
   ```

2. **Semantic HTML:** Uses `<div>`, `<input>`, `<label>`, `<button>` tags appropriately

3. **Cursor pointer:** `cursor-pointer` class for interactive elements

**No ARIA labels or advanced accessibility features found.**
