/**
 * 快照测试
 * 演示 Vitest 快照测试：组件渲染快照、数据结构快照
 */
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
