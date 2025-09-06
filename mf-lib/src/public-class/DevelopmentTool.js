import {TypesCheck} from '../public-func'

const CreateColor = (str) => {
  let rgb = (r, g, b) => `rgb(${r},${g},${b})`
  let [r = 0, g = 0, b = 0] = str.split('').map(v => v.codePointAt() % 256 || 0)
  let grayLevel = r * 0.299 + g * 0.587 + b * 0.114
  let text = grayLevel >= 192 ? rgb(0, 0, 0) : rgb(255, 255, 255)

  return {
    bg: rgb(r, g, b),
    text
  }
}

export default class DevelopmentTool {
  constructor(name, options) {
    let $name = null
    TypesCheck(name, {
      isString: () => {
        $name = name
        this.options = options || {}
      },
      isObject: () => {
        $name = options?.name
        this.options = name || {}
      }
    })

    if ($name) {
      this.logFormat = (v) => `%c${$name} - ${v}`
    } else {
      this.logFormat = (v) => `%c${v}`
    }
    let {bg, text} = CreateColor($name)
    this.logStyle = this.options.logStyle || `background-color: ${bg};color: ${text};padding: 2px 4px;border-radius: 4px;`

    this.StepLog = this.StepLog.bind(this)
    this.CreateStepLog = this.CreateStepLog.bind(this)
  }

  // 步骤日志
  StepLog(callback, logInfo, ...arg) {
    console.group(this.logFormat(logInfo), this.logStyle)
    console.log(...arg)
    TypesCheck.isFunction(callback) && callback(...arg)
    console.groupEnd()
  }

  CreateStepLog(...arg) {
    return this.StepLog.bind(this, ...arg)
  }
}