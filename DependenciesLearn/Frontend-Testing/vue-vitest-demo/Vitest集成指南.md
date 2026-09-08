# Vitest 集成指南 - 快速上手全面测试

## 目录

1. [快速开始](#1-快速开始)
2. [项目配置](#2-项目配置)
3. [测试类型详解](#3-测试类型详解)
4. [常用断言 API](#4-常用断言-API)
5. [Mock 测试](#5-Mock-测试)
6. [组件测试](#6-组件测试)
7. [组合式函数测试](#7-组合式函数测试)
8. [异步测试](#8-异步测试)
9. [快照测试](#9-快照测试)
10. [覆盖率测试](#10-覆盖率测试)
11. [最佳实践](#11-最佳实践)
12. [常见问题](#12-常见问题)

---

## 1. 快速开始

### 1.1 安装依赖

```bash
# 安装 Vitest 和相关依赖
npm install -D vitest @vue/test-utils @vitest/coverage-v8 jsdom happy-dom

# 或者使用 yarn
yarn add -D vitest @vue/test-utils @vitest/coverage-v8 jsdom happy-dom
```

### 1.2 配置 package.json

```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage"
  }
}
```

### 1.3 配置 vite.config.js

```javascript
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue()],
  test: {
    // 测试环境：模拟浏览器 DOM 环境
    environment: 'jsdom',
    
    // 全局启用测试 API（describe, it, expect 等）
    globals: true,
    
    // 测试文件匹配模式
    include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}'],
    
    // 覆盖率配置
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.{js,ts,jsx,tsx}'],
      exclude: ['src/main.js']
    }
  }
})
```

### 1.4 运行测试

```bash
# 运行所有测试
npm test

# 监听模式（文件修改时自动重新运行）
npm run test:watch

# 运行测试并生成覆盖率报告
npm run test:coverage
```

---

## 2. 项目配置

### 2.1 目录结构

```
project/
├── src/
│   ├── __tests__/                    # 测试文件目录
│   │   ├── math.test.js             # 数学工具函数测试
│   │   ├── string.test.js           # 字符串工具函数测试
│   │   ├── array.test.js            # 数组工具函数测试
│   │   ├── Counter.test.js          # Counter 组件测试
│   │   ├── TodoList.test.js         # TodoList 组件测试
│   │   ├── useCounter.test.js       # useCounter 组合式函数测试
│   │   ├── useTodoList.test.js      # useTodoList 组合式函数测试
│   │   ├── async.test.js            # 异步操作测试
│   │   ├── snapshot.test.js         # 快照测试
│   │   └── __snapshots__/           # 快照文件目录（自动生成）
│   ├── components/                   # Vue 组件
│   ├── composables/                  # 组合式函数
│   ├── utils/                        # 工具函数
│   └── App.vue
├── vite.config.js
└── package.json
```

### 2.2 关键配置项说明

| 配置项 | 说明 | 常用值 |
|--------|------|--------|
| `environment` | 测试环境 | `'jsdom'`、`'happy-dom'` |
| `globals` | 全局启用测试 API | `true`、`false` |
| `include` | 测试文件匹配模式 | `['src/**/*.{test,spec}.{js,ts}']` |
| `coverage.provider` | 覆盖率收集器 | `'v8'`、`'istanbul'` |
| `coverage.reporter` | 覆盖率报告格式 | `['text', 'json', 'html']` |

### 2.3 测试环境选择

| 环境 | 说明 | 适用场景 |
|------|------|----------|
| `jsdom` | 模拟完整浏览器 DOM | Vue/React 组件测试 |
| `happy-dom` | 轻量级 DOM 实现 | 简单组件测试，速度更快 |
| `node` | Node.js 环境 | 纯函数测试，无需 DOM |

---

## 3. 测试类型详解

### 3.1 单元测试（Unit Testing）

测试独立函数或模块，无外部依赖。

```javascript
import { describe, it, expect } from 'vitest'
import { add, subtract } from '../utils/math'

describe('数学工具函数', () => {
  describe('add 函数', () => {
    it('应该正确计算两个正数的和', () => {
      expect(add(2, 3)).toBe(5)
    })

    it('应该正确处理负数', () => {
      expect(add(-1, -2)).toBe(-3)
    })

    it('应该正确处理零', () => {
      expect(add(0, 5)).toBe(5)
    })

    it('应该正确处理小数', () => {
      expect(add(0.1, 0.2)).toBeCloseTo(0.3)
    })
  })
})
```

### 3.2 组件测试（Component Testing）

测试 Vue 组件的渲染、交互、事件等。

```javascript
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Counter from '../components/Counter.vue'

describe('Counter 组件', () => {
  // 渲染测试
  it('应该正确渲染组件', () => {
    const wrapper = mount(Counter)
    expect(wrapper.exists()).toBe(true)
  })

  it('应该显示初始计数为0', () => {
    const wrapper = mount(Counter)
    expect(wrapper.find('.count').text()).toContain('0')
  })

  // Props 测试
  it('应该使用自定义初始值', () => {
    const wrapper = mount(Counter, {
      props: { initialValue: 10 }
    })
    expect(wrapper.find('.count').text()).toContain('10')
  })

  // 交互测试
  it('点击+按钮应该增加计数', async () => {
    const wrapper = mount(Counter)
    await wrapper.find('.increment').trigger('click')
    expect(wrapper.find('.count').text()).toContain('1')
  })

  // 事件测试
  it('点击+按钮应该触发update事件', async () => {
    const wrapper = mount(Counter)
    await wrapper.find('.increment').trigger('click')
    expect(wrapper.emitted('update')).toBeTruthy()
    expect(wrapper.emitted('update')[0]).toEqual([1])
  })
})
```

### 3.3 组合式函数测试（Composables Testing）

测试 Vue 3 Composition API 中的可复用逻辑。

```javascript
import { describe, it, expect, beforeEach } from 'vitest'
import { useCounter } from '../composables/useCounter'

describe('useCounter 组合式函数', () => {
  let counter

  beforeEach(() => {
    counter = useCounter(0, 1)
  })

  describe('初始状态', () => {
    it('应该返回正确的初始值', () => {
      expect(counter.count.value).toBe(0)
    })

    it('应该正确判断偶数', () => {
      expect(counter.isEven.value).toBe(true)
    })
  })

  describe('increment 方法', () => {
    it('应该正确增加计数', () => {
      counter.increment()
      expect(counter.count.value).toBe(1)
    })

    it('应该多次增加计数', () => {
      counter.increment()
      counter.increment()
      counter.increment()
      expect(counter.count.value).toBe(3)
    })
  })

  describe('reset 方法', () => {
    it('应该重置到初始值', () => {
      counter.increment()
      counter.increment()
      counter.reset()
      expect(counter.count.value).toBe(0)
    })
  })
})
```

### 3.4 异步测试（Async Testing）

测试 Promise、async/await、定时器等异步操作。

```javascript
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

// 模拟的异步函数
function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: 1, name: '测试数据' })
    }, 100)
  })
}

describe('异步操作测试', () => {
  describe('Promise 测试', () => {
    it('应该正确处理Promise resolve', async () => {
      const data = await fetchData()
      expect(data).toEqual({ id: 1, name: '测试数据' })
    })

    it('应该使用rejects处理Promise reject', async () => {
      const fetchWithError = () => Promise.reject(new Error('请求失败'))
      await expect(fetchWithError()).rejects.toThrow('请求失败')
    })
  })

  describe('定时器Mock测试', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it('应该正确mock setTimeout', () => {
      const callback = vi.fn()
      
      setTimeout(callback, 1000)
      
      // 时间未到，不应该调用
      expect(callback).not.toHaveBeenCalled()
      
      // 快进时间
      vi.advanceTimersByTime(1000)
      
      // 时间到了，应该调用
      expect(callback).toHaveBeenCalled()
    })
  })
})
```

### 3.5 快照测试（Snapshot Testing）

对比组件渲染结果或数据结构是否发生变化。

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

  it('应该匹配内联快照', () => {
    const wrapper = mount(Counter)
    expect(wrapper.find('.count').text()).toMatchInlineSnapshot('"当前计数: 0"')
  })
})
```

**快照更新命令**：
```bash
# 更新所有快照
vitest --update

# 更新特定文件的快照
vitest snapshot.test.js --update
```

---

## 4. 常用断言 API

### 4.1 基础断言

| API | 说明 | 示例 |
|-----|------|------|
| `toBe` | 严格相等（===） | `expect(1+1).toBe(2)` |
| `toEqual` | 深度相等 | `expect({a:1}).toEqual({a:1})` |
| `toBeNull` | 严格等于 null | `expect(null).toBeNull()` |
| `toBeUndefined` | 严格等于 undefined | `expect(undefined).toBeUndefined()` |
| `toBeDefined` | 已定义 | `expect(1).toBeDefined()` |
| `toBeTruthy` | 真值 | `expect(1).toBeTruthy()` |
| `toBeFalsy` | 假值 | `expect(0).toBeFalsy()` |
| `toContain` | 包含 | `expect('hello').toContain('ell')` |
| `toContainEqual` | 包含深度相等元素 | `expect([1,2]).toContainEqual(2)` |
| `toHaveLength` | 长度 | `expect([1,2]).toHaveLength(2)` |
| `toHaveProperty` | 属性 | `expect({a:1}).toHaveProperty('a')` |
| `toBeCloseTo` | 浮点数接近 | `expect(0.1+0.2).toBeCloseTo(0.3)` |
| `toMatch` | 正则匹配 | `expect('hello').toMatch(/^hel/)` |
| `toThrow` | 抛出错误 | `expect(()=>fn()).toThrow()` |

### 4.2 数字断言

| API | 说明 | 示例 |
|-----|------|------|
| `toBeGreaterThan` | 大于 | `expect(5).toBeGreaterThan(3)` |
| `toBeGreaterThanOrEqual` | 大于等于 | `expect(5).toBeGreaterThanOrEqual(5)` |
| `toBeLessThan` | 小于 | `expect(3).toBeLessThan(5)` |
| `toBeLessThanOrEqual` | 小于等于 | `expect(3).toBeLessThanOrEqual(3)` |

### 4.3 Mock 断言

| API | 说明 | 示例 |
|-----|------|------|
| `toHaveBeenCalled` | 被调用过 | `expect(mockFn).toHaveBeenCalled()` |
| `toHaveBeenCalledTimes` | 调用次数 | `expect(mockFn).toHaveBeenCalledTimes(1)` |
| `toHaveBeenCalledWith` | 调用参数 | `expect(mockFn).toHaveBeenCalledWith('arg')` |
| `toHaveBeenLastCalledWith` | 最后调用参数 | `expect(mockFn).toHaveBeenLastCalledWith('arg')` |
| `toHaveBeenNthCalledWith` | 第N次调用参数 | `expect(mockFn).toHaveBeenNthCalledWith(1, 'arg')` |
| `toHaveReturned` | 返回过值 | `expect(mockFn).toHaveReturned()` |
| `toHaveReturnedTimes` | 返回次数 | `expect(mockFn).toHaveReturnedTimes(1)` |
| `toHaveReturnedWith` | 返回值 | `expect(mockFn).toHaveReturnedWith('result')` |

### 4.4 Promise 断言

| API | 说明 | 示例 |
|-----|------|------|
| `resolves` | Promise resolve | `await expect(promise).resolves.toBe(value)` |
| `rejects` | Promise reject | `await expect(promise).rejects.toThrow()` |

### 4.5 快照断言

| API | 说明 | 示例 |
|-----|------|------|
| `toMatchSnapshot` | 文件快照 | `expect(value).toMatchSnapshot()` |
| `toMatchInlineSnapshot` | 内联快照 | `expect(value).toMatchInlineSnapshot()` |

---

## 5. Mock 测试

### 5.1 函数 Mock

```javascript
import { describe, it, expect, vi } from 'vitest'

describe('函数 Mock', () => {
  it('应该创建一个 Mock 函数', () => {
    const mockFn = vi.fn()
    
    mockFn('参数1')
    mockFn('参数2')
    
    expect(mockFn).toHaveBeenCalledTimes(2)
    expect(mockFn).toHaveBeenCalledWith('参数1')
    expect(mockFn).toHaveBeenCalledWith('参数2')
  })

  it('应该 Mock 函数返回值', () => {
    const mockFn = vi.fn()
    mockFn.mockReturnValue('mock结果')
    
    const result = mockFn()
    expect(result).toBe('mock结果')
  })

  it('应该 Mock 函数返回 Promise', async () => {
    const mockFn = vi.fn()
    mockFn.mockResolvedValue({ id: 1, name: '用户' })
    
    const result = await mockFn()
    expect(result).toEqual({ id: 1, name: '用户' })
  })

  it('应该 Mock 函数抛出错误', () => {
    const mockFn = vi.fn()
    mockFn.mockImplementation(() => {
      throw new Error('Mock错误')
    })
    
    expect(() => mockFn()).toThrow('Mock错误')
  })
})
```

### 5.2 模块 Mock

```javascript
import { describe, it, expect, vi } from 'vitest'

describe('模块 Mock', () => {
  it('应该 Mock 整个模块', async () => {
    // Mock 模块
    vi.mock('../utils/math.js', () => ({
      add: vi.fn().mockReturnValue(100),
      subtract: vi.fn().mockReturnValue(50)
    }))
    
    // 导入被 Mock 的模块
    const { add, subtract } = await import('../utils/math.js')
    
    expect(add(1, 2)).toBe(100)
    expect(subtract(5, 3)).toBe(50)
  })
})
```

### 5.3 间谍函数（Spy）

```javascript
import { describe, it, expect, vi } from 'vitest'

describe('间谍函数', () => {
  it('应该监听对象方法', () => {
    const obj = {
      greet: (name) => `你好, ${name}`
    }
    
    const spy = vi.spyOn(obj, 'greet')
    
    obj.greet('张三')
    
    expect(spy).toHaveBeenCalledWith('张三')
    expect(spy).toHaveBeenCalledTimes(1)
    
    // 恢复原始实现
    spy.mockRestore()
  })

  it('应该 Mock 对象方法', () => {
    const obj = {
      greet: (name) => `你好, ${name}`
    }
    
    vi.spyOn(obj, 'greet').mockReturnValue('Mock问候')
    
    const result = obj.greet('张三')
    
    expect(result).toBe('Mock问候')
    expect(obj.greet).toHaveBeenCalledWith('张三')
  })
})
```

### 5.4 Mock fetch 请求

```javascript
import { describe, it, expect, vi, afterEach } from 'vitest'

describe('Mock fetch', () => {
  const originalFetch = global.fetch

  afterEach(() => {
    // 恢复原始实现
    global.fetch = originalFetch
  })

  it('应该 Mock fetch 请求', async () => {
    // Mock fetch
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ id: 1, name: '用户' })
    })
    
    const response = await fetch('/api/users/1')
    const user = await response.json()
    
    expect(user).toEqual({ id: 1, name: '用户' })
    expect(fetch).toHaveBeenCalledWith('/api/users/1')
  })
})
```

---

## 6. 组件测试

### 6.1 测试工具

```javascript
import { mount, shallowMount } from '@vue/test-utils'
```

| 方法 | 说明 | 适用场景 |
|------|------|----------|
| `mount` | 完整挂载组件 | 需要测试子组件、插槽、样式 |
| `shallowMount` | 浅层挂载组件 | 只测试当前组件逻辑 |

### 6.2 常用 API

```javascript
// 查找元素
wrapper.find('.class-name')          // 单个元素
wrapper.findAll('.class-name')       // 所有匹配元素
wrapper.find('button')               // 标签选择器

// 获取内容
wrapper.text()                       // 文本内容
wrapper.html()                       // HTML 内容
wrapper.attributes('disabled')       // 属性
wrapper.classes()                    // 类名
wrapper.element.value                // 表单值

// 触发事件
await wrapper.find('button').trigger('click')
await wrapper.find('input').setValue('新值')
await wrapper.find('input').trigger('keyup.enter')

// 检查事件
wrapper.emitted()                    // 所有事件
wrapper.emitted('update')            // 特定事件
wrapper.emitted('update')[0]         // 事件参数

// 断言
wrapper.exists()                     // 是否存在
wrapper.isVisible()                  // 是否可见
```

### 6.3 完整组件测试示例

```javascript
import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import TodoList from '../components/TodoList.vue'

describe('TodoList 组件', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(TodoList)
  })

  // 渲染测试
  describe('渲染', () => {
    it('应该正确渲染组件', () => {
      expect(wrapper.exists()).toBe(true)
    })

    it('应该显示标题', () => {
      expect(wrapper.find('h2').text()).toBe('待办事项')
    })

    it('应该显示空状态提示', () => {
      expect(wrapper.find('.empty-message').exists()).toBe(true)
      expect(wrapper.find('.empty-message').text()).toBe('暂无待办事项')
    })
  })

  // 输入交互测试
  describe('输入交互', () => {
    it('输入框应该响应用户输入', async () => {
      const input = wrapper.find('.todo-input')
      await input.setValue('学习Vue')
      
      expect(input.element.value).toBe('学习Vue')
    })

    it('点击添加按钮应该添加待办事项', async () => {
      await wrapper.find('.todo-input').setValue('学习Vue')
      await wrapper.find('.add-btn').trigger('click')
      
      expect(wrapper.find('.todo-item').exists()).toBe(true)
      expect(wrapper.find('.title').text()).toBe('学习Vue')
    })

    it('按回车键应该添加待办事项', async () => {
      await wrapper.find('.todo-input').setValue('按回车添加')
      await wrapper.find('.todo-input').trigger('keyup.enter')
      
      expect(wrapper.find('.title').text()).toBe('按回车添加')
    })
  })

  // 待办事项操作测试
  describe('待办事项操作', () => {
    it('应该可以标记待办事项为已完成', async () => {
      await wrapper.find('.todo-input').setValue('完成任务')
      await wrapper.find('.add-btn').trigger('click')
      
      await wrapper.find('.checkbox').trigger('change')
      
      expect(wrapper.find('.todo-item').classes()).toContain('completed')
    })

    it('应该可以删除待办事项', async () => {
      await wrapper.find('.todo-input').setValue('删除我')
      await wrapper.find('.add-btn').trigger('click')
      
      await wrapper.find('.delete-btn').trigger('click')
      
      expect(wrapper.find('.todo-item').exists()).toBe(false)
    })
  })

  // 事件测试
  describe('事件', () => {
    it('添加待办事项时应该触发add事件', async () => {
      await wrapper.find('.todo-input').setValue('新任务')
      await wrapper.find('.add-btn').trigger('click')
      
      expect(wrapper.emitted('add')).toBeTruthy()
      expect(wrapper.emitted('add')[0][0].title).toBe('新任务')
    })
  })
})
```

---

## 7. 组合式函数测试

### 7.1 测试要点

1. 使用 `beforeEach` 重置状态
2. 访问响应式值需要使用 `.value`
3. 测试计算属性的响应式更新

### 7.2 完整示例

```javascript
import { describe, it, expect, beforeEach } from 'vitest'
import { useTodoList } from '../composables/useTodoList'

describe('useTodoList 组合式函数', () => {
  let todoList

  beforeEach(() => {
    todoList = useTodoList()
  })

  describe('初始状态', () => {
    it('应该返回空的待办事项列表', () => {
      expect(todoList.todos.value).toEqual([])
    })

    it('应该返回正确的统计数据', () => {
      expect(todoList.pendingTodos.value).toEqual([])
      expect(todoList.completedTodos.value).toEqual([])
      expect(todoList.totalCount.value).toBe(0)
      expect(todoList.completionRate.value).toBe(0)
    })
  })

  describe('addTodo 方法', () => {
    it('应该添加新的待办事项', () => {
      const todo = todoList.addTodo('学习Vue')
      expect(todo.title).toBe('学习Vue')
      expect(todo.completed).toBe(false)
      expect(todo.id).toBeDefined()
    })

    it('应该将待办事项添加到列表中', () => {
      todoList.addTodo('任务1')
      todoList.addTodo('任务2')
      expect(todoList.todos.value.length).toBe(2)
    })
  })

  describe('removeTodo 方法', () => {
    it('应该删除指定的待办事项', () => {
      const todo = todoList.addTodo('要删除的任务')
      const result = todoList.removeTodo(todo.id)
      expect(result).toBe(true)
      expect(todoList.todos.value.length).toBe(0)
    })

    it('当ID不存在时应该返回false', () => {
      const result = todoList.removeTodo(999)
      expect(result).toBe(false)
    })
  })

  describe('toggleTodo 方法', () => {
    it('应该切换待办事项的完成状态', () => {
      const todo = todoList.addTodo('要完成的任务')
      const updatedTodo = todoList.toggleTodo(todo.id)
      expect(updatedTodo.completed).toBe(true)
    })

    it('应该可以取消完成', () => {
      const todo = todoList.addTodo('任务')
      todoList.toggleTodo(todo.id)
      todoList.toggleTodo(todo.id)
      expect(todo.completed).toBe(false)
    })
  })

  describe('计算属性', () => {
    it('completionRate 应该正确计算完成率', () => {
      todoList.addTodo('任务1')
      const todo2 = todoList.addTodo('任务2')
      todoList.addTodo('任务3')
      
      todoList.toggleTodo(todo2.id)
      
      expect(todoList.completionRate.value).toBeCloseTo(33.33, 1)
    })
  })
})
```

---

## 8. 异步测试

### 8.1 async/await 测试

```javascript
import { describe, it, expect } from 'vitest'

describe('async/await 测试', () => {
  it('应该正确使用async/await', async () => {
    const result = await Promise.resolve(42)
    expect(result).toBe(42)
  })

  it('应该正确处理多个异步操作', async () => {
    const results = await Promise.all([
      Promise.resolve(1),
      Promise.resolve(2),
      Promise.resolve(3)
    ])
    expect(results).toEqual([1, 2, 3])
  })
})
```

### 8.2 定时器 Mock

```javascript
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

describe('定时器Mock测试', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('应该正确mock setTimeout', () => {
    const callback = vi.fn()
    
    setTimeout(callback, 1000)
    
    expect(callback).not.toHaveBeenCalled()
    
    vi.advanceTimersByTime(1000)
    
    expect(callback).toHaveBeenCalled()
  })

  it('应该正确mock setInterval', () => {
    const callback = vi.fn()
    
    setInterval(callback, 1000)
    
    vi.advanceTimersByTime(1000)
    expect(callback).toHaveBeenCalledTimes(1)
    
    vi.advanceTimersByTime(1000)
    expect(callback).toHaveBeenCalledTimes(2)
  })

  it('应该正确使用vi.runAllTimers()', () => {
    const callback1 = vi.fn()
    const callback2 = vi.fn()
    
    setTimeout(callback1, 1000)
    setTimeout(callback2, 2000)
    
    vi.runAllTimers()
    
    expect(callback1).toHaveBeenCalled()
    expect(callback2).toHaveBeenCalled()
  })
})
```

---

## 9. 快照测试

### 9.1 文件快照

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

### 9.2 内联快照

```javascript
describe('内联快照', () => {
  it('应该匹配内联快照', () => {
    const wrapper = mount(Counter)
    expect(wrapper.find('.count').text()).toMatchInlineSnapshot('"当前计数: 0"')
  })

  it('应该匹配对象内联快照', () => {
    const data = {
      items: [1, 2, 3],
      total: 6
    }
    
    expect(data).toMatchInlineSnapshot(`
      {
        "items": [
          1,
          2,
          3,
        ],
        "total": 6,
      }
    `)
  })
})
```

### 9.3 快照更新

```bash
# 更新所有快照
vitest --update

# 更新特定文件的快照
vitest snapshot.test.js --update
```

---

## 10. 覆盖率测试

### 10.1 运行覆盖率测试

```bash
# 运行测试并生成覆盖率报告
npm run test:coverage

# 或者
vitest run --coverage
```

### 10.2 覆盖率配置

```javascript
// vite.config.js
export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',                    // 使用 V8 引擎收集覆盖率
      reporter: ['text', 'json', 'html'], // 输出格式
      include: ['src/**/*.{js,ts,jsx,tsx}'], // 包含的文件
      exclude: ['src/main.js'],          // 排除的文件
      thresholds: {
        statements: 80,                  // 语句覆盖率阈值
        branches: 80,                    // 分支覆盖率阈值
        functions: 80,                   // 函数覆盖率阈值
        lines: 80                        // 行覆盖率阈值
      }
    }
  }
})
```

### 10.3 覆盖率类型

| 类型 | 说明 |
|------|------|
| 语句覆盖率 | 每条语句是否被执行 |
| 分支覆盖率 | 每个分支（if/else）是否被执行 |
| 函数覆盖率 | 每个函数是否被调用 |
| 行覆盖率 | 每行代码是否被执行 |

### 10.4 覆盖率报告示例

```
--------------------|---------|----------|---------|---------|
File                | % Stmts | % Branch | % Funcs | % Lines |
--------------------|---------|----------|---------|---------|
All files           |   85.71 |    75.00 |   90.00 |   85.71 |
 src/utils          |   90.00 |    80.00 |  100.00 |   90.00 |
  math.js           |   95.00 |    85.00 |  100.00 |   95.00 |
  string.js         |   85.00 |    75.00 |  100.00 |   85.00 |
  array.js          |   90.00 |    80.00 |  100.00 |   90.00 |
 src/components     |   80.00 |    70.00 |   80.00 |   80.00 |
  Counter.vue       |   85.00 |    75.00 |   85.00 |   85.00 |
  TodoList.vue      |   75.00 |    65.00 |   75.00 |   75.00 |
