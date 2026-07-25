import { resolveConfig, loadConfigFromFile } from 'vite'
import type { CliArgs } from './cli-parser.js'

export async function loadAndResolveConfig(args: CliArgs) {
  const root = args.root || process.cwd()
  const mode = args.mode || 'development'

  const loaded = await loadConfigFromFile(
    { mode, command: 'serve' },
    args.configFile,
    root
  )

  const config = await resolveConfig(
    {
      root,
      configFile: args.configFile,
      mode,
      server: {
        port: args.port,
        host: args.host,
      },
    },
    'serve'
  )

  return { config, root, mode, configPath: loaded?.path }
}
