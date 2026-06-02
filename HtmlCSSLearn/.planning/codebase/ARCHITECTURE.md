# Architecture

## Pattern: Component-based Learning Portal

This project uses a **component-based architecture** where each CSS/HTML topic is encapsulated in a Vue component. The main application serves as a portal that dynamically loads and displays these educational components.

## Layers and Abstractions

### Entry Points
1. **Main Entry Point:** `src/main.js`
   - Creates Vue app instance
   - Mounts to `#app` element in `index.html`
   - Imports global styles from `src/main.css`

2. **Root Component:** `src/App.vue`
   - Contains the main navigation UI (topic selector buttons)
   - Manages state for selected component
   - Uses dynamic component loading to render selected topic
   - Lazy-loads components on demand

### Main Component (`App.vue`)
**Responsibilities:**
- Renders navigation buttons for all learning topics
- Manages `componentValue` state (currently selected topic)
- Lazy-loads components using async component pattern
- Provides reusable `lazyLoad()` helper function

**Key Functions:**
- `lazyLoad(loader)` - Wraps `defineAsyncComponent` with loading/error components and timeouts

### Topic Components
Each topic is organized under `src/components/` with a consistent structure:

```
src/components/
├── LearnSelector/           # CSS Selectors
├── LearnDisplay/            # Flexbox & Grid
├── LearnBackground/         # Background Properties
├── LearnFont/               # Typography
├── LearnScrollbar/          # Scrollbar Styling
├── LearnTable/              # HTML Tables
├── LearnTagImg/             # Image Tags
├── LearnTagForm/            # Form Tags
├── LearnTagInput/           # Input Tags
├── LearnTagTextarea/        # Textarea Tags
├── LearnTagA/               # Anchor Tags
├── LearnSpacing/            # Spacing Properties
├── LearnText-XXX/           # Text Styling
├── LearnvWebkit/            # Webkit Properties
├── LearnBoxSizing/          # Box Sizing
├── LearnEIFPicture/         # Sprites/Icons
├── LearnCenter/             # Centering
├── LearnHr/                 # Horizontal Rule
├── CommonTags/              # Common HTML Tags
├── ASimpleWrite/            # Simple Write Example
├── SpecificSymbol/          # Special Symbols
├── CustomList/              # Custom Lists
└── LearnCenter/             # Centering
```

**Component Structure Pattern:**
Each topic's `index.vue` follows a consistent pattern:
- Imports all sub-components for that topic
- Uses `ref` and `markRaw` to define component array
- Uses `shallowRef` for current selected component
- Renders navigation buttons
- Uses `<component :is="...">` to dynamically load selected component

**Example (`LearnSelector/index.vue`):**
```javascript
import UniversalSelector from "./UniversalSelector.vue";
// ... other imports
import { ref, shallowRef, markRaw } from "vue";

let componentsArray = ref([
  { name: "通配选择器", component: markRaw(UniversalSelector) },
  // ...
]);
let componentId = shallowRef(NestSelector);
```

## Data Flow

### Navigation Flow
1. User clicks navigation button in `App.vue`
2. `componentValue` state updates to selected topic
3. Computed property `currentComponent` resolves to async component
4. `<component :is="currentComponent" />` renders selected topic

### Component Loading
- Components are **lazy-loaded** using `defineAsyncComponent`
- Loading state: simple "加载中..." template
- Error state: simple "加载失败" template
- Delay: 200ms before showing loading
- Timeout: 5000ms before showing error

### Inline Code Examples
Many topic components use inline HTML/CSS examples:
- `div` elements with inline styles for demonstration
- Interactive controls (radio buttons, inputs)
- Live style updates via JavaScript DOM manipulation

## Abstractions

### Dynamic Component Loading
- **Helper Function:** `lazyLoad()` in `App.vue`
- **Pattern:** Async component with loading/error states
- **Benefits:** Reduces initial bundle size, improves load performance

### Topic Organization
- **Folder-based structure:** Each major topic gets its own folder
- **Sub-topic organization:** Topic-specific examples are organized as separate Vue files
- **Consistent naming:** Topic directories start with "Learn" prefix

## Module Boundaries

### Component Isolation
- Each topic component is **self-contained**
- Uses `<style scoped>` to prevent CSS leakage
- Some components use SCSS with nested selectors
- Heavy use of Tailwind CSS classes for styling

### Example Files
Many components contain standalone HTML files for comparison:
- `.html` files in subdirectories (e.g., `LearnBoxSizing/a.html`, `LearnScrollbar\b.html`)
- These serve as reference implementations or "before/after" comparisons

## State Management

### Simple Reactive State
- Uses Vue's **Composition API** (`<script setup>`)
- **`ref()`** for primitive values (strings, arrays)
- **`shallowRef()`** for component references (to prevent unnecessary re-renders)
- **`markRaw()`** for preventing Vue from making components reactive

### State Locations
- `App.vue`: Global topic selection state
- Topic `index.vue` files: Sub-topic selection within each topic

## No Complex Patterns

**No external state management** (Vuex/Pinia) used.

**No routing** - Single-page application with all topics loaded but lazy-rendered.

**No build-time code generation** - All components are static Vue files.
