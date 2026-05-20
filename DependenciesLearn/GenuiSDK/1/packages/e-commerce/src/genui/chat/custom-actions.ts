/**
 * 自定义操作模块
 * 用于定义聊天机器人的可执行操作，如添加到购物车、打开商品详情等
 */

import { z } from 'zod'
import type { ICustomActionItem } from '@opentiny/genui-sdk-vue'
import type { Product } from '../../types'

/**
 * 商品操作 Schema
 * 定义 addToCart 操作所需的商品参数结构
 * 使用 Zod 进行运行时类型验证
 */
const ProductActionSchema = z.object({
  id: z.string(),
  title: z.string(),
  price: z.number(),
  image: z.string().optional(),
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
  rating: z.number().optional(),
  ratingCount: z.number().optional(),
  inStock: z.boolean().optional(),
  badgeText: z.string().optional(),
})

/**
 * 打开商品 Schema
 * 定义 openProduct 操作所需的参数结构
 */
const OpenProductSchema = z.object({
  productId: z.string(),
})

/**
 * 自定义操作创建选项
 * 封装了聊天操作执行时的回调函数
 */
type CreateActionOptions = {
  /** 将商品添加到购物车的回调函数 */
  addProduct: (product: Product) => void
  /** 打开商品详情页的回调函数 */
  openProduct: (id: string) => void
  /** 打开购物车页面的回调函数 */
  openCart: () => void
}

/**
 * 创建自定义操作列表
 * 生成可供聊天机器人调用的操作定义
 * @param options - 操作执行时需要调用的函数集合
 * @returns 自定义操作数组，用于配置聊天机器人的行为
 */
export function createCustomActions(options: CreateActionOptions) {
  return [
    {
      /** 操作名称：添加到购物车 */
      name: 'addToCart',
      /** 操作描述，供 AI 理解该操作的用途 */
      description: '将商品加入购物车',
      /** 操作参数定义，包含 JSON Schema 格式的参数结构 */
      parameters: {
        type: 'object',
        properties: {
          product: {
            type: 'object',
            description: '待加入购物车商品',
            properties: {
              id: { type: 'string', description: '商品 id' },
              title: { type: 'string', description: '商品标题' },
              price: { type: 'number', description: '商品价格' },
              image: { type: 'string', description: '商品图片 URL' },
              description: { type: 'string', description: '商品描述' },
              tags: { type: 'array', description: '标签数组' },
              rating: { type: 'number', description: '评分' },
              ratingCount: { type: 'number', description: '评分人数' },
              inStock: { type: 'boolean', description: '是否有货' },
              badgeText: { type: 'string', description: '角标文案' },
            },
            /** 必需字段：id、title、price 必须提供 */
            required: ['id', 'title', 'price'],
          },
        },
        required: ['product'],
      } as const,
      /** 执行函数：当 AI 调用此操作时执行 */
      execute: (params: unknown) => {
        // 使用 Zod 验证参数结构，确保数据安全
        const parsed = z
          .object({ product: ProductActionSchema })
          .safeParse(params)
        // 验证失败则不执行任何操作
        if (!parsed.success) return
        // 调用注入的 addProduct 回调
        options.addProduct(parsed.data.product as Product)
      },
    },
    {
      /** 操作名称：打开商品详情 */
      name: 'openProduct',
      description: '跳转到商品详情页',
      parameters: {
        type: 'object',
        properties: {
          productId: { type: 'string', description: '商品 id' },
        },
        required: ['productId'],
      } as const,
      execute: (params: unknown) => {
        const parsed = OpenProductSchema.safeParse(params)
        if (!parsed.success) return
        options.openProduct(parsed.data.productId)
      },
    },
    {
      /** 操作名称：打开购物车 */
      name: 'openCart',
      /** 描述：打开当前用户购物车页面 */
      description: '打开当前用户购物车页面',
      parameters: {
        type: 'object',
        properties: {},
      } as const,
      execute: () => {
        options.openCart()
      },
    },
  ] as ICustomActionItem[]
}