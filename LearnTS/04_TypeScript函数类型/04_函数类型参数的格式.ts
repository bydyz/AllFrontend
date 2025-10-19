//！ TypeScript对于传入的函数类型的多余的参数会被忽略掉(the extra arguments are simply ignored.)
type CalcType = (num1: number, num2: number) => number

function calc(calcFn: CalcType) {
  calcFn(10, 20)
}

calc(function(num) {
  return 123
})






// forEach栗子:
const names = ["abc", "cba", "nba"]
names.forEach(function(item) {
  console.log(item.length)
})





//！ TS对于很多类型的检测报不报错, 取决于它的内部规则
// TS版本在不断更新: 在进行合理的类型检测的情况, 让ts同时更好用(好用和类型检测之间找到一个平衡)
// 举一个栗子:
// interface IPerson {
//   name: string
//   age: number
// }
type IPerson = {
  name: string
  age: number
}

// typescript github issue, 成员        
const p = {
  name: "why",
  age: 18,
  height: 1.88,
  address: "广州市"
}

// ??????这里为啥，赋值给info的值超过设定的类型也不会报错呢？？？？？
// !!!前面是 函数的参数的类型限制是对象，当给函数传参时，需要严格按照限制传参
const info: IPerson = p





//！ JavaScript 规范声明任何没有 export 的 JavaScript 文件都应该被认为是一个脚本，而非一个模块
//！ 如果你有一个文件，现在没有任何 import 或者 export，但是你希望它被作为模块处理，添加这行代码  export{}
export {}

