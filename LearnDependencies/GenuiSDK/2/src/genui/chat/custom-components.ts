import FormComponents from '../customComponents/FormComponents.vue'

export const customComponents = [
  {
    component: 'FormComponents',
    name: '自定义新增用户表单',
    description:
      '新增用户表单卡片，单张卡片宽度是500px，请注意排版，请务必给对应的事件绑定对应的交互事件',
    schema: {
      properties: [
        { property: 'onCloseDrawerChangePage', type: 'function', description: '关闭智能助手滑窗并切换到表格页' },
      ],
    },
    ref: FormComponents,
  },
]
