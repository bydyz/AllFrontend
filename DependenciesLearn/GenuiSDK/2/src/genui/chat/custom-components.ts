import FormComponents from '../customComponents/FormComponents.vue'

export const customComponents = [
  {
    component: 'FormComponents',
    name: '新增人员表单卡片',
    description:
      '新增人员表单卡片，给卡片的容器设置宽度为500px，请注意排版，请务必给对应的事件绑定对应的交互事件',
    schema: {
      properties: [
        { property: 'onOnCloseDrawerChangePage', type: 'function', description: '关闭智能助手滑窗并切换到表格页' },
      ],
    },
    ref: FormComponents,
  },
]
