function foo(arg: number): number {
  return 123
}

// foo本身也是一个标识符, 也应该有自己的类型    如下方的bar是any类型
let bar: any = (arg: number): number => {
  return 123
}

//！ bar是any类型，所以可以给它复制任何类型
bar = '9666'



//！ 此处没有显示设置 bar1的类型，此处是根据类型推断，推断其其类型为 (arg: number): number
const bar1 = (arg: number): number => {
  return 123
}





//！ JavaScript 规范声明任何没有 export 的 JavaScript 文件都应该被认为是一个脚本，而非一个模块
//！ 如果你有一个文件，现在没有任何 import 或者 export，但是你希望它被作为模块处理，添加这行代码  export{}
export {}