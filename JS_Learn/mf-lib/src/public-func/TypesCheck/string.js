/* 类型检查 - 字符串 */
export const isString = (v) => typeof v === 'string'
export const isEmptyString = (v) => v === ''
export const isNotEmptyString = (v) => isString(v) && v !== ''
