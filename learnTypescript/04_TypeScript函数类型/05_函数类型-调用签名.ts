//!   函数的调用签名    两种
type BarType = (num1: number) => number

interface InterfaceType {
  (num1: number): number
}



//！   在 TypeScript 中，直接这样定义是不可行的，因为一个实体不能同时既是对象又是函数。
interface IBar {
  //！ 以下四个属性可以不要
  name: string

  //！ 这里定义了额外的属性，在下面需要赋值，否则会报错
  age: number
  height: number
  weight: number

  // 函数可以调用: 函数调用签名
  (num1: number): number
}

// ！  很怪哦，将变量设置为函数，接口确实具有 函数调用签名的对象
// ！ 创建一个符合接口定义的函数
const bar: IBar = (num1: number): number => {
  return 123
}


// ! 感觉大可不必
//! 也可以如此写，但比较正式的应该是上面的写法   应为函数调用签名只是规定了函数的参数、返回值类型，正式赋值时最好也赋一个做好了限制的函数
// const bar: IBar = (num1) => {
//   return 123
// }


//! 函数的name属性是只读的，不能设置    但是只会在运行时才会报错
/* 
报错信息：

Cannot assign to read only property 'name' of function '(num1) => {
    return 123;
}'

*/
// bar.name = "aaa"

// !函数调用签名中设置里变量，但是必须进行初始化
bar.age = 18
bar.height = 1.7
bar.weight = 160

console.log(bar(123))
console.log(bar.name)
console.log(bar.age)



//！ 开发中如何选择:
// 1.如果只是描述函数类型本身(函数可以被调用), 使用函数类型表达式(Function Type Expressions)
// 2.如果在描述函数作为对象可以被调用, 同时也有其他属性时, 使用函数调用签名(Call Signatures)


// ！！！在 TypeScript 中，接口可以定义既包含属性又包含调用签名的结构，但是直接创建一个同时满足这种接口定义的实体对象是不可行的。
// ！！！这是因为函数和对象在 JavaScript（以及 TypeScript）中是不同的实体类型。
// ！！！如此写，不行啊！！！
// const myObject: IBar = {
//   name: "John",
//   age: 25,
//   height: 180,
//   weight: 70,

//   (num1: number): number {
//     return num1 * num1;
//   }
// };















// !   注意区分与上面的区别，此处是对象里有一个属性是函数
interface IBar2 {
  name: string
  // 这里定义了额外的属性，在下面需要赋值，否则会报错
  age: number
  height: number
  weight: number

  // 函数可以调用: 函数调用签名
  myFunc: (num1: number) => number
}

const myObject: IBar2 = {
  name: "John",
  age: 25,
  height: 180,
  weight: 70,

  myFunc: function(num1: number): number {
    return num1 * num1;
  }

  // myFunc: (num1: number): number => {
  //   return num1 * num1;
  // }
};





//！ JavaScript 规范声明任何没有 export 的 JavaScript 文件都应该被认为是一个脚本，而非一个模块
//！ 如果你有一个文件，现在没有任何 import 或者 export，但是你希望它被作为模块处理，添加这行代码  export{}
export {}


