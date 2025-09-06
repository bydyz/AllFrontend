/* 类型检查 - 模块重定向 */
export * from './array.js'
export * from './number.js'
export * from './object.js'
export * from './other.js'
export * from './string.js'

/* 类型检查 - 汇总导出 */
import * as array from './array.js'
import * as number from './number.js'
import * as object from './object.js'
import * as other from './other.js'
import * as string from './string.js'

const tools = {
  ...array,
  ...number,
  ...object,
  ...other,
  ...string
}

const TypesCheck = (value, $case, {isOnlyOne = false} = {}) => {
  for (const $caseKey in $case) {
    if (tools[$caseKey] && tools[$caseKey](value)) {
      tools.isFunction($case[$caseKey]) && $case[$caseKey]()
      if (isOnlyOne) return false
    }
  }
}

for (const toolsKey in tools) {
  TypesCheck[toolsKey] = tools[toolsKey]
}

export default TypesCheck