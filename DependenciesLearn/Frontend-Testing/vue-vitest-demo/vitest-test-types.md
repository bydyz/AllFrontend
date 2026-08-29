# Vitest 测试类型完整指南

## 目录

1. [Vitest 测试能力总览](#vitest-测试能力总览)
2. [单元测试（Unit Testing）](#1-单元测试unit-testing)
3. [组件测试（Component Testing）](#2-组件测试component-testing)
4. [组合式函数测试（Composables Testing）](#3-组合式函数测试composables-testing)
5. [异步测试（Async Testing）](#4-异步测试async-testing)
6. [Mock 测试（Mocking）](#5-mock-测试mocking)
7. [快照测试（Snapshot Testing）](#6-快照测试snapshot-testing)
8. [类型测试（Type Testing）](#7-类型测试type-testing)
9. [端到端测试（E2E Testing）](#8-端到端测试e2e-testing)
10. [覆盖率测试（Coverage Testing）](#9-覆盖率测试coverage-testing)
11. [测试文件书写规范](#测试文件书写规范)
12. [常用断言 API 速查表](#常用断言-api-速查表)

---

## Vitest 测试能力总览

| 测试类型 | 说明 | 测试文件命名 | 适用场景 |
|---------|------|-------------|---------|
| 单元测试 | 测试独立函数/模块 | `*.test.js` | 工具函数、纯函数 |
| 组件测试 | 测试 Vue/React 组件 | `*.test.js` | UI 组件交互、渲染 |
| 组合式函数测试 | 测试 Composition API | `*.test.js` | Vue 3 组合式函数 |
| 异步测试 | 测试 Promise/async | `*.test.js` | API 请求、定时器 |
| Mock 测试 | 模拟依赖/模块 | `*.test.js` | 外部依赖隔离 |
| 快照测试 | 对比渲染结果 | `*.test.js` | UI 回归测试 |
| 类型测试 | 测试 TypeScript 类型 | `*.test-d.ts` | 类型定义正确性 |
| E2E 测试 | 端到端流程测试 | 结合 Playwright | 完整用户流程 |
| 覆盖率测试 | 代码覆盖率统计 | - | 代码质量评估 |

---

## 1. 单元测试（Unit Testing）

### 什么是单元测试

单元测试是对程序的最小可测试单元（函数、方法）进行验证的测试。它隔离测试单个函数，不依赖外部系统。

### 适用场景

- 纯函数（无副作用）
- 工具函数
- 数据处理函数
- 业务逻辑函数

### 示例代码

```javascript
// src/__tests__/math.test.js
import { describe, it, expect } from 'vitest'
import { add, subtract, multiply, divide, isEven, factorial } from '../utils/math'

describe('数学工具函数', () => {
  // ========== 加法测试 ==========
  describe('add 函数', () => {
    it('应该正确计算两个正数的和', () => {
      expect(add(2, 3)).toBe(5)
    })

    it('应该正确处理负数', () => {
      expect(add(-1, -2)).toBe(-3)
      expect(add(-1, 2)).toBe(1)
    })

    it('应该正确处理零', () => {
      expect(add(0, 5)).toBe(5)
      expect(add(0, 0)).toBe(0)
    })

    it('应该正确处理小数', () => {
      expect(add(0.1, 0.2)).toBeCloseTo(0.3)
    })
  })

  // ========== 除法测试 ==========
  describe('divide 函数', () => {
    it('应该正确计算商', () => {
      expect(divide(10, 2)).toBe(5)
    })

    it('应该正确处理小数结果', () => {
      expect(divide(10, 3)).toBeCloseTo(3.333, 2)
    })

    it('当除数为0时应该抛出错误', () => {
      expect(() => divide(10, 0)).toThrow('除数不能为零')
    })
  })

  // ========== 阶乘测试 ==========
  describe('factorial 函数', () => {
    it('应该正确计算阶乘', () => {
      expect(factorial(0)).toBe(1)
      expect(factorial(1)).toBe(1)
      expect(factorial(5)).toBe(120)
    })

    it('当输入为负数时应该抛出错误', () => {
      expect(() => factorial(-1)).toThrow('负数没有阶乘')
    })
  })
})
```

### 字符串工具函数测试示例

```javascript
// src/__tests__/string.test.js
import { describe, it, expect } from 'vitest'
import { reverseString, isPalindrome, toCamelCase, truncate } from '../utils/string'

describe('字符串工具函数', () => {
  describe('reverseString 函数', () => {
    it('应该正确反转普通字符串', () => {
      expect(reverseString('hello')).toBe('olleh')
    })

    it('应该正确处理空字符串', () => {
      expect(reverseString('')).toBe('')
    })

    it('应该正确处理单个字符', () => {
      expect(reverseString('a')).toBe('a')
    })
  })

  describe('isPalindrome 函数', () => {
    it('应该正确判断回文字符串', () => {
      expect(isPalindrome('racecar')).toBe(true)
      expect(isPalindrome('madam')).toBe(true)
    })

    it('应该不区分大小写', () => {
      expect(isPalindrome('RaceCar')).toBe(true)
    })

    it('应该忽略非字母数字字符', () => {
      expect(isPalindrome('A man, a plan, a canal: Panama')).toBe(true)
    })
  })

  describe('truncate 函数', () => {
    it('当字符串长度超过最大长度时应该截断', () => {
      expect(truncate('Hello World', 5)).toBe('Hello...')
    })

    it('当字符串长度不超过最大长度时应该保持原样', () => {
      expect(truncate('Hi', 5)).toBe('Hi')
    })
  })
})
```

### 数组工具函数测试示例

```javascript
// src/__tests__/array.test.js
import { describe, it, expect } from 'vitest'
import { unique, chunk, flatten, groupBy, sortBy, intersection, difference } from '../utils/array'

describe('数组工具函数', () => {
  describe('unique 函数', () => {
    it('应该正确去除重复元素', () => {
      expect(unique([1, 2, 3, 2, 1])).toEqual([1, 2, 3])
    })

    it('应该正确处理空数组', () => {
      expect(unique([])).toEqual([])
    })
  })

  describe('chunk 函数', () => {
    it('应该正确分块', () => {
      expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]])
    })

    it('应该正确处理不能整除的情况', () => {
      expect(chunk([1, 2, 3, 4, 5, 6], 4)).toEqual([[1, 2, 3, 4], [5, 6]])
    })
  })

  describe('flatten 函数', () => {
    it('应该正确扁平化一层', () => {
      expect(flatten([1, [2, 3], 4])).toEqual([1, 2, 3, 4])
    })

    it('应该支持指定深度', () => {
      expect(flatten([1, [2, [3, [4]]]], 2)).toEqual([1, 2, 3, [4]])
    })
  })

  describe('groupBy 函数', () => {
    it('应该正确按属性分组', () => {
      const users = [
        { name: 'Alice', age: 25 },
        { name: 'Bob', age: 30 },
        { name: 'Charlie', age: 25 }
      ]
      const result = groupBy(users, user => user.age)
      expect(result).toEqual({
        25: [{ name: 'Alice', age: 25 }, { name: 'Charlie', age: 25 }],
        30: [{ name: 'Bob', age: 30 }]
      })
    })
  })

  describe('intersection 函数', () => {
    it('应该正确计算交集', () => {
      expect(intersection([1, 2, 3, 4], [3, 4, 5, 6])).toEqual([3, 4])
    })

    it('当没有交集时应该返回空数组', () => {
      expect(intersection([1, 2], [3, 4])).toEqual([])
    })
  })
})
```

---

## 2. 组件测试（Component Testing）

### 什么是组件测试

组件测试是对 Vue/React 组件进行测试，验证组件的渲染、交互、事件、Props 等功能。

### 适用场景

- 组件渲染输出
- 用户交互（点击、输入）
- Props 传递
- 事件触发
- 插槽内容
- 生命周期

### 示例代码

```javascript
// src/__tests__/Counter.test.js
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Counter from '../components/Counter.vue'

describe('Counter 组件', () => {
  // ========== 渲染测试 ==========
  describe('渲染', () => {
    it('应该正确渲染组件', () => {
      const wrapper = mount(Counter)
      expect(wrapper.exists()).toBe(true)
    })

    it('应该显示标题', () => {
      const wrapper = mount(Counter)
      expect(wrapper.find('h2').text()).toBe('计数器组件')
    })

    it('应该显示初始计数为0', () => {
      const wrapper = mount(Counter)
      expect(wrapper.find('.count').text()).toContain('0')
    })

    it('应该显示正确的状态信息', () => {
      const wrapper = mount(Counter)
      expect(wrapper.find('.status').text()).toContain('偶数')
    })
  })

  // ========== Props 测试 ==========
  describe('Props', () => {
    it('应该使用自定义初始值', () => {
      const wrapper = mount(Counter, {
        props: { initialValue: 10 }
      })
      expect(wrapper.find('.count').text()).toContain('10')
    })

    it('应该使用自定义步长', async () => {
      const wrapper = mount(Counter, {
        props: { initialValue: 0, step: 5 }
      })
      
      await wrapper.find('.increment').trigger('click')
      expect(wrapper.find('.count').text()).toContain('5')
    })
  })

  // ========== 交互测试 ==========
  describe('交互', () => {
    it('点击+按钮应该增加计数', async () => {
      const wrapper = mount(Counter)
      
      await wrapper.find('.increment').trigger('click')
      expect(wrapper.find('.count').text()).toContain('1')
      
      await wrapper.find('.increment').trigger('click')
      expect(wrapper.find('.count').text()).toContain('2')
    })

    it('点击-按钮应该减少计数', async () => {
      const wrapper = mount(Counter)
      
      await wrapper.find('.decrement').trigger('click')
      expect(wrapper.find('.count').text()).toContain('-1')
    })

    it('点击重置按钮应该重置计数', async () => {
      const wrapper = mount(Counter)
      
      await wrapper.find('.increment').trigger('click')
      await wrapper.find('.increment').trigger('click')
      await wrapper.find('.reset').trigger('click')
      
      expect(wrapper.find('.count').text()).toContain('0')
    })
  })

  // ========== 事件测试 ==========
  describe('事件', () => {
    it('点击+按钮应该触发update事件', async () => {
      const wrapper = mount(Counter)
      
      await wrapper.find('.increment').trigger('click')
      
      expect(wrapper.emitted('update')).toBeTruthy()
      expect(wrapper.emitted('update')[0]).toEqual([1])
    })

    it('点击-按钮应该触发update事件', async () => {
      const wrapper = mount(Counter)
      
      await wrapper.find('.decrement').trigger('click')
      
      expect(wrapper.emitted('update')).toBeTruthy()
      expect(wrapper.emitted('update')[0]).toEqual([-1])
    })
  })

  // ========== 计算属性测试 ==========
  describe('计算属性', () => {
    it('状态应该正确反映奇偶性', async () => {
      const wrapper = mount(Counter)
      
      // 初始状态：0（偶数）
      expect(wrapper.find('.status').text()).toContain('偶数')
      
      // 点击+按钮：1（奇数）
      await wrapper.find('.increment').trigger('click')
      expect(wrapper.find('.status').text()).toContain('奇数')
      
      // 再次点击+按钮：2（偶数）
      await wrapper.find('.increment').trigger('click')
      expect(wrapper.find('.status').text()).toContain('偶数')
    })
  })
})
```

### TodoList 组件测试示例

```javascript
// src/__tests__/TodoList.test.js
import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import TodoList from '../components/TodoList.vue'

describe('TodoList 组件', () => {
  let wrapper

  // 每个测试前挂载组件
  beforeEach(() => {
    wrapper = mount(TodoList)
  })

  // ========== 渲染测试 ==========
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

    it('应该显示输入框和添加按钮', () => {
      expect(wrapper.find('.todo-input').exists()).toBe(true)
      expect(wrapper.find('.add-btn').exists()).toBe(true)
    })

    it('添加按钮在输入为空时应该禁用', () => {
      expect(wrapper.find('.add-btn').attributes('disabled')).toBeDefined()
    })
  })

  // ========== 输入交互测试 ==========
  describe('输入交互', () => {
    it('输入框应该响应用户输入', async () => {
      const input = wrapper.find('.todo-input')
      await input.setValue('学习Vue')
      
      expect(input.element.value).toBe('学习Vue')
    })

    it('输入后添加按钮应该启用', async () => {
      await wrapper.find('.todo-input').setValue('学习Vue')
      expect(wrapper.find('.add-btn').attributes('disabled')).toBeUndefined()
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

    it('添加后输入框应该清空', async () => {
      await wrapper.find('.todo-input').setValue('测试任务')
      await wrapper.find('.add-btn').trigger('click')
      
      expect(wrapper.find('.todo-input').element.value).toBe('')
    })
  })

  // ========== 待办事项操作测试 ==========
  describe('待办事项操作', () => {
    it('应该可以标记待办事项为已完成', async () => {
      // 添加待办事项
      await wrapper.find('.todo-input').setValue('完成任务')
      await wrapper.find('.add-btn').trigger('click')
      
      // 点击复选框
      await wrapper.find('.checkbox').trigger('change')
      
      // 验证样式变化
      expect(wrapper.find('.todo-item').classes()).toContain('completed')
    })

    it('应该可以删除待办事项', async () => {
      // 添加待办事项
      await wrapper.find('.todo-input').setValue('删除我')
      await wrapper.find('.add-btn').trigger('click')
      
      // 点击删除按钮
      await wrapper.find('.delete-btn').trigger('click')
      
      // 验证列表为空
      expect(wrapper.find('.todo-item').exists()).toBe(false)
      expect(wrapper.find('.empty-message').exists()).toBe(true)
    })
  })

  // ========== 统计信息测试 ==========
  describe('统计信息', () => {
    it('应该显示正确的统计信息', async () => {
      // 添加两个待办事项
      await wrapper.find('.todo-input').setValue('任务1')
      await wrapper.find('.add-btn').trigger('click')
      
      await wrapper.find('.todo-input').setValue('任务2')
      await wrapper.find('.add-btn').trigger('click')
      
      // 验证统计信息
      const stats = wrapper.find('.stats').text()
      expect(stats).toContain('总计: 2')
      expect(stats).toContain('待完成: 2')
      expect(stats).toContain('已完成: 0')
    })

    it('应该正确更新完成率', async () => {
      // 添加两个待办事项
      await wrapper.find('.todo-input').setValue('任务1')
      await wrapper.find('.add-btn').trigger('click')
      
      await wrapper.find('.todo-input').setValue('任务2')
      await wrapper.find('.add-btn').trigger('click')
      
      // 完成第一个任务
      await wrapper.find('.checkbox').trigger('change')
      
      // 验证完成率
      const stats = wrapper.find('.stats').text()
      expect(stats).toContain('50.0%')
    })
  })

  // ========== 事件测试 ==========
  describe('事件', () => {
    it('添加待办事项时应该触发add事件', async () => {
      await wrapper.find('.todo-input').setValue('新任务')
      await wrapper.find('.add-btn').trigger('click')
      
      expect(wrapper.emitted('add')).toBeTruthy()
      expect(wrapper.emitted('add')[0][0].title).toBe('新任务')
    })

    it('删除待办事项时应该触发remove事件', async () => {
      // 添加待办事项
      await wrapper.find('.todo-input').setValue('删除任务')
      await wrapper.find('.add-btn').trigger('click')
      
      // 删除待办事项
      await wrapper.find('.delete-btn').trigger('click')
      
      expect(wrapper.emitted('remove')).toBeTruthy()
    })

    it('切换状态时应该触发toggle事件', async () => {
      // 添加待办事项
      await wrapper.find('.todo-input').setValue('切换任务')
      await wrapper.find('.add-btn').trigger('click')
      
      // 切换状态
      await wrapper.find('.checkbox').trigger('change')
      
      expect(wrapper.emitted('toggle')).toBeTruthy()
    })
  })
})
```

---

## 3. 组合式函数测试（Composables Testing）

### 什么是组合式函数测试

组合式函数测试是对 Vue 3 Composition API 中的可复用逻辑函数进行测试。

### 适用场景

- 自定义 Hook
- 响应式状态管理
- 业务逻辑封装

### 示例代码

```javascript
// src/__tests__/useCounter.test.js
import { describe, it, expect, beforeEach } from 'vitest'
import { useCounter } from '../composables/useCounter'

describe('useCounter 组合式函数', () => {
  let counter

  // 每个测试前重置计数器
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

    it('应该正确判断正数', () => {
      expect(counter.isPositive.value).toBe(false)
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

    it('应该使用自定义步长', () => {
      const customCounter = useCounter(0, 5)
      customCounter.increment()
      expect(customCounter.count.value).toBe(5)
    })
  })

  describe('decrement 方法', () => {
    it('应该正确减少计数', () => {
      counter.increment()
      counter.increment()
      counter.decrement()
      expect(counter.count.value).toBe(1)
    })

    it('应该可以减少到负数', () => {
      counter.decrement()
      expect(counter.count.value).toBe(-1)
    })
  })

  describe('reset 方法', () => {
    it('应该重置到初始值', () => {
      counter.increment()
      counter.increment()
      counter.reset()
      expect(counter.count.value).toBe(0)
    })

    it('应该重置到自定义初始值', () => {
      const customCounter = useCounter(10, 1)
      customCounter.increment()
      customCounter.reset()
      expect(customCounter.count.value).toBe(10)
    })
  })

  describe('set 方法', () => {
    it('应该设置特定值', () => {
      counter.set(100)
      expect(counter.count.value).toBe(100)
    })

    it('应该支持负数', () => {
      counter.set(-50)
      expect(counter.count.value).toBe(-50)
    })
  })

  describe('计算属性', () => {
    it('isEven 应该正确反映奇偶状态', () => {
      expect(counter.isEven.value).toBe(true) // 0是偶数
      
      counter.increment()
      expect(counter.isEven.value).toBe(false) // 1是奇数
      
      counter.increment()
      expect(counter.isEven.value).toBe(true) // 2是偶数
    })

    it('isPositive 应该正确反映正负状态', () => {
      expect(counter.isPositive.value).toBe(false) // 0不是正数
      
      counter.increment()
      expect(counter.isPositive.value).toBe(true) // 1是正数
      
      counter.reset()
      counter.decrement()
      expect(counter.isPositive.value).toBe(false) // -1不是正数
    })
  })

  describe('边界情况', () => {
    it('应该支持大数值', () => {
      counter.set(Number.MAX_SAFE_INTEGER)
      expect(counter.count.value).toBe(Number.MAX_SAFE_INTEGER)
    })

    it('应该支持负步长', () => {
      const negativeStepCounter = useCounter(10, -2)
      negativeStepCounter.decrement()
      expect(negativeStepCounter.count.value).toBe(12)
    })
  })
})
```

### useTodoList 组合式函数测试示例

```javascript
// src/__tests__/useTodoList.test.js
import { describe, it, expect, beforeEach } from 'vitest'
import { useTodoList } from '../composables/useTodoList'

describe('useTodoList 组合式函数', () => {
  let todoList

  beforeEach(() => {
    todoList = useTodoList()
  })

  describe('初始状态', () => {
    it('应该返回空数组', () => {
      expect(todoList.todos.value).toEqual([])
    })

    it('应该返回正确的统计信息', () => {
      expect(todoList.stats.value).toEqual({
        total: 0,
        completed: 0,
        pending: 0,
        completionRate: 0
      })
    })
  })

  describe('add 方法', () => {
    it('应该添加新的待办事项', () => {
      todoList.add('学习Vue')
      expect(todoList.todos.value.length).toBe(1)
      expect(todoList.todos.value[0].title).toBe('学习Vue')
      expect(todoList.todos.value[0].completed).toBe(false)
    })

    it('应该生成唯一的id', () => {
      todoList.add('任务1')
      todoList.add('任务2')
      expect(todoList.todos.value[0].id).not.toBe(todoList.todos.value[1].id)
    })

    it('应该更新统计信息', () => {
      todoList.add('任务1')
      todoList.add('任务2')
      expect(todoList.stats.value.total).toBe(2)
      expect(todoList.stats.value.pending).toBe(2)
    })
  })

  describe('remove 方法', () => {
    it('应该删除指定的待办事项', () => {
      todoList.add('任务1')
      todoList.add('任务2')
      
      const id = todoList.todos.value[0].id
      todoList.remove(id)
      
      expect(todoList.todos.value.length).toBe(1)
      expect(todoList.todos.value[0].title).toBe('任务2')
    })

    it('应该更新统计信息', () => {
      todoList.add('任务1')
      todoList.remove(todoList.todos.value[0].id)
      
      expect(todoList.stats.value.total).toBe(0)
    })
  })

  describe('toggle 方法', () => {
    it('应该切换待办事项的完成状态', () => {
      todoList.add('任务1')
      const id = todoList.todos.value[0].id
      
      todoList.toggle(id)
      expect(todoList.todos.value[0].completed).toBe(true)
      
      todoList.toggle(id)
      expect(todoList.todos.value[0].completed).toBe(false)
    })

    it('应该更新统计信息', () => {
      todoList.add('任务1')
      todoList.toggle(todoList.todos.value[0].id)
      
      expect(todoList.stats.value.completed).toBe(1)
      expect(todoList.stats.value.pending).toBe(0)
      expect(todoList.stats.value.completionRate).toBe(100)
    })
  })

  describe('clearCompleted 方法', () => {
    it('应该清除所有已完成的待办事项', () => {
      todoList.add('任务1')
      todoList.add('任务2')
      todoList.add('任务3')
      
      // 完成第一个任务
      todoList.toggle(todoList.todos.value[0].id)
      
      // 清除已完成
      todoList.clearCompleted()
      
      expect(todoList.todos.value.length).toBe(2)
      expect(todoList.todos.value[0].title).toBe('任务2')
      expect(todoList.todos.value[1].title).toBe('任务3')
    })
  })
})
```

---

## 4. 异步测试（Async Testing）

### 什么是异步测试

异步测试是对包含异步操作（Promise、async/await、定时器）的代码进行测试。

### 适用场景

- API 请求
- 定时器（setTimeout、setInterval）
- 文件操作
- 数据库操作

### 示例代码

```javascript
// src/__tests__/async.test.js
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

// 模拟的异步函数
function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: 1, name: '测试数据' })
    }, 100)
  })
}

function fetchWithError() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('请求失败'))
    }, 100)
  })
}

// 模拟的API模块
const api = {
  async getUser(id) {
    const response = await fetch(`/api/users/${id}`)
    return response.json()
  },
  
  async createUser(data) {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    return response.json()
  }
}

describe('异步操作测试', () => {
  // ========== Promise测试 ==========
  describe('Promise 测试', () => {
    it('应该正确处理Promise resolve', async () => {
      const data = await fetchData()
      expect(data).toEqual({ id: 1, name: '测试数据' })
    })

    it('应该正确处理Promise reject', async () => {
      try {
        await fetchWithError()
      } catch (error) {
        expect(error.message).toBe('请求失败')
      }
    })

    it('应该使用rejects处理Promise reject', async () => {
      await expect(fetchWithError()).rejects.toThrow('请求失败')
    })
  })

  // ========== async/await测试 ==========
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

    it('应该正确处理Promise.race', async () => {
      const result = await Promise.race([
        new Promise(resolve => setTimeout(() => resolve('慢'), 200)),
        new Promise(resolve => setTimeout(() => resolve('快'), 100))
      ])
      expect(result).toBe('快')
    })
  })

  // ========== Mock测试 ==========
  describe('Mock 测试', () => {
    // 保存原始实现
    const originalFetch = global.fetch

    afterEach(() => {
      // 恢复原始实现
      global.fetch = originalFetch
    })

    it('应该正确mock异步函数', async () => {
      // 创建mock函数
      const mockFetchData = vi.fn().mockResolvedValue({ id: 1, name: 'Mock数据' })
      
      const data = await mockFetchData()
      expect(data).toEqual({ id: 1, name: 'Mock数据' })
      expect(mockFetchData).toHaveBeenCalledTimes(1)
    })

    it('应该正确mock fetch', async () => {
      // Mock fetch
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ id: 1, name: '用户' })
      })
      
      const user = await api.getUser(1)
      expect(user).toEqual({ id: 1, name: '用户' })
      expect(fetch).toHaveBeenCalledWith('/api/users/1')
    })

    it('应该正确mock带延迟的函数', async () => {
      vi.useFakeTimers()
      
      const mockFn = vi.fn()
      setTimeout(() => mockFn('延迟调用'), 1000)
      
      // 时间未到，不应该调用
      expect(mockFn).not.toHaveBeenCalled()
      
      // 快进时间
      vi.advanceTimersByTime(1000)
      
      // 时间到了，应该调用
      expect(mockFn).toHaveBeenCalledWith('延迟调用')
      
      vi.useRealTimers()
    })

    it('应该正确mock模块', async () => {
      // 动态导入模块
      const { default: mathModule } = await import('../utils/math.js')
      
      // Mock模块中的函数
      vi.spyOn(mathModule, 'add').mockReturnValue(100)
      
      // 调用被mock的函数
      const result = mathModule.add(1, 2)
      expect(result).toBe(100)
      expect(mathModule.add).toHaveBeenCalledWith(1, 2)
      
      // 恢复原始实现
      mathModule.add.mockRestore()
    })
  })

  // ========== 定时器Mock测试 ==========
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
      
      // 时间未到
      expect(callback).not.toHaveBeenCalled()
      
      // 快进时间
      vi.advanceTimersByTime(1000)
      
      // 时间到了
      expect(callback).toHaveBeenCalled()
    })

    it('应该正确mock setInterval', () => {
      const callback = vi.fn()
      
      setInterval(callback, 1000)
      
      // 第一次调用
      vi.advanceTimersByTime(1000)
      expect(callback).toHaveBeenCalledTimes(1)
      
      // 第二次调用
      vi.advanceTimersByTime(1000)
      expect(callback).toHaveBeenCalledTimes(2)
    })

    it('应该正确使用vi.runAllTimers()', () => {
      const callback1 = vi.fn()
      const callback2 = vi.fn()
      
      setTimeout(callback1, 1000)
      setTimeout(callback2, 2000)
      
      // 运行所有定时器
      vi.runAllTimers()
      
      expect(callback1).toHaveBeenCalled()
      expect(callback2).toHaveBeenCalled()
    })
  })
})
```

---

## 5. Mock 测试（Mocking）

### 什么是 Mock 测试

Mock 测试是通过模拟依赖项来隔离测试的测试方式，可以控制依赖的行为。

### 适用场景

- 外部 API 调用
- 数据库操作
- 文件系统操作
- 第三方库

### Mock 类型

```javascript
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

describe('Mock 测试详解', () => {
  // ========== 1. 函数 Mock ==========
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

  // ========== 2. 模块 Mock ==========
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

  // ========== 3. 间谍函数（Spy） ==========
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

  // ========== 4. 实际应用示例 ==========
  describe('实际应用', () => {
    // 模拟的 API 模块
    const api = {
      async getUser(id) {
        const response = await fetch(`/api/users/${id}`)
        return response.json()
      }
    }

    // 保存原始实现
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
      
      const user = await api.getUser(1)
      
      expect(user).toEqual({ id: 1, name: '用户' })
      expect(fetch).toHaveBeenCalledWith('/api/users/1')
    })

    it('应该 Mock fetch 失败情况', async () => {
      // Mock fetch 失败
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 404
      })
      
      await expect(api.getUser(1)).rejects.toThrow()
    })
  })
})
```

---

## 6. 快照测试（Snapshot Testing）

### 什么是快照测试

快照测试是将组件的渲染结果或数据结构与之前保存的快照进行对比的测试方式。

### 适用场景

- 组件 UI 回归测试
- 数据结构变化检测
- 配置对象验证

### 示例代码

```javascript
// src/__tests__/snapshot.test.js
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Counter from '../components/Counter.vue'
import TodoList from '../components/TodoList.vue'

describe('快照测试', () => {
  // ========== 组件快照测试 ==========
  describe('组件快照', () => {
    it('Counter 组件应该匹配快照', () => {
      const wrapper = mount(Counter, {
        props: { initialValue: 5 }
      })
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('TodoList 组件应该匹配快照', () => {
      const wrapper = mount(TodoList)
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('带有待办事项的 TodoList 应该匹配快照', async () => {
      const wrapper = mount(TodoList)
      
      // 添加一些待办事项
      await wrapper.find('.todo-input').setValue('任务1')
      await wrapper.find('.add-btn').trigger('click')
      
      await wrapper.find('.todo-input').setValue('任务2')
      await wrapper.find('.add-btn').trigger('click')
      
      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  // ========== 数据结构快照测试 ==========
  describe('数据结构快照', () => {
    it('应该匹配用户数据结构', () => {
      const user = {
        id: 1,
        name: '张三',
        email: 'zhangsan@example.com',
        roles: ['admin', 'user'],
        settings: {
          theme: 'dark',
          language: 'zh-CN'
        }
      }
      
      expect(user).toMatchSnapshot()
    })

    it('应该匹配配置对象', () => {
      const config = {
        api: {
          baseUrl: 'https://api.example.com',
          timeout: 5000,
          retries: 3
        },
        features: {
          darkMode: true,
          notifications: false
        }
      }
      
      expect(config).toMatchSnapshot()
    })
  })

  // ========== 内联快照测试 ==========
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

  // ========== 快照更新测试 ==========
  describe('快照更新', () => {
    it('当组件变化时应该更新快照', () => {
      const wrapper = mount(Counter, {
        props: { initialValue: 10 }
      })
      
      // 这个测试会失败，需要更新快照
      // 运行 vitest --update 来更新快照
      expect(wrapper.find('.count').text()).toContain('10')
    })
  })
})

/**
 * 快照测试说明：
 * 
 * 1. 首次运行时会创建 .snap 文件
 * 2. 后续运行时会对比快照
 * 3. 如果组件发生变化，测试会失败
 * 4. 使用 vitest --update 更新快照
 * 
 * 快照文件位置：src/__tests__/__snapshots__/
 */
```

---

## 7. 类型测试（Type Testing）

### 什么是类型测试

类型测试是测试 TypeScript 类型定义正确性的测试，确保类型在编译时就能发现问题。

### 适用场景

- TypeScript 类型定义
- 泛型约束
- 类型推断验证

### 示例代码

```typescript
// src/__tests__/types.test-d.ts
import { describe, it, expectTypeOf } from 'vitest'
import type { Add, Subtract, User, Todo } from '../types'

describe('类型测试', () => {
  // ========== 基础类型测试 ==========
  describe('基础类型', () => {
    it('Add 类型应该正确推断', () => {
      expectTypeOf<Add<number, number>>().toBeNumber()
      expectTypeOf<Add<string, string>>().toBeString()
    })

    it('Subtract 类型应该正确推断', () => {
      expectTypeOf<Subtract<number, number>>().toBeNumber()
    })
  })

  // ========== 对象类型测试 ==========
  describe('对象类型', () => {
    it('User 类型应该包含必要属性', () => {
      const user: User = {
        id: 1,
        name: '张三',
        email: 'zhangsan@example.com'
      }
      
      expectTypeOf(user).toHaveProperty('id')
      expectTypeOf(user).toHaveProperty('name')
      expectTypeOf(user).toHaveProperty('email')
    })

    it('Todo 类型应该包含必要属性', () => {
      const todo: Todo = {
        id: 1,
        title: '学习',
        completed: false
      }
      
      expectTypeOf(todo).toHaveProperty('id')
      expectTypeOf(todo).toHaveProperty('title')
      expectTypeOf(todo).toHaveProperty('completed')
    })
  })

  // ========== 泛型类型测试 ==========
  describe('泛型类型', () => {
    it('应该正确推断泛型类型', () => {
      const array: Array<number> = [1, 2, 3]
      const promise: Promise<string> = Promise.resolve('hello')
      
      expectTypeOf(array).toEqualTypeOf<number[]>()
      expectTypeOf(promise).toEqualTypeOf<Promise<string>>()
    })
  })

  // ========== 联合类型测试 ==========
  describe('联合类型', () => {
    it('应该正确处理联合类型', () => {
      type Status = 'loading' | 'success' | 'error'
      
      const status: Status = 'loading'
      
      expectTypeOf(status).toEqualTypeOf<Status>()
    })
  })
})
```

---

## 8. 端到端测试（E2E Testing）

### 什么是端到端测试

端到端测试是模拟真实用户操作流程的测试，通常结合 Playwright 或 Cypress。

### 适用场景

- 完整用户流程
- 跨页面导航
- 表单提交
- 用户认证

### 示例代码（结合 Playwright）

```javascript
// e2e/todo.spec.js
import { test, expect } from '@playwright/test'

test.describe('TodoList 端到端测试', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000')
  })

  test('应该能够添加新的待办事项', async ({ page }) => {
    // 输入待办事项
    await page.fill('.todo-input', '学习Vue')
    
    // 点击添加按钮
    await page.click('.add-btn')
    
    // 验证待办事项已添加
    await expect(page.locator('.todo-item')).toHaveCount(1)
    await expect(page.locator('.title')).toHaveText('学习Vue')
  })

  test('应该能够标记待办事项为已完成', async ({ page }) => {
    // 添加待办事项
    await page.fill('.todo-input', '完成任务')
    await page.click('.add-btn')
    
    // 点击复选框
    await page.click('.checkbox')
    
    // 验证样式变化
    await expect(page.locator('.todo-item')).toHaveClass('completed')
  })

  test('应该能够删除待办事项', async ({ page }) => {
    // 添加待办事项
    await page.fill('.todo-input', '删除我')
    await page.click('.add-btn')
    
    // 点击删除按钮
    await page.click('.delete-btn')
    
    // 验证列表为空
    await expect(page.locator('.todo-item')).toHaveCount(0)
    await expect(page.locator('.empty-message')).toBeVisible()
  })

  test('应该显示正确的统计信息', async ({ page }) => {
    // 添加两个待办事项
    await page.fill('.todo-input', '任务1')
    await page.click('.add-btn')
    
    await page.fill('.todo-input', '任务2')
    await page.click('.add-btn')
    
    // 验证统计信息
    await expect(page.locator('.stats')).toContainText('总计: 2')
    await expect(page.locator('.stats')).toContainText('待完成: 2')
    await expect(page.locator('.stats')).toContainText('已完成: 0')
  })
})
```

---

## 9. 覆盖率测试（Coverage Testing）

### 什么是覆盖率测试

覆盖率测试是统计代码被执行比例的测试，帮助识别未被测试覆盖的代码。

### 覆盖率类型

| 类型 | 说明 |
|------|------|
| 语句覆盖率 | 每条语句是否被执行 |
| 分支覆盖率 | 每个分支（if/else）是否被执行 |
| 函数覆盖率 | 每个函数是否被调用 |
| 行覆盖率 | 每行代码是否被执行 |

### 配置示例

```javascript
// vite.config.js
export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',                    // 使用 V8 引擎收集覆盖率
      reporter: ['text', 'json', 'html'], // 输出格式
      include: ['src/**/*.{js,ts,jsx,tsx}'], // 包含的文件
      exclude: ['src/main.js'],            // 排除的文件
      thresholds: {
        statements: 80,                     // 语句覆盖率阈值
        branches: 80,                       // 分支覆盖率阈值
        functions: 80,                      // 函数覆盖率阈值
        lines: 80                           // 行覆盖率阈值
      }
    }
  }
})
```

### 运行覆盖率测试

```bash
# 运行测试并生成覆盖率报告
npm run test:coverage

# 或者
vitest run --coverage
```

### 覆盖率报告示例

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
 src/composables    |   85.00 |    75.00 |   90.00 |   85.00 |
  useCounter.js     |   90.00 |    80.00 |  100.00 |   90.00 |
  useTodoList.js    |   80.00 |    70.00 |   80.00 |   80.00 |
--------------------|---------|----------|---------|---------|
```

---

## 测试文件书写规范

### 1. 文件命名规范

```
源文件：utils/math.js
测试文件：__tests__/math.test.js

源文件：components/Counter.vue
测试文件：__tests__/Counter.test.js

源文件：composables/useCounter.js
测试文件：__tests__/useCounter.test.js
```

### 2. 文件结构规范

```javascript
/**
 * 模块名称 + 测试说明
 * 演示 Vitest 的具体功能
 */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { 被测试模块 } from '../路径/模块'

describe('模块名称', () => {
  // 变量声明
  let 变量名

  // 测试前准备
  beforeEach(() => {
    变量名 = 初始化操作()
  })

  // 测试后清理
  afterEach(() => {
    清理操作()
  })

  // ========== 功能点1测试 ==========
  describe('功能点1', () => {
    it('应该正确处理正常情况', () => {
      // 测试代码
      expect(结果).toBe(预期值)
    })

    it('应该正确处理边界情况', () => {
      // 测试代码
      expect(结果).toBe(预期值)
    })

    it('应该正确处理异常情况', () => {
      // 测试代码
      expect(() => 异常操作()).toThrow('错误信息')
    })
  })

  // ========== 功能点2测试 ==========
  describe('功能点2', () => {
    it('应该正确处理xxx', () => {
      // 测试代码
    })
  })
})
```

### 3. 测试描述规范

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

### 4. 断言规范

```javascript
// ✅ 好的断言
expect(add(2, 3)).toBe(5)                    // 精确匹配
expect(arr).toEqual([1, 2, 3])               // 深度比较
expect(str).toContain('hello')               // 包含检查
expect(fn).toThrow('错误信息')                // 异常检查
expect(value).toBeNull()                     // 空值检查
expect(value).toBeTruthy()                   // 真值检查
expect(mockFn).toHaveBeenCalledWith('参数')   // Mock 调用检查

// ❌ 不好的断言
expect(add(2, 3) === 5).toBe(true)          // 间接断言
expect(typeof str === 'string').toBe(true)   // 类型检查不规范
```

---

## 常用断言 API 速查表

### 基础断言

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

### 数字断言

| API | 说明 | 示例 |
|-----|------|------|
| `toBeGreaterThan` | 大于 | `expect(5).toBeGreaterThan(3)` |
| `toBeGreaterThanOrEqual` | 大于等于 | `expect(5).toBeGreaterThanOrEqual(5)` |
| `toBeLessThan` | 小于 | `expect(3).toBeLessThan(5)` |
| `toBeLessThanOrEqual` | 小于等于 | `expect(3).toBeLessThanOrEqual(3)` |

### Mock 断言

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

### Promise 断言

| API | 说明 | 示例 |
|-----|------|------|
| `resolves` | Promise resolve | `await expect(promise).resolves.toBe(value)` |
| `rejects` | Promise reject | `await expect(promise).rejects.toThrow()` |

### 快照断言

| API | 说明 | 示例 |
|-----|------|------|
| `toMatchSnapshot` | 文件快照 | `expect(value).toMatchSnapshot()` |
| `toMatchInlineSnapshot` | 内联快照 | `expect(value).toMatchInlineSnapshot()` |

---

## 总结

Vitest 是一个功能强大的测试框架，支持以下测试类型：

1. **单元测试**：测试独立函数和模块
2. **组件测试**：测试 Vue/React 组件
3. **组合式函数测试**：测试 Vue Composition API
4. **异步测试**：测试 Promise 和 async/await
5. **Mock 测试**：模拟依赖项进行隔离测试
6. **快照测试**：对比渲染结果和数据结构
7. **类型测试**：测试 TypeScript 类型定义
8. **端到端测试**：结合 Playwright 测试完整流程
9. **覆盖率测试**：统计代码执行比例

通过合理的测试策略和规范的测试代码，可以有效保证代码质量和可维护性。
