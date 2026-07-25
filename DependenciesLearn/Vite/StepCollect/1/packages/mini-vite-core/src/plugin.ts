import type { Plugin } from 'vite'

export function formatPluginList(plugins: readonly Plugin[]): string {
  return plugins
    .map((p, i) => `    ${String(i + 1).padStart(2, ' ')}. ${p.name || '(unnamed)'}`)
    .join('\n')
}
