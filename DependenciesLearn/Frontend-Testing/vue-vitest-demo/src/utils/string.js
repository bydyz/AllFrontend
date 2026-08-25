/**
 * 字符串工具函数模块
 * 提供常用的字符串处理函数，用于演示 Vitest 单元测试
 */

/**
 * 反转字符串
 * @param {string} str - 输入字符串
 * @returns {string} 反转后的字符串
 */
export function reverseString(str) {
  return str.split('').reverse().join('')
}

/**
 * 检查是否为回文字符串
 * @param {string} str - 输入字符串
 * @returns {boolean} 是否为回文
 */
export function isPalindrome(str) {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '')
  return cleaned === reverseString(cleaned)
}

/**
 * 统计字符串中某个字符出现的次数
 * @param {string} str - 输入字符串
 * @param {string} char - 要统计的字符
 * @returns {number} 出现次数
 */
export function countChar(str, char) {
  return str.split('').filter(c => c === char).length
}

/**
 * 将字符串转换为驼峰命名
 * @param {string} str - 输入字符串（支持连字符或下划线）
 * @returns {string} 驼峰命名字符串
 */
export function toCamelCase(str) {
  return str
    .replace(/[-_]+(.)/g, (_, c) => c.toUpperCase())
    .replace(/^(.)/, (_, c) => c.toLowerCase())
}

/**
 * 将字符串转换为帕斯卡命名（首字母大写）
 * @param {string} str - 输入字符串
 * @returns {string} 帕斯卡命名字符串
 */
export function toPascalCase(str) {
  const camel = toCamelCase(str)
  return camel.charAt(0).toUpperCase() + camel.slice(1)
}

/**
 * 截断字符串并在末尾添加省略号
 * @param {string} str - 输入字符串
 * @param {number} maxLength - 最大长度
 * @returns {string} 截断后的字符串
 */
export function truncate(str, maxLength) {
  if (str.length <= maxLength) return str
  return str.slice(0, maxLength) + '...'
}

/**
 * 提取并高亮搜索关键词
 * @param {string} text - 原文本
 * @param {string} keyword - 搜索关键词
 * @returns {string} 包含高亮标记的文本
 */
export function highlightKeyword(text, keyword) {
  if (!keyword) return text
  const regex = new RegExp(`(${keyword})`, 'gi')
  return text.replace(regex, '<mark>$1</mark>')
}
