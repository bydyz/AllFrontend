/**
 * Counter 组件测试
 * 演示 Vitest 组件测试：渲染、事件、props
 */
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
      expect(wrapper.find('.status').text()).toContain('非正数')
    })
  })

  // ========== Props测试 ==========
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

    it('状态应该正确反映正负性', async () => {
      const wrapper = mount(Counter)
      
      // 初始状态：0（非正数）
      expect(wrapper.find('.status').text()).toContain('非正数')
      
      // 点击+按钮：1（正数）
      await wrapper.find('.increment').trigger('click')
      expect(wrapper.find('.status').text()).toContain('正数')
      
      // 点击重置：0（非正数）
      await wrapper.find('.reset').trigger('click')
      expect(wrapper.find('.status').text()).toContain('非正数')
    })
  })
})
