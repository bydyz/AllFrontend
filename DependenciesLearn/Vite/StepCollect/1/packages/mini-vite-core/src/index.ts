import type { ResolvedConfig, Plugin } from 'vite'
import { loadAndResolveConfig } from './config.js'

export interface Phase1Result {
  config: ResolvedConfig
  plugins: readonly Plugin[]
  root: string
  mode: string
  configPath: string | undefined
}

export async function resolvePhase1(opts: {
  root?: string
  configFile?: string
  mode?: string
}): Promise<Phase1Result> {
  const { config, root, mode, configPath } = await loadAndResolveConfig({
    root: opts.root,
    configFile: opts.configFile,
    mode: opts.mode,
  })

  return {
    config,
    plugins: config.plugins || [],
    root,
    mode,
    configPath,
  }
}

export { parseArgs } from './cli-parser.js'
export type { CliArgs } from './cli-parser.js'
export { loadAndResolveConfig } from './config.js'
export { formatPluginList } from './plugin.js'
