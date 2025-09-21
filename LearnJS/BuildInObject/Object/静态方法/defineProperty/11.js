const obj = {
  _internal: 10
}

Object.defineProperty(obj, 'value', {
  get() {
    return this._internal * 2
  },
  set(newValue) {
    this._internal = newValue
  },
  enumerable: true,
  configurable: true
})

// 对  现有属性  进行 属性描述符 设置  是进行修改
Object.defineProperty(obj, 'value', {
  enumerable: false,
  configurable: true
})

// 对  未添加属性  进行 属性描述符 设置  是新加  且会移除其互斥属性
Object.defineProperty(obj, 'value', {
  writable: false
})

const descriptor = Object.getOwnPropertyDescriptor(obj, 'value')
console.log(descriptor)

/* 输出：
{
  get: [Function: get],
  set: [Function: set],
  enumerable: false,
  configurable: true
}
*/

console.log(Object.getOwnPropertyDescriptors(obj))