import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  sourcemap: true,
  splitting: false,
  minify: false,
  external: ['vite'],
  banner: {
    js: '// vite-plugin-md2vue - Transform Markdown to Vue components'
  }
})
