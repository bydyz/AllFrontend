# Vue Vitest Demo

基于 Vue 3 + Vitest 的单元测试示例项目，演示如何使用 Vitest 进行前端组件、工具函数、组合式函数的单元测试。

## 项目功能

这是一个 Vue 3 应用，包含多个可测试的模块：
- **工具函数**：数学计算、字符串处理、数组操作
- **Vue 组件**：Counter 计数器、TodoList 待办列表
- **组合式函数**：useCounter、useTodoList
- **异步操作**：Promise、async/await、Mock 测试

## 技术栈

- **前端框架**：Vue 3 (Composition API)
- **构建工具**：Vite 8
- **测试框架**：Vitest 4.1
- **测试工具**：@vue/test-utils 2.4
- **测试环境**：jsdom / happy-dom

## 核心 API

### Vitest API
- `describe()` - 定义测试组
- `it()` / `test()` - 定义测试用例
- `expect()` - 断言库
- `vi.fn()` - 创建 Mock 函数
- `vi.spyOn()` - 监听函数调用
- `vi.useFakeTimers()` / `vi.useRealTimers()` - 假时间控制
- `vi.advanceTimersByTime()` - 快进时间
- `beforeEach()` / `afterEach()` - 测试前后钩子

### @vue/test-utils API
- `mount()` - 挂载组件
- `wrapper.find()` - 查找元素
- `wrapper.findAll()` - 查找多个元素
- `wrapper.text()` - 获取文本内容
- `wrapper.html()` - 获取 HTML
- `wrapper.trigger()` - 触发事件
- `wrapper.setValue()` - 设置值
- `wrapper.emitted()` - 获取触发的事件
- `wrapper.props()` - 获取 props

### 断言 API
- `toBe()` - 严格相等
- `toEqual()` - 深度相等
- `toBeTruthy()` / `toBeFalsy()` - 真值/假值
- `toContain()` - 包含
- `toThrow()` - 抛出错误
- `toHaveBeenCalled()` - 被调用
- `toHaveBeenCalledWith()` - 被调用时传入指定参数
- `toHaveBeenCalledTimes()` - 调用次数
- `toMatchInlineSnapshot()` - 内联快照
- `toMatchSnapshot()` - 快照匹配

## 项目结构

```
vue-vitest-demo/
├── src/
│   ├── __tests__/                # 测试文件目录
│   │   ├── math.test.js          # 数学工具函数测试
│   │   ├── string.test.js        # 字符串工具函数测试
│   │   ├── array.test.js         # 数组工具函数测试
│   │   ├── Counter.test.js       # Counter 组件测试
│   │   ├── TodoList.test.js      # TodoList 组件测试
│   │   ├── useCounter.test.js    # useCounter 组合式函数测试
│   │   ├── useTodoList.test.js   # useTodoList 组合式函数测试
│   │   ├── async.test.js         # 异步操作测试
│   │   └── snapshot.test.js      # 快照测试
│   ├── components/               # Vue 组件
│   │   ├── Counter.vue           # 计数器组件
│   │   └── TodoList.vue          # 待办列表组件
│   ├── composables/              # 组合式函数
│   │   ├── useCounter.js         # 计数器逻辑
│   │   └── useTodoList.js        # 待办列表逻辑
│   ├── utils/                    # 工具函数
│   │   ├── math.js               # 数学计算
│   │   ├── string.js             # 字符串处理
│   │   └── array.js              # 数组操作
│   ├── App.vue                   # 根组件
│   └── main.js                   # 入口文件
├── vite.config.js                # Vite + Vitest 配置
└── package.json
```

## 使用方法

### 安装依赖

```bash
npm install
```

### 运行测试

```bash
# 运行所有测试
npm test

# 监听模式运行
npm run test:watch

# 运行测试并生成覆盖率报告
npm run test:coverage
```

### 开发模式

```bash
npm run dev
```

## 测试示例

### 工具函数测试
```javascript
import { describe, it, expect } from 'vitest'
import { add } from '../utils/math'

describe('add 函数', () => {
  it('应该正确计算两个正数的和', () => {
    expect(add(2, 3)).toBe(5)
  })

  it('应该正确处理负数', () => {
    expect(add(-1, -2)).toBe(-3)
  })
})
```

### 组件测试
```javascript
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Counter from '../components/Counter.vue'

describe('Counter 组件', () => {
  it('应该正确渲染组件', () => {
    const wrapper = mount(Counter)
    expect(wrapper.exists()).toBe(true)
  })

  it('点击+按钮应该增加计数', async () => {
    const wrapper = mount(Counter)
    await wrapper.find('.increment').trigger('click')
    expect(wrapper.find('.count').text()).toContain('1')
  })
})
```

### 组合式函数测试
```javascript
import { describe, it, expect, beforeEach } from 'vitest'
import { useCounter } from '../composables/useCounter'

describe('useCounter 组合式函数', () => {
  let counter

  beforeEach(() => {
    counter = useCounter(0, 1)
  })

  it('应该返回正确的初始值', () => {
    expect(counter.count.value).toBe(0)
  })

  it('应该正确增加计数', () => {
    counter.increment()
    expect(counter.count.value).toBe(1)
  })
})
```

### 异步测试
```javascript
import { describe, it, expect, vi } from 'vitest'

describe('异步操作测试', () => {
  it('应该正确处理 Promise resolve', async () => {
    const data = await Promise.resolve({ id: 1, name: '测试数据' })
    expect(data).toEqual({ id: 1, name: '测试数据' })
  })

  it('应该正确 mock 异步函数', async () => {
    const mockFn = vi.fn().mockResolvedValue({ id: 1, name: 'Mock数据' })
    const data = await mockFn()
    expect(data).toEqual({ id: 1, name: 'Mock数据' })
    expect(mockFn).toHaveBeenCalledTimes(1)
  })
})
```

### 快照测试
```javascript
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Counter from '../components/Counter.vue'

describe('快照测试', () => {
  it('Counter 组件应该匹配快照', () => {
    const wrapper = mount(Counter, {
      props: { initialValue: 5 }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
```

## Vitest 配置说明

```javascript
// vite.config.js
export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom',           // 测试环境
    globals: true,                  // 全局启用测试 API
    include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}'],
    coverage: {
      provider: 'v8',               // 覆盖率提供者
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.{js,ts,jsx,tsx}'],
      exclude: ['src/main.js']
    }
  }
})
```

## 测试最佳实践

1. **测试文件命名**：与源文件同名，后缀 `.test.js` 或 `.spec.js`
2. **测试隔离**：使用 `beforeEach` 重置状态
3. **单一职责**：每个测试只验证一个功能点
4. **描述清晰**：使用中文描述测试用例
5. **边界测试**：测试正常流程和异常流程
6. **Mock 策略**：合理使用 Mock 隔离依赖

## 常见问题

### 测试环境配置
- 确保安装了 `jsdom` 或 `happy-dom`
- 在 `vite.config.js` 中配置 `test.environment`

### 组件测试问题
- 使用 `@vue/test-utils` 挂载组件
- 确保组件依赖已正确 Mock

### 快照更新
- 运行 `vitest --update` 更新快照
- 检查快照文件 `src/__tests__/__snapshots__/`

### 覆盖率报告
- 运行 `npm run test:coverage` 生成报告
- 查看 `coverage/` 目录下的 HTML 报告
