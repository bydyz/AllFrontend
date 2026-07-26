// 只定义了  get/set  或者  value/writable    通用的属性描述符为 false，另一个没定义的 为 false/undefined

const obj = {}

Object.defineProperty(obj, 'value', {
  get() {
    return this._internal * 2
  },
  set(newValue) {
    this._internal = newValue
  }
})

const descriptor = Object.getOwnPropertyDescriptor(obj, 'value')
console.log(descriptor)