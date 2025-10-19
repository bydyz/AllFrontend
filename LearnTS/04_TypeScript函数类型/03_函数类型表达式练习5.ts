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


//?  any 是 更宽泛；number 是 更具体
//?  此处是  将 更宽泛 -> 更具体；再非严格模式下，可行
let b = function(num1: any, num2: any) {
  return num1 - num2
}

calc(b)     // -10



//！ JavaScript 规范声明任何没有 export 的 JavaScript 文件都应该被认为是一个脚本，而非一个模块
//！ 如果你有一个文件，现在没有任何 import 或者 export，但是你希望它被作为模块处理，添加这行代码  export{}
export {}
