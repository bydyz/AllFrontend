// !   注意区分与 上面b 的区别，此处是对象里有一个属性是函数
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