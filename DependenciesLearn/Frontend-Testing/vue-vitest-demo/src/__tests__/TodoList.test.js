/**
 * TodoList 组件测试
 * 演示 Vitest 组件测试：列表渲染、表单交互、事件处理
 */
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

  // ========== 清除已完成测试 ==========
  describe('清除已完成', () => {
    it('当有已完成事项时应该显示清除按钮', async () => {
      // 添加并完成一个待办事项
      await wrapper.find('.todo-input').setValue('完成任务')
      await wrapper.find('.add-btn').trigger('click')
      await wrapper.find('.checkbox').trigger('change')
      
      expect(wrapper.find('.clear-btn').exists()).toBe(true)
    })

    it('当没有已完成事项时不应该显示清除按钮', async () => {
      await wrapper.find('.todo-input').setValue('未完成任务')
      await wrapper.find('.add-btn').trigger('click')
      
      expect(wrapper.find('.clear-btn').exists()).toBe(false)
    })

    it('点击清除按钮应该清除所有已完成事项', async () => {
      // 添加两个待办事项
      await wrapper.find('.todo-input').setValue('任务1')
      await wrapper.find('.add-btn').trigger('click')
      
      await wrapper.find('.todo-input').setValue('任务2')
      await wrapper.find('.add-btn').trigger('click')
      
      // 完成第一个任务
      await wrapper.find('.checkbox').trigger('change')
      
      // 清除已完成
      await wrapper.find('.clear-btn').trigger('click')
      
      // 验证只剩一个任务
      expect(wrapper.findAll('.todo-item').length).toBe(1)
      expect(wrapper.find('.title').text()).toBe('任务2')
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
