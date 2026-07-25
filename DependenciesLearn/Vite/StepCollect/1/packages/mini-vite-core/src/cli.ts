import { parseArgs } from './cli-parser.js'
import { loadAndResolveConfig } from './config.js'
import { formatPluginList } from './plugin.js'

async function main() {
  const args = parseArgs(process.argv.slice(2))

  console.log('\n╔══════════════════════════════════════════╗')
  console.log('║       阶段一：启动准备 (Phase 1)          ║')
  console.log('╚══════════════════════════════════════════╝\n')

  console.log('[1] parseArgs')
  console.log('    args:', JSON.stringify(args, null, 2))

  console.log('\n[2] loadConfig + resolveConfig')
  const { config, root, mode, configPath } = await loadAndResolveConfig(args)
  console.log('    配置文件:', configPath || '未找到，使用默认配置')
  console.log('    root:', root)
  console.log('    mode:', mode)
  console.log('    server.port:', config.server?.port)
  console.log('    server.host:', config.server?.host)
  console.log('    resolve.alias:', JSON.stringify(config.resolve?.alias))

  console.log('\n[3] resolvePlugins')
  const plugins = config.plugins || []
  console.log('    插件数量:', plugins.length)
  console.log(formatPluginList(plugins))

  console.log('\n╔══════════════════════════════════════════╗')
  console.log('║       阶段一完成，配置已就绪              ║')
  console.log('║   可传递给 createServer() 进入阶段二     ║')
  console.log('╚══════════════════════════════════════════╝\n')
}

main().catch(console.error)
