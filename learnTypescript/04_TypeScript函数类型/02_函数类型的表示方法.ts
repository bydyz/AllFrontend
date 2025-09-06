// 方案一: 函数类型表达式 function type expression
//!   格式: (参数列表) => 返回值
type BarType = (num1: number) => number
const bar: BarType = (arg: number): number => {
  return 123
}

//!  变量类型限定好了，后面就可以不用再进行限定了
const bar2: BarType = arg => {
  return 123
}

const bar3: BarType = arg => {
  return arg + '1'
}



//！ JavaScript 规范声明任何没有 export 的 JavaScript 文件都应该被认为是一个脚本，而非一个模块
//！ 如果你有一个文件，现在没有任何 import 或者 export，但是你希望它被作为模块处理，添加这行代码  export{}
export {}

