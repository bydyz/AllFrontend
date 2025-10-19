type CalcType = (num1: number, num2: number) => number

//！ 像上面定义函数类型时， 用 =>  ，是不能用 interface 的，需要用下一节 的格式
// interface CalcType = (num1: number, num2: number) => number


// 1.函数的定义
function calc(calcFn: CalcType) {
  const num1 = 10
  const num2 = 20
  const res = calcFn(num1, num2)
  console.log(res)
}


//！ 类型检测过不了，可以少传参数，不可以多传
// calc(function(num1, num2, num3) {
//   return num1 + num2 + num3
// })


//！ JavaScript 规范声明任何没有 export 的 JavaScript 文件都应该被认为是一个脚本，而非一个模块
//！ 如果你有一个文件，现在没有任何 import 或者 export，但是你希望它被作为模块处理，添加这行代码  export{}
export {}
