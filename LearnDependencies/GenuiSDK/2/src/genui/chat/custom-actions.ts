import type { ICustomActionItem } from '@opentiny/genui-sdk-vue'
import type { Person } from "../../types";

type CreateActionOptions = {
  closeDrawerChangePage222: () => void;
  addPerson222?: (person: Person) => void
}

export function createCustomActions(options: CreateActionOptions) {
  return [
    {
      name: 'addPerson111',
      description: '新增人员',
      parameters: {
        type: 'object',
        properties: {
          person: {
            type: 'object',
            description: '待新增人员信息',
            properties: {
              id: { type: 'string', description: '待新增人员 id' },
              name: { type: 'string', description: '待新增人员姓名' },
              city: { type: 'string', description: '待新增人员城市' },
              address: { type: 'string', description: '待新增人员地址' }
            },
            required: ['id', 'name'],
          },
        },
        required: ['person'],
      } as const,
      /** 执行函数：当 AI 调用此操作时执行 */
      execute: (params: unknown) => {
        options?.addPerson222?.(params as Person)
      },
    },
    {
      name: 'closeDrawerChangePage111',
      description: '关闭智能助手滑窗并切换到表格页',
      parameters: {
        type: 'object',
        properties: {},
      } as const,
      execute: () => {
        options.closeDrawerChangePage222()
      },
    },
  ] as ICustomActionItem[]
}