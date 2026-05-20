// 数字类型是我们开发中经常使用的类型，TypeScript和JavaScript一样，不区分整数类型（int）和浮点型（double），统一为number类型。
let num: number = 12






// boolean类型只有两个取值：true和false
let isTrue: boolean = true






// string类型是字符串类型，可以使用单引号或者双引号表示；同时也支持ES6的模板字符串来拼接变量和字符串
let message: string = "Hello World"
const name = 'rc'
message = `my name is ${name}`


//！ JavaScript 规范声明任何没有 export 的 JavaScript 文件都应该被认为是一个脚本，而非一个模块
//！ 如果你有一个文件，现在没有任何 import 或者 export，但是你希望它被作为模块处理，添加这行代码  export{}
export{}