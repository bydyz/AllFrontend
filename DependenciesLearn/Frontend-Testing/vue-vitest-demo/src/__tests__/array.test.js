/**
 * 数组工具函数测试
 * 演示 Vitest 数组测试：深度比较、数组操作
 */
import { describe, it, expect } from 'vitest'
import {
  unique,
  chunk,
  flatten,
  groupBy,
  sortBy,
  intersection,
  difference,
  sum,
  average
} from '../utils/array'

describe('数组工具函数', () => {
  // ========== 数组去重测试 ==========
  describe('unique 函数', () => {
    it('应该正确去除重复元素', () => {
      expect(unique([1, 2, 3, 2, 1])).toEqual([1, 2, 3])
    })

    it('应该正确处理字符串数组', () => {
      expect(unique(['a', 'b', 'a', 'c'])).toEqual(['a', 'b', 'c'])
    })

    it('应该正确处理空数组', () => {
      expect(unique([])).toEqual([])
    })

    it('应该正确处理没有重复的数组', () => {
      expect(unique([1, 2, 3])).toEqual([1, 2, 3])
    })
  })

  // ========== 数组分块测试 ==========
  describe('chunk 函数', () => {
    it('应该正确分块', () => {
      expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]])
    })

    it('应该正确处理不能整除的情况', () => {
      expect(chunk([1, 2, 3, 4, 5, 6], 4)).toEqual([[1, 2, 3, 4], [5, 6]])
    })

    it('应该正确处理空数组', () => {
      expect(chunk([], 3)).toEqual([])
    })

    it('应该正确处理每个元素一块的情况', () => {
      expect(chunk([1, 2, 3], 1)).toEqual([[1], [2], [3]])
    })
  })

  // ========== 数组扁平化测试 ==========
  describe('flatten 函数', () => {
    it('应该正确扁平化一层', () => {
      expect(flatten([1, [2, 3], 4])).toEqual([1, 2, 3, 4])
    })

    it('应该支持指定深度', () => {
      expect(flatten([1, [2, [3, [4]]]], 2)).toEqual([1, 2, 3, [4]])
    })

    it('应该正确处理深度为0的情况', () => {
      expect(flatten([1, [2, 3]], 0)).toEqual([1, [2, 3]])
    })

    it('应该正确处理空数组', () => {
      expect(flatten([])).toEqual([])
    })
  })

  // ========== 数组分组测试 ==========
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

    it('应该正确处理空数组', () => {
      expect(groupBy([], x => x)).toEqual({})
    })
  })

  // ========== 数组排序测试 ==========
  describe('sortBy 函数', () => {
    it('应该正确排序数字数组', () => {
      expect(sortBy([3, 1, 4, 1, 5], (a, b) => a - b)).toEqual([1, 1, 3, 4, 5])
    })

    it('应该正确排序字符串数组', () => {
      expect(sortBy(['banana', 'apple', 'cherry'], (a, b) => a.localeCompare(b)))
        .toEqual(['apple', 'banana', 'cherry'])
    })

    it('应该不修改原数组', () => {
      const arr = [3, 1, 2]
      sortBy(arr, (a, b) => a - b)
      expect(arr).toEqual([3, 1, 2])
    })
  })

  // ========== 数组交集测试 ==========
  describe('intersection 函数', () => {
    it('应该正确计算交集', () => {
      expect(intersection([1, 2, 3, 4], [3, 4, 5, 6])).toEqual([3, 4])
    })

    it('当没有交集时应该返回空数组', () => {
      expect(intersection([1, 2], [3, 4])).toEqual([])
    })

    it('应该正确处理重复元素', () => {
      expect(intersection([1, 2, 2, 3], [2, 2, 4])).toEqual([2, 2])
    })
  })

  // ========== 数组差集测试 ==========
  describe('difference 函数', () => {
    it('应该正确计算差集', () => {
      expect(difference([1, 2, 3, 4], [3, 4, 5, 6])).toEqual([1, 2])
    })

    it('当没有差集时应该返回空数组', () => {
      expect(difference([1, 2], [1, 2, 3])).toEqual([])
    })

    it('应该正确处理完全不同的数组', () => {
      expect(difference([1, 2], [3, 4])).toEqual([1, 2])
    })
  })

  // ========== 数组求和测试 ==========
  describe('sum 函数', () => {
    it('应该正确计算总和', () => {
      expect(sum([1, 2, 3, 4, 5])).toBe(15)
    })

    it('应该正确处理空数组', () => {
      expect(sum([])).toBe(0)
    })

    it('应该正确处理负数', () => {
      expect(sum([-1, -2, -3])).toBe(-6)
      expect(sum([-1, 2, -3])).toBe(-2)
    })
  })

  // ========== 数组平均值测试 ==========
  describe('average 函数', () => {
    it('应该正确计算平均值', () => {
      expect(average([1, 2, 3, 4, 5])).toBe(3)
    })

    it('应该正确处理空数组', () => {
      expect(average([])).toBe(0)
    })

    it('应该正确处理小数结果', () => {
      expect(average([1, 2])).toBeCloseTo(1.5)
    })
  })
})
