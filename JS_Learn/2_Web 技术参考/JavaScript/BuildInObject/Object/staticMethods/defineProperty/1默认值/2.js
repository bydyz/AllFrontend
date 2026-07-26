// 只定义了  get/set  或者  value/writable    通用的属性描述符为 false，另一个没定义的 为 false/undefined

const obj = {}
Object.defineProperty(obj, 'name', { value: 'Alice' })
const desc = Object.getOwnPropertyDescriptor(obj, 'name')
console.log(desc)
/* 输出：
{
  value: 'Alice',
  writable: false,
  enumerable: false,
  configurable: false
}
*/