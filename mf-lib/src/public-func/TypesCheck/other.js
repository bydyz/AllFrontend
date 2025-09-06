/* 类型检查 - 其他 */
import {isObject, isEmptyObject} from './object.js'
import {isArray, isEmptyArray} from './array.js'
import {isNumber} from './number.js'
import {isString, isEmptyString} from './string.js'

export const isUndefined = (v) => v === undefined
export const isNull = (v) => v === null

export const isBoolean = (v) => typeof v === 'boolean'

export const isFunction = (v) => typeof v === 'function'

export const isSymbol = (v) => typeof v === 'symbol'

export const isRegExp = (v) => v instanceof RegExp

// 是否为基本数据类型（primitive data type)
export const isPrimitive = (v) => isUndefined(v) || isNull(v) || isBoolean(v) || isNumber(v) || isString(v) || isSymbol(v)

// 是否为引用数据类型（reference data type)
export const isReference = (v) => isFunction(v) || isObject(v) || isArray(v)


// 是否两值相等
export const isEqual = (a, b) => {

  if (isObject(a) && isObject(b)) {
    if (Object.keys(a).length !== Object.keys(b).length) return false
    for (const k in a) {
      if (!isEqual(a[k], b[k])) return false
    }
    return true
  }

  if (isArray(a) && isArray(b)) {
    if (a.length !== b.length) return false
    return a.every(($a, i) => isEqual($a, b[i]))
  }

  if (isRegExp(a) && isRegExp(b)) return a.toString() === b.toString()

  return a === b
}

// 是否为空值
export const isEmpty = (v) => isEmptyObject(v) || isEmptyArray(v) || isEmptyString(v) || isUndefined(v) || isNull(v)

// 是否不为空值
export const isNotEmpty = (v) => !isEmpty(v)