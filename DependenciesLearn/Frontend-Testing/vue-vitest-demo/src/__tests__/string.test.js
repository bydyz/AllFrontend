/**
 * 字符串工具函数测试
 * 演示 Vitest 字符串测试：边界情况、正则表达式
 */
import { describe, it, expect } from 'vitest'
import {
  reverseString,
  isPalindrome,
  countChar,
  toCamelCase,
  toPascalCase,
  truncate,
  highlightKeyword
} from '../utils/string'

describe('字符串工具函数', () => {
  // ========== 反转字符串测试 ==========
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

    it('应该正确处理特殊字符和空格', () => {
      expect(reverseString('hello world')).toBe('dlrow olleh')
      expect(reverseString('!@#$')).toBe('$#@!')
    })
  })

  // ========== 回文判断测试 ==========
  describe('isPalindrome 函数', () => {
    it('应该正确判断回文字符串', () => {
      expect(isPalindrome('racecar')).toBe(true)
      expect(isPalindrome('madam')).toBe(true)
      expect(isPalindrome('a')).toBe(true)
    })

    it('应该不区分大小写', () => {
      expect(isPalindrome('RaceCar')).toBe(true)
      expect(isPalindrome('Madam')).toBe(true)
    })

    it('应该忽略非字母数字字符', () => {
      expect(isPalindrome('A man, a plan, a canal: Panama')).toBe(true)
      expect(isPalindrome('race a car')).toBe(false)
    })

    it('应该正确判断非回文字符串', () => {
      expect(isPalindrome('hello')).toBe(false)
      expect(isPalindrome('world')).toBe(false)
    })
  })

  // ========== 字符计数测试 ==========
  describe('countChar 函数', () => {
    it('应该正确统计字符出现次数', () => {
      expect(countChar('hello', 'l')).toBe(2)
      expect(countChar('hello', 'o')).toBe(1)
    })

    it('当字符不存在时应该返回0', () => {
      expect(countChar('hello', 'z')).toBe(0)
    })

    it('应该区分大小写', () => {
      expect(countChar('Hello', 'h')).toBe(0)
      expect(countChar('Hello', 'H')).toBe(1)
    })
  })

  // ========== 驼峰命名转换测试 ==========
  describe('toCamelCase 函数', () => {
    it('应该正确转换连字符格式', () => {
      expect(toCamelCase('hello-world')).toBe('helloWorld')
      expect(toCamelCase('my-long-variable')).toBe('myLongVariable')
    })

    it('应该正确转换下划线格式', () => {
      expect(toCamelCase('hello_world')).toBe('helloWorld')
      expect(toCamelCase('my_long_variable')).toBe('myLongVariable')
    })

    it('应该正确处理已经是驼峰命名的字符串', () => {
      expect(toCamelCase('helloWorld')).toBe('helloWorld')
    })
  })

  // ========== 帕斯卡命名转换测试 ==========
  describe('toPascalCase 函数', () => {
    it('应该正确转换为帕斯卡命名', () => {
      expect(toPascalCase('hello-world')).toBe('HelloWorld')
      expect(toPascalCase('my_long_variable')).toBe('MyLongVariable')
    })
  })

  // ========== 字符串截断测试 ==========
  describe('truncate 函数', () => {
    it('当字符串长度超过最大长度时应该截断', () => {
      expect(truncate('Hello World', 5)).toBe('Hello...')
    })

    it('当字符串长度不超过最大长度时应该保持原样', () => {
      expect(truncate('Hi', 5)).toBe('Hi')
    })

    it('应该正确处理空字符串', () => {
      expect(truncate('', 5)).toBe('')
    })
  })

  // ========== 关键词高亮测试 ==========
  describe('highlightKeyword 函数', () => {
    it('应该正确高亮关键词', () => {
      expect(highlightKeyword('Hello World', 'World')).toBe('Hello <mark>World</mark>')
    })

    it('应该不区分大小写', () => {
      expect(highlightKeyword('Hello World', 'hello')).toBe('<mark>Hello</mark> World')
    })

    it('当关键词为空时应该返回原文本', () => {
      expect(highlightKeyword('Hello World', '')).toBe('Hello World')
    })

    it('应该高亮所有匹配项', () => {
      expect(highlightKeyword('abc abc abc', 'abc')).toBe('<mark>abc</mark> <mark>abc</mark> <mark>abc</mark>')
    })
  })
})
