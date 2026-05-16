// E:\Project\AAA_All_MINE\all-frontend\LearnDependencies\GenuiSDK\1\packages\e-commerce\src\genui\mcp\mcp-client.ts
// 只在 以上 文件中导出

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { z } from 'zod'
import { searchProducts } from '../../api'
import type { Product } from '../../types'

export const SEARCH_PRODUCTS_TOOL = 'search_products'

export const SearchProductsArgsSchema = z.object({
  keyword: z.string().min(1, 'keyword 不能为空'),
  limit: z.number().int().min(1).max(10).optional(),
})

export const ProductSchema = z.object({
  id: z.string(),
  title: z.string(),
  price: z.number(),
  image: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
  rating: z.number(),
  ratingCount: z.number(),
  inStock: z.boolean(),
  badgeText: z.string(),
})

export const SearchProductsResultSchema = z.object({
  tool: z.literal(SEARCH_PRODUCTS_TOOL),
  keyword: z.string(),
  total: z.number().int().min(0),
  found: z.boolean(),
  results: z.array(ProductSchema),
})

export type SearchProductsArgs = z.infer<typeof SearchProductsArgsSchema>
export type SearchProductsResult = z.infer<typeof SearchProductsResultSchema>

/**
 * 业务层商品搜索函数
 *
 * 封装了底层的商品搜索 API，并限制了返回结果数量。
 * 该函数供 MCP 工具处理器内部使用，作为业务逻辑的中间层。
 *
 * @param keyword - 搜索关键词，用于在商品库中匹配商品
 * @param limit - 返回结果数量上限，默认为 4
 * @returns Promise<Product[]> 符合条件的产品数组
 */
async function searchProductsByBusiness(keyword: string, limit = 4): Promise<Product[]> {
  // 调用底层的商品搜索 API
  const results = await searchProducts(keyword)
  // 截取指定数量的结果返回
  return results.slice(0, limit)
}

/**
 * 创建商品 MCP 服务器
 *
 * 该函数初始化并配置一个 MCP (Model Context Protocol) 服务器实例，用于：
 * 1. 向 AI 客户端暴露商品搜索工具
 * 2. 处理工具调用请求并返回结构化结果
 *
 * 服务器配置：
 * - 名称：e-commerce-product-mcp-server
 * - 版本：1.0.0
 *
 * 注册的工具：
 * - search_products: 根据关键词搜索商品，支持限制返回数量
 *
 * @returns McpServer 配置完成且可用的 MCP 服务器实例
 */
export function createProductMcpServer() {
  // 创建 MCP 服务器实例，指定服务器名称和版本
  const server = new McpServer(
    { name: 'e-commerce-product-mcp-server', version: '1.0.0' },
    {},
  )

  /**
   * 注册商品搜索工具
   *
   * 工具配置：
   * - 名称：search_products (由 SEARCH_PRODUCTS_TOOL 常量定义)
   * - 标题：搜索商品
   * - 描述：根据关键词在商品库中搜索商品
   * - 输入参数：由 SearchProductsArgsSchema 定义（keyword 必填，limit 可选）
   *
   * 处理流程：
   * 1. 接收原始参数并进行 Zod Schema 校验
   * 2. 校验失败时抛出错误
   * 3. 校验成功后调用业务层函数搜索商品
   * 4. 将结果按 SearchProductsResultSchema 格式封装
   * 5. 返回 MCP 协议格式的内容（JSON 序列化的文本）
   */
  server.registerTool(
    SEARCH_PRODUCTS_TOOL,
    {
      title: '搜索商品',
      description: '根据关键词在商品库中搜索商品',
      inputSchema: SearchProductsArgsSchema,
    },
    async (rawArgs) => {
      // 使用 Zod 安全解析原始参数
      const parsedArgs = SearchProductsArgsSchema.safeParse(rawArgs)
      if (!parsedArgs.success) {
        throw new Error('参数校验失败')
      }

      // 解构校验后的参数，limit 默认为 4
      const { keyword, limit = 4 } = parsedArgs.data

      // 调用业务层函数执行搜索
      const results = await searchProductsByBusiness(keyword, limit)

      // 构建响应 payload，包含工具名、关键词、总数、是否找到、结果数组
      const payload = SearchProductsResultSchema.parse({
        tool: SEARCH_PRODUCTS_TOOL,
        keyword,
        total: results.length,
        found: results.length > 0,
        results,
      })

      // 返回 MCP 协议格式的结果，content 为包含文本内容的数组
      return {
        content: [{ type: 'text', text: JSON.stringify(payload) }],
      }
    },
  )

  return server
}
