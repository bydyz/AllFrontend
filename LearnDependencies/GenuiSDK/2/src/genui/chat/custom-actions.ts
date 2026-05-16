import type { ICustomActionItem } from '@opentiny/genui-sdk-vue'
import type { Product } from '../../types'

type CreateActionOptions = {
  addProduct: (product: Product) => void
  openProduct: (id: string) => void
  openCart: () => void
}

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
        options.addProduct(params as Product)
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
        options.openProduct((params as Product).productId)
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