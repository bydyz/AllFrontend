/**
 * 数组工具函数模块
 * 提供常用的数组处理函数，用于演示 Vitest 单元测试
 */

/**
 * 数组去重
 * @param {Array} arr - 输入数组
 * @returns {Array} 去重后的数组
 */
export function unique(arr) {
  return [...new Set(arr)]
}

/**
 * 数组分块
 * @param {Array} arr - 输入数组
 * @param {number} size - 每块大小
 * @returns {Array} 分块后的二维数组
 */
export function chunk(arr, size) {
  const chunks = []
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size))
  }
  return chunks
}

/**
 * 数组扁平化（支持指定深度）
 * @param {Array} arr - 输入数组
 * @param {number} depth - 扁平化深度，默认为1
 * @returns {Array} 扁平化后的数组
 */
export function flatten(arr, depth = 1) {
  return arr.reduce((acc, val) => {
    if (Array.isArray(val) && depth > 0) {
      acc.push(...flatten(val, depth - 1))
    } else {
      acc.push(val)
    }
    return acc
  }, [])
}

/**
 * 数组分组
 * @param {Array} arr - 输入数组
 * @param {Function} keyFn - 分组键函数
 * @returns {Object} 分组后的对象
 */
export function groupBy(arr, keyFn) {
  return arr.reduce((groups, item) => {
    const key = keyFn(item)
    groups[key] = groups[key] || []
    groups[key].push(item)
    return groups
  }, {})
}

/**
 * 数组排序（支持自定义比较函数）
 * @param {Array} arr - 输入数组
 * @param {Function} compareFn - 比较函数
 * @returns {Array} 排序后的数组（不修改原数组）
 */
export function sortBy(arr, compareFn) {
  return [...arr].sort(compareFn)
}

/**
 * 数组交集
 * @param {Array} arr1 - 第一个数组
 * @param {Array} arr2 - 第二个数组
 * @returns {Array} 交集数组
 */
export function intersection(arr1, arr2) {
  return arr1.filter(item => arr2.includes(item))
}

/**
 * 数组差集
 * @param {Array} arr1 - 第一个数组
 * @param {Array} arr2 - 第二个数组
 * @returns {Array} 差集数组（存在于arr1但不存在于arr2的元素）
 */
export function difference(arr1, arr2) {
  return arr1.filter(item => !arr2.includes(item))
}

/**
 * 数组求和
 * @param {Array} arr - 数字数组
 * @returns {number} 总和
 */
export function sum(arr) {
  return arr.reduce((acc, val) => acc + val, 0)
}

/**
 * 计算数组平均值
 * @param {Array} arr - 数字数组
 * @returns {number} 平均值
 */
export function average(arr) {
  if (arr.length === 0) return 0
  return sum(arr) / arr.length
}
