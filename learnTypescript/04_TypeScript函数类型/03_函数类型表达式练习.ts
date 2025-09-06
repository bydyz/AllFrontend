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


// 2.函数的调用
function sum(num1: number, num2: number) {
  return num1 + num2
}

calc(sum)     // 30





console.log('------------------------------------')





//！ TypeScript对于传入的函数的多余的参数会被忽略掉    对象不行
// ！上方定义传入calc的变量是函数，且函数传入的参数为两个整数，返回值也为一个整数，但传入时可以只有一个整数参数，如下方的传入foo
function foo(num1: number) {
  return num1
}

calc(foo)     // 10





console.log('------------------------------------')





function mul(num1: number, num2: number) {
  return num1 * num2
}

calc(mul)     // 200





console.log('------------------------------------')





// 使用匿名函数
calc(function(num1, num2) {
  return num1 - num2
})     // -10





console.log('------------------------------------')





//！ 类型检测过不了，可以少传参数，不可以多传
// calc(function(num1, num2, num3) {
//   return num1 + num2 + num3
// })





//！ JavaScript 规范声明任何没有 export 的 JavaScript 文件都应该被认为是一个脚本，而非一个模块
//！ 如果你有一个文件，现在没有任何 import 或者 export，但是你希望它被作为模块处理，添加这行代码  export{}
export {}
