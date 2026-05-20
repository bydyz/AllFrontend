//  Object.defineProperty
//    1. 作用
//      ○ 设置对象值（单个)
//        ■ 新增属性
//        ■ 修改属性
//      ○ 设置属性的描述符
//    2. 返回值
//      ○ 修改后的对象；两个对象指向同一个内存地址

//  属性描述符
//    ● 数据描述符：包含一个值的属性。可以设置 value, writable。
//    ● 存取描述符：由 getter-setter 函数对组成的属性。可以设置 get, set。
//    ● 通用特性：既可以应用于数据描述符也可以应用于访问器描述符，包括 enumerable 和 configurable


// 1. 定义一个新属性
const a = {};

let b = Object.defineProperty(a, 'newProp', {
  value: 'Hello, World!',
  writable: true,
  enumerable: true,
  configurable: true
});

console.log(a.newProp); // 输出: Hello, World!
console.log(b)

// a  b 指向同一个内存地址
b.newProp = '666'
console.log(a)
console.log(b)


// 注意事项：
// 使用 Object.defineProperty 定义的属性默认情况下是  不可枚举  的，这意味着它们在 for...in 循环中不会出现。
// 在严格模式下，尝试修改不可配置的属性（例如，通过 delete 删除属性）会抛出错误。
// 描述符对象的属性默认值为 undefined。
// Object.defineProperty 是一个强大的工具，可以用于精细地控制对象属性的行为。然而，对于一般情况下，通常使用简化的语法如 obj.property = value 来定义属性。