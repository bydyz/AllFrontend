// 在 JavaScript 中，undefined 和 null 是两个基本数据类型    在TypeScript中，它们各自的类型也是undefined和null，也就意味着它们既是实际的值，也是自己的类型
let n: null = null
let u: undefined = undefined
n = 1


//！ JavaScript 规范声明任何没有 export 的 JavaScript 文件都应该被认为是一个脚本，而非一个模块
//！ 如果你有一个文件，现在没有任何 import 或者 export，但是你希望它被作为模块处理，添加这行代码  export{}
export {}
