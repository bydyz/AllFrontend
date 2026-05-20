# GenUI SDK 事件与操作的关联机制

## 一、ProductCard 组件事件与 CustomActions 的关联

### 1.1 ProductCard.vue 发射的事件

```javascript
const emit = defineEmits<{
  open: [product: Product]    // 点击卡片时触发
  add: [product: Product]     // 点击"加入购物车"按钮时触发
}>()
```

### 1.2 custom-actions.ts 定义的操作

```ts
export function createCustomActions(options: CreateActionOptions) {
  return [
    { name: 'addToCart', description: '将商品加入购物车', execute: ... },
    { name: 'openProduct', description: '跳转到商品详情页', execute: ... },
    { name: 'openCart', description: '打开当前用户购物车页面', execute: ... },
  ]
}
```

### 1.3 两者的关联方式

| 场景 | 事件来源 | 处理方式 |
|------|---------|---------|
| 页面直接点击 | ProductCard 的 `open`/`add` 事件 | 父组件直接绑定处理函数 |
| AI 聊天交互 | GenUI 调用 `customActions` | AI 根据对话意图调用 action |

ProductCard 的事件与 custom-actions 是通过**两条不同的路径**工作的：
- 前者是用户直接交互
- 后者是 AI 理解意图后执行

---

## 二、事件名不同的原因

| 名称 | 位置 | 作用 |
|------|------|------|
| `open` / `add` | ProductCard.vue 的 `defineEmits` | Vue 组件事件，父组件用 `@open` / `@add` 监听 |
| `onOpen` / `onAdd` | custom-components.ts 的 schema | **给 AI 看的属性描述**，告知 AI 组件支持这些回调属性 |

这是两套不同的系统：
- **Vue 事件** (`open`/`add`)：实际的事件名称
- **AI 属性** (`onOpen`/`onAdd`)：schema 中描述的属性名，AI 理解组件能力用

---

## 三、实际触发的逻辑

### 场景 1：用户在页面直接点击 ProductCard（ProductsView.vue）

```
点击卡片 → emit('open', product) → @open="openProduct" → router.push(...)
点击加购 → emit('add', product) → @add="addProduct" → addToCart()
```

### 场景 2：AI 聊天中触发（AIAssistantDrawer.vue）

```
用户说"帮我加入购物车"
→ AI 调用 addToCart action
→ action.execute()
→ options.addProduct() 回调
→ 实际调用 addToCart(product, 1)
```

---

## 四、AI 判断用户意图的过程

### 4.1 基础信息输入给 AI

GenUIChat 组件会向 AI 传递：

1. **customActions**：AI 知道可以执行哪些操作
   - `addToCart` - 加购物车
   - `openProduct` - 打开商品详情
   - `openCart` - 打开购物车页面

2. **customComponents**：AI 知道可以渲染哪些组件
   - ProductCard 组件（含 onOpen/onAdd 回调）

3. **MCP 工具**：AI 知道可以查询什么数据
   - `search_products` - 搜索商品

### 4.2 AI 处理流程

```
用户输入（例如："帮我买那个红色的耳机"）
    ↓
AI 分析意图 + 检索可用工具/actions
    ↓
┌─────────────────────────────────────┐
│ 决策分支：                           │
│ ① 需要查询商品 → 调用 MCP 工具      │
│   search_products("红色 耳机")      │
│ ② 需要执行操作 → 调用 customAction  │
│   addToCart({ product })           │
│ ③ 需要展示组件 → 渲染 ProductCard  │
│   并注入 onOpen/onAdd 回调         │
└─────────────────────────────────────┘
    ↓
执行相应操作，返回结果给用户
```

---

## 五、点击流式生成的卡片按钮的处理过程

关键在于 **custom-fetch.ts** 中的 system prompt（第 92 行）：

```
商品卡片需要绑定加入购物车事件和打开商品详情事件，请务必给对应的事件绑定对应的交互事件, 禁止自定义方法，必须使用this.callAction中提到的方法，例如：this.callAction('addToCart', { product: product })
```

### 完整流程

```
┌─────────────────────────────────────────────────────────────┐
│ 1. AI 生成响应（流式返回 ProductCard 组件）                 │
│    AI 根据 system prompt 指示，在组件上绑定事件              │
│    例如：onAdd: this.callAction('addToCart', {product})    │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│ 2. GenUI SDK 解析 AI返回的组件，识别 callAction 调用       │
│    将 this.callAction('addToCart', {product})               │
│    映射到 customActions 中定义的 addToCart action           │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│ 3. 用户点击 "加入购物车" 按钮                              │
│    → 触发 onAdd 回调                                       │
│    → 执行 addToCart action 的 execute 函数                │
│    → 调用 options.addProduct(product)                      │
│    → 最终执行 addToCart(product, 1)                       │
└─────────────────────────────────────────────────────────────┘
```

### 关键机制

1. **AI 端**：system prompt 指示 AI 用 `this.callAction('actionName', params)` 格式绑定事件

2. **GenUI SDK 端**：解析 AI 返回的组件，将 `callAction` 调用与 `customActions` 中定义的 action 关联

3. **执行端**：点击按钮 → 触发绑定的 action → 执行回调 → 真正添加购物车

---

## 六、相关文件索引

| 文件路径 | 作用 |
|---------|------|
| `packages/e-commerce/src/components/ProductCard.vue` | 商品卡片组件，定义 open/add 事件 |
| `packages/e-commerce/src/genui/chat/custom-actions.ts` | 定义 AI 可调用的操作（addToCart、openProduct 等） |
| `packages/e-commerce/src/genui/chat/custom-components.ts` | 定义 AI 可使用的组件及其 schema |
| `packages/e-commerce/src/components/AIAssistantDrawer.vue` | AI 助手抽屉，组装 customActions 和 customComponents |
| `packages/e-commerce/src/genui/mcp/custom-fetch.ts` | 自定义 fetch，包含 system prompt 指导 AI 如何绑定事件 |
| `packages/e-commerce/src/genui/mcp/product-mcp.ts` | MCP 工具定义，暴露商品搜索能力给 AI |