// E:\Project\AAA_All_MINE\all-frontend\LearnDependencies\GenuiSDK\1\packages\e-commerce\src\genui\mcp\custom-fetch.ts
// 只在 以上 文件中导出

import OpenAI from 'openai'
import { Client } from '@modelcontextprotocol/sdk/client'
import { InMemoryTransport } from '@modelcontextprotocol/sdk/inMemory.js'
import { createProductMcpServer } from './product-mcp'

/**
 * MCP (Model Context Protocol) 客户端单例
 * 用于缓存已创建的客户端 promise，避免重复创建
 */
let clientPromise: Promise<Client> | null = null

/**
 * 创建 MCP 客户端并建立与服务器的连接
 *
 * 工作原理：
 * 1. 使用 InMemoryTransport 创建一对互联的传输通道（clientTransport 和 serverTransport）
 * 2. 创建 MCP 服务器并通过 serverTransport 连接
 * 3. 创建 MCP 客户端并通过 clientTransport 连接
 * 4. 客户端和服务器通过内存管道直接通信，无需网络请求
 *
 * @returns 已连接的 MCP 客户端实例
 */
async function createClient() {
  // 创建一对内存传输通道，两者内部互联
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair()

  // 创建产品相关的 MCP 服务器
  const server = createProductMcpServer()
  // 服务器连接到其对应的传输通道
  await server.connect(serverTransport)

  // 创建 MCP 客户端，指定客户端名称和版本
  const client = new Client({ name: 'e-commerce-product-mcp-client', version: '1.0.0' }, {})
  // 客户端连接到其对应的传输通道
  await client.connect(clientTransport)
  return client
}

/**
 * 获取 MCP 客户端的单例实例
 *
 * 采用懒加载模式：
 * - 首次调用时触发 createClient() 创建客户端
 * - 后续调用直接返回已创建的 promise，无需重复初始化
 *
 * @returns Promise<Client> MCP 客户端实例的 Promise
 */
export function getMcpClient() {
  if (!clientPromise) clientPromise = createClient()
  return clientPromise
}

/**
 * 获取 OpenAI 格式的工具列表
 *
 * 将 MCP 服务器提供的工具转换为 OpenAI Chat Completions API 所需的工具格式。
 * 转换过程：
 * 1. 从 MCP 客户端获取原始工具列表
 * 2. 过滤掉没有名称的工具
 * 3. 将每个工具映射为 OpenAI 格式：
 *    - type: 固定为 'function'
 *    - function.name: 工具名称
 *    - function.description: 工具描述
 *    - function.parameters: 工具输入参数模式（来自 inputSchema）
 *
 * @returns OpenAI.Chat.Completions.ChatCompletionTool[] OpenAI 格式的工具数组
 */
export async function getOpenAITools() {
  // 获取已连接的 MCP 客户端
  const client = await getMcpClient()

  // 调用客户端的 listTools 方法获取服务器提供的工具列表
  const raw = await (client as unknown as { listTools: () => Promise<{ tools?: Array<Record<string, unknown>> }> }).listTools()

  // 确保 tools 是数组格式
  const tools = Array.isArray(raw?.tools) ? raw.tools : []

  // 过滤并转换每个工具为 OpenAI 格式
  return tools
    .filter((tool) => typeof tool?.name === 'string')
    .map(
      (tool) =>
        ({
          type: 'function',
          function: {
            name: tool.name as string,
            // 工具描述，默认为空字符串
            description: typeof tool.description === 'string' ? tool.description : '',
            // 输入参数模式，从 inputSchema 获取，否则使用空对象
            parameters:
              tool.inputSchema && typeof tool.inputSchema === 'object'
                ? (tool.inputSchema as Record<string, unknown>)
                : { type: 'object', properties: {} },
          },
        }) as OpenAI.Chat.Completions.ChatCompletionTool,
    )
}

/**
 * 调用 MCP 工具并以文本形式返回结果
 *
 * 执行流程：
 * 1. 获取 MCP 客户端实例
 * 2. 通过客户端调用指定的工具，传入参数
 * 3. 从返回结果中提取文本类型的内容
 * 4. 如果没有文本内容，将整个结果序列化为 JSON 字符串返回
 *
 * @param name - 工具名称，要调用的 MCP 工具的唯一标识符
 * @param args - 工具参数，传递给工具的输入参数对象，默认为空对象
 * @returns string 工具执行结果的文本形式
 */
export async function callMcpToolAsText(name: string, args: Record<string, unknown> = {}) {
  // 获取 MCP 客户端
  const client = await getMcpClient()

  // 调用指定名称的工具，传入参数
  const result = await client.callTool({ name, arguments: args })

  // 提取返回结果中的 content 数组
  const content = Array.isArray((result as { content?: unknown }).content)
    ? ((result as { content: Array<{ type?: string; text?: string }> }).content ?? [])
    : []

  // 查找类型为 'text' 的内容项，提取其文本值
  const text = content.find((item) => item.type === 'text' && typeof item.text === 'string')?.text

  // 如果找到文本则返回，否则将整个结果序列化为 JSON
  return text ?? JSON.stringify(result)
}