--------------------|---------|----------|---------|---------|
```

---

## 11. 最佳实践

### 11.1 文件组织

- 测试文件统一放在 `src/__tests__/` 目录下
- 测试文件命名与源文件保持一致（`xxx.test.js`）
- 快照文件自动生成在 `__snapshots__/` 目录

### 11.2 测试结构

- 使用 `describe` 分组组织测试用例
- 使用 `it` 或 `test` 定义单个测试用例
- 测试描述使用中文，清晰表达测试意图

### 11.3 测试隔离

- 使用 `beforeEach` 重置测试状态
- 每个测试用例独立，不依赖其他测试
- Mock 在 `afterEach` 中恢复

### 11.4 断言规范

```javascript
// ✅ 好的断言
expect(add(2, 3)).toBe(5)                    // 精确匹配
expect(arr).toEqual([1, 2, 3])               // 深度比较
expect(str).toContain('hello')               // 包含检查
expect(fn).toThrow('错误信息')                // 异常检查
expect(mockFn).toHaveBeenCalledWith('参数')   // Mock 调用检查

// ❌ 不好的断言
expect(add(2, 3) === 5).toBe(true)          // 间接断言
expect(typeof str === 'string').toBe(true)   // 类型检查不规范
```

### 11.5 测试描述规范

```javascript
// ✅ 好的描述
it('应该正确计算两个正数的和', () => { ... })
it('当除数为0时应该抛出错误', () => { ... })
it('应该使用自定义初始值', () => { ... })

