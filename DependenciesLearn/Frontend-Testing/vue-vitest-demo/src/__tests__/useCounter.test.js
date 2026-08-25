/**
 * useCounter 组合式函数测试
 * 演示 Vitest 组合式函数测试：响应式状态、计算属性
 */
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
