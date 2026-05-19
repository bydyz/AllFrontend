# 传统大模型问答窗口 vs GenUI 问答窗口 - 返回数据类型对比

## 传统大模型问答窗口

**返回数据类型**：纯文本（Markdown/Plain Text）

- 大模型输出的是**自然语言文本**，直接展示给用户
- 内容形式：文字、代码块、列表等
- 交互方式：两步式（先对话 → 用户自行操作）
- 渲染方式：简单文本渲染

**示例返回**：
```
以下是为您生成的预约表单：

- 日期选择
- 时间选择
- 人数输入
- 确认按钮

请告诉我您的选择，我帮您填写。
```

---

## GenUI 问答窗口

**返回数据类型**：结构化 JSON（符合 A2UI 协议）

GenUI 基于 **A2UI (Agent-to-UI) 协议**，大模型返回的是**可直接渲染 UI 的结构化数据**，包含四种消息类型：

| 消息类型 | 作用 |
|---------|------|
| `createSurface` | 创建新的 UI 画布 |
| `updateComponents` | 定义 UI 组件结构（按钮、表单、文本等） |
| `updateDataModel` | 绑定动态数据到组件 |
| `deleteSurface` | 删除 UI 画布 |

**示例返回**：
```json
{
  "createSurface": {
    "surfaceId": "booking",
    "catalogId": "https://a2ui.org/.../basic_catalog.json"
  }
}
{
  "updateComponents": {
    "surfaceId": "booking",
    "components": [
      {"id": "root", "component": {"Column": {"children": {"explicitList": ["header", "form"]}}}},
      {"id": "header", "component": {"Text": {"text": {"literalString": "确认预订"}, "usageHint": "h1"}}},
      {"id": "form", "component": {"TextField": {"label": {"literalString": "人数"}}}}
    ]
  }
}
```

---

## 核心区别

| 维度 | 传统问答窗口 | GenUI 问答窗口 |
|------|-------------|---------------|
| **返回数据** | 纯文本 | 结构化 JSON |
| **渲染方式** | 文本渲染 | 组件化 UI 渲染 |
| **交互模式** | 对话 → 用户手动操作 | 对话 + 实时 UI 交互 |
| **流式体验** | 逐字输出文本 | 渐进式 UI 构建 |
| **状态管理** | 无 | 支持 DataModel 响应式绑定 |

---

## GenUI 的优势

1. **所见即所得**：AI 直接生成可交互的 UI，而非描述性文本
2. **一站式交互**：无需两步操作，界面与对话一体化
3. **流式 UI**：支持增量渲染，用户实时看到 UI 构建过程
4. **数据驱动**：组件与 DataModel 绑定，支持响应式更新

简单来说，传统模式返回的是"**描述**"，GenUI 返回的是"**指令**"——直接告诉前端如何渲染组件。