// ❌ 不好的描述
it('测试加法', () => { ... })
it('测试错误', () => { ... })
it('测试初始值', () => { ... })
```

---

## 12. 常见问题

### 12.1 测试文件未被识别

**问题**：Vitest 没有运行我的测试文件。

**解决**：检查 `vite.config.js` 中的 `include` 配置：

```javascript
test: {
  include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}']
}
```

确保测试文件名匹配这个模式。

### 12.2 DOM 环境错误

**问题**：`document is not defined` 或类似错误。

**解决**：确保配置了正确的测试环境：

```javascript
test: {
  environment: 'jsdom'  // 或 'happy-dom'
}
```

### 12.3 Mock 未生效

**问题**：Mock 函数没有按预期工作。

**解决**：
1. 确保在测试前调用 Mock
2. 使用 `vi.mock()` 时，确保模块路径正确
3. 使用 `vi.spyOn()` 时，确保对象存在

### 12.4 快照测试失败

**问题**：快照测试失败，但代码没有问题。

**解决**：更新快照：

```bash
vitest --update
```

### 12.5 覆盖率过低

**问题**：代码覆盖率低于阈值。

**解决**：
1. 添加更多测试用例覆盖未测试的代码
2. 检查是否有未测试的分支
3. 调整覆盖率阈值（如果合理）

---

## 快速参考

### 常用命令

```bash
# 运行所有测试
npm test

# 监听模式
npm run test:watch

# 覆盖率报告
npm run test:coverage

# 更新快照
vitest --update

# 运行特定测试文件
vitest math.test.js

# 运行匹配的测试
vitest -t "数学工具函数"
```

### 导入语句

```javascript
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
```

### 断言速查

| 断言 | 用途 |
|------|------|
| `toBe` | 严格相等 |
| `toEqual` | 深度相等 |
| `toContain` | 包含 |
| `toThrow` | 抛出错误 |
| `toHaveBeenCalled` | Mock 被调用 |
| `toBeTruthy` | 真值 |
| `toBeFalsy` | 假值 |
| `toMatchSnapshot` | 快照对比 |

---

*最后更新：2024年*
