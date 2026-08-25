/**
 * 数学工具函数模块
 * 提供常用的数学运算函数，用于演示 Vitest 单元测试
 */

/**
 * 加法运算
 * @param {number} a - 第一个加数
 * @param {number} b - 第二个加数
 * @returns {number} 两数之和
 */
export function add(a, b) {
  return a + b
}

/**
 * 减法运算
 * @param {number} a - 被减数
 * @param {number} b - 减数
 * @returns {number} 两数之差
 */
export function subtract(a, b) {
  return a - b
}

/**
 * 乘法运算
 * @param {number} a - 第一个因数
 * @param {number} b - 第二个因数
 * @returns {number} 两数之积
 */
export function multiply(a, b) {
  return a * b
}

/**
 * 除法运算
 * @param {number} a - 被除数
 * @param {number} b - 除数
 * @returns {number} 商
 * @throws {Error} 当除数为0时抛出错误
 */
export function divide(a, b) {
  if (b === 0) {
    throw new Error('除数不能为零')
  }
  return a / b
}

/**
 * 判断是否为偶数
 * @param {number} num - 待检测的数字
 * @returns {boolean} 是否为偶数
 */
export function isEven(num) {
  return num % 2 === 0
}

/**
 * 计算阶乘
 * @param {number} n - 非负整数
 * @returns {number} 阶乘结果
 * @throws {Error} 当输入为负数时抛出错误
 */
export function factorial(n) {
  if (n < 0) {
    throw new Error('负数没有阶乘')
  }
  if (n === 0 || n === 1) {
    return 1
  }
  return n * factorial(n - 1)
}

/**
 * 斐波那契数列
 * @param {number} n - 位置（从0开始）
 * @returns {number} 斐波那契数
 */
export function fibonacci(n) {
  if (n < 0) {
    throw new Error('索引不能为负数')
  }
  if (n === 0) return 0
  if (n === 1) return 1
  
  let prev = 0
  let curr = 1
  for (let i = 2; i <= n; i++) {
    const next = prev + curr
    prev = curr
    curr = next
  }
  return curr
}
