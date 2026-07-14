/**
 * 计算器模块
 * 提供基础的加减乘除运算功能
 */

/**
 * 加法运算
 * @param {number} a - 第一个数字
 * @param {number} b - 第二个数字
 * @returns {number} 两数之和
 */
function add(a, b) {
  return a + b;
}

/**
 * 减法运算
 * @param {number} a - 被减数
 * @param {number} b - 减数
 * @returns {number} 两数之差
 */
function subtract(a, b) {
  return a - b;
}

/**
 * 乘法运算
 * @param {number} a - 第一个数字
 * @param {number} b - 第二个数字
 * @returns {number} 两数之积
 */
function multiply(a, b) {
  return a * b;
}

/**
 * 除法运算
 * @param {number} a - 被除数
 * @param {number} b - 除数
 * @returns {number} 两数之商
 * @throws {Error} 当除数为零时抛出错误
 */
function divide(a, b) {
  if (b === 0) {
    throw new Error("除数不能为零");
  }
  return a / b;
}

module.exports = {
  add,
  subtract,
  multiply,
  divide,
};
