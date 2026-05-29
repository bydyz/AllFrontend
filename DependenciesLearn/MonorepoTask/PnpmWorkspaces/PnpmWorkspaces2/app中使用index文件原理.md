# Monorepo 导入解析：从 `@demo/ui` 到 `MyButton`

## 代码位置

| 文件 | 说明 |
|------|------|
| `packages/app/src/App.vue:9` | 导入位置 |
| `packages/ui/src/index.js:3` | 导出位置 |
| `packages/app/package.json:11` | 依赖声明 |
| `packages/ui/package.json:4` | 入口声明 |

---

## 导入语句

```vue
<!-- packages/app/src/App.vue -->
<script setup>
import { MyButton } from '@demo/ui'
</script>
```

---

## 导出内容

`packages/ui/src/index.js` 中使用 **Vue 3 对象组件 + render 函数** 写法：

```js
// packages/ui/src/index.js
import { h } from 'vue'

export const MyButton = {
  props: {
    type: {
      type: String,
      default: 'primary'
    }
  },
  emits: ['click'],
  setup(props, { emit }) {
    return () => h('button', {
      class: `btn btn-${props.type}`,
      onClick: () => emit('click')
    }, 'MyButton')
  }
}
```

这是一个 **Vue 3 对象组件**（非 `.vue` 单文件组件），通过 `h()` 函数返回虚拟 DOM。

---

## 导出命名映射规则

| 导出语法 | 导入语法 |
|----------|----------|
| `export const MyButton` | `import { MyButton } from '@demo/ui'` |
| `export const FooBar` | `import { FooBar } from '@demo/ui'` |
| `export default const Xxx` | `import Xxx from '@demo/ui'` |

映射遵循标准 **ES Module** 语法，与是否 monorepo 无关。

---

## Monorepo 工作原理

### 1. Workspace 配置

```yaml
# pnpm-workspace.yaml
packages:
  - 'packages/*'
```

### 2. 依赖声明

```json
// packages/app/package.json
{
  "dependencies": {
    "@demo/ui": "workspace:*"
  }
}
```

### 3. 包入口声明

```json
// packages/ui/package.json
{
  "name": "@demo/ui",
  "main": "src/index.js"
}
```

### 4. 实际链接

pnpm 解析时会创建符号链接：

```
node_modules/@demo/ui → ../packages/ui/
```

当 Vite/Bundler 处理 `import { MyButton } from '@demo/ui'` 时：

1. 检测到 `@demo/ui` 是 workspace 包（通过 `workspace:*` 前缀）
2. 定位到 `packages/ui/` 目录
3. 读取 `packages/ui/package.json` 的 `main` 字段 → `src/index.js`
4. 从该文件中查找 `export const MyButton`

---

## 关键点总结

- **`MyButton`** = Vue 3 对象组件（用 `h()` 的 render 函数写法）
- **导出规则** = 标准 ES Module 语法
- **工作原理** = pnpm workspace 符号链接 + package.json `main` 字段寻址