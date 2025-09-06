/* 类型检查 - 数组 */
export const isArray = Array.isArray
export const isEmptyArray = (v) => isArray(v) && v.length === 0
export const isNotEmptyArray = (v) => isArray(v) && v.length > 0
