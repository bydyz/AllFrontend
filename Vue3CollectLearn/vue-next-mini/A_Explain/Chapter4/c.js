const parent = {
  _val: 42,
  get value() {
    return this._val
  }
}

const child = Object.create(parent)
child._val = 100 // child 自己的 _val

console.log(child.value)

// const handler = {
//   get(target, prop) {
//     // 没有传 receiver
//     return Reflect.get(target, prop)
//   }
// }

// const proxy = new Proxy(child, handler)

// console.log(proxy.value) // 输出: 42
// console.log(Reflect.get(proxy, 'value'))
