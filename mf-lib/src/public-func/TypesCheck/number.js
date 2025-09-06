/* 类型检查 - 数字 */
export const isNumber = (v) => typeof v === 'number' && v > Number.NEGATIVE_INFINITY && v < Number.POSITIVE_INFINITY

export const isFloat = (v) => isNumber(v) && v % 1 !== 0