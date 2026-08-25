/**
 * 数学工具函数测试
 * 演示 Vitest 基础测试：describe、it、expect
 */
import { describe, it, expect } from 'vitest'
import { add, subtract, multiply, divide, isEven, factorial, fibonacci } from '../utils/math'

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

  // ========== 减法测试 ==========
  describe('subtract 函数', () => {
    it('应该正确计算两数之差', () => {
      expect(subtract(5, 3)).toBe(2)
    })

    it('应该正确处理负数结果', () => {
      expect(subtract(3, 5)).toBe(-2)
    })
  })

  // ========== 乘法测试 ==========
  describe('multiply 函数', () => {
    it('应该正确计算两数之积', () => {
      expect(multiply(3, 4)).toBe(12)
    })

    it('应该正确处理零', () => {
      expect(multiply(5, 0)).toBe(0)
    })

    it('应该正确处理负数', () => {
      expect(multiply(-2, 3)).toBe(-6)
      expect(multiply(-2, -3)).toBe(6)
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

  // ========== 偶数判断测试 ==========
  describe('isEven 函数', () => {
    it('应该正确判断偶数', () => {
      expect(isEven(2)).toBe(true)
      expect(isEven(4)).toBe(true)
      expect(isEven(0)).toBe(true)
    })

    it('应该正确判断奇数', () => {
      expect(isEven(1)).toBe(false)
      expect(isEven(3)).toBe(false)
      expect(isEven(-1)).toBe(false)
    })
  })

  // ========== 阶乘测试 ==========
  describe('factorial 函数', () => {
    it('应该正确计算阶乘', () => {
      expect(factorial(0)).toBe(1)
      expect(factorial(1)).toBe(1)
      expect(factorial(5)).toBe(120)
      expect(factorial(10)).toBe(3628800)
    })

    it('当输入为负数时应该抛出错误', () => {
      expect(() => factorial(-1)).toThrow('负数没有阶乘')
    })
  })

  // ========== 斐波那契数列测试 ==========
  describe('fibonacci 函数', () => {
    it('应该正确计算斐波那契数', () => {
      expect(fibonacci(0)).toBe(0)
      expect(fibonacci(1)).toBe(1)
      expect(fibonacci(2)).toBe(1)
      expect(fibonacci(5)).toBe(5)
      expect(fibonacci(10)).toBe(55)
    })

    it('当索引为负数时应该抛出错误', () => {
      expect(() => fibonacci(-1)).toThrow('索引不能为负数')
    })
  })
})
