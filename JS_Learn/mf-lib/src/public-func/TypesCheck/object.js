/* 类型检查 - 对象 */
export const isObject = (v) => toString.call(v) === '[object Object]'
export const isEmptyObject = (v) => isObject(v) && Object.keys(v).length === 0
export const isNotEmptyObject = (v) => isObject(v) && Object.keys(v).length !== 0