# Tech Stack

## Languages and Runtimes

**Primary Language:** JavaScript (ES Modules)

- Vue 3.5.13 (Composition API with `<script setup>`)
- TypeScript type definitions (not used directly, but supported via `.ts` extensions)

## Frameworks and Build Tools

### Frontend Framework
- **Vue 3.5.13** (`vue@^3.5.13`)
  - Using Composition API with `<script setup>` syntax
  - `<component :is="...">` dynamic component loading
  - Reactive refs, computed properties, shallowRef, markRaw

### Build Tool
- **Vite 6.3.1** (`vite@^6.3.1`)
  - Development server (`npm run dev`)
  - Build production (`npm run build`)
  - Preview production build (`npm run preview`)

### Module System
- **ES Modules** (`type: "module"` in package.json)
- Native browser ESM support via `<script type="module">`

## Styling

### CSS Framework
- **Tailwind CSS 4.1.12** (`tailwindcss@^4.1.12`)
  - Latest version using new `@tailwindcss/postcss` plugin
  - Scopes: `./index.html`, `./src/**/*.{vue,js,ts,jsx,tsx}`

### CSS Preprocessor
- **SCSS/Sass** (`sass@^1.86.3`)
  - Used in `<style scoped lang="scss">` blocks
  - Includes @apply directives for utility classes

### PostCSS Configuration
- **@tailwindcss/postcss 4.1.12** (Tailwind CSS 4 plugin)
- **Autoprefixer 10.4.21**
- **PostCSS 8.5.6**

## Configuration Files

### `package.json` - Project dependencies
```json
{
  "name": "learnhtmlcss",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "vue": "^3.5.13"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.1.12",
    "@vitejs/plugin-vue": "^5.2.2",
    "autoprefixer": "^10.4.21",
    "postcss": "^8.5.6",
    "sass": "^1.86.3",
    "tailwindcss": "^4.1.12",
    "vite": "^6.3.1"
  }
}
```

### `vite.config.js` - Vite configuration
```javascript
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.vue']
  }
})
```

### `tailwind.config.js` - Tailwind CSS configuration
```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### `postcss.config.js` - PostCSS configuration
```javascript
export default {
  plugins: {
    "@tailwindcss/postcss": {
      config: "./tailwind.config.js",
    },
    autoprefixer: {},
  }
}
```

## Asset Management

### Static Assets Structure
- `src/assets/` - Application assets
  - `Font/` - Custom font files (.ttf, .otf)
  - `image/` - Image files (JPG, PNG, GIF, JPEG, .gif, .png, .jpeg)
  - `Music/` - Audio files (.mp3)
  - `Vedio/` - Video files (.mp4)
  - `AlipayIcon/` - Icon font files
- `public/` - Public static assets
  - `vite.svg` - Vite favicon
  - `test.html` - Test HTML file
- `styleSheet/` - Standalone CSS examples

## Entry Points

- **Main Entry:** `src/main.js`
- **Root Component:** `src/App.vue`
- **Root HTML:** `index.html`

## Common Patterns

### Import aliases
- `@` resolves to `./src`

### Extension resolution
- Configured to resolve without extensions for: `.js`, `.jsx`, `.ts`, `.tsx`, `.json`, `.vue`

## Development Workflow

```bash
npm run dev           # Start development server
npm run build         # Build for production
npm run preview       # Preview production build
```
