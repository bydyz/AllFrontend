import { resolvePhase1, formatPluginList } from 'mini-vite-core'

async function main() {
  console.log('╔══════════════════════════════════════════╗')
  console.log('║     mini-vite-app：获取阶段一配置         ║')
  console.log('╚══════════════════════════════════════════╝\n')

  const result = await resolvePhase1({
    configFile: './vite.config.ts',
    mode: 'development',
  })

  console.log('[配置结果]')
  console.log('  root:', result.root)
  console.log('  mode:', result.mode)
  console.log('  配置文件:', result.configPath)
  console.log('')
  console.log('[server]')
  console.log('  port:', result.config.server?.port)
  console.log('  host:', result.config.server?.host)
  console.log('')
  console.log('[resolve.alias]')
  for (const alias of result.config.resolve?.alias || []) {
    console.log(' ', alias.find, '->', alias.replacement)
  }
  console.log('')
  console.log('[plugins]', result.plugins.length, '个')
  console.log(formatPluginList(result.plugins))
  console.log('')
  console.log('╔══════════════════════════════════════════╗')
  console.log('║  配置已就绪，可传递给 createServer()     ║')
  console.log('║           进入阶段二                      ║')
  console.log('╚══════════════════════════════════════════╝')
}

main().catch(console.error)
