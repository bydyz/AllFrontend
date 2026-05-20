// ES5中，如果我们是不可以在对象中添加相同的属性名称
// 通常我们的做法是定义两个不同的属性名字：比如name1和name2
// 们也可以通过symbol来定义相同的名称，因为Symbol函数返回的是不同的值
const person = {
  name: 'why',
  name: 'rc'
}

const s1: symbol = Symbol('name')
const s2: symbol = Symbol('name')
const person2 = {
  [s1]: 'why',
  [s2]: 'rc',
}




//！ JavaScript 规范声明任何没有 export 的 JavaScript 文件都应该被认为是一个脚本，而非一个模块
//！ 如果你有一个文件，现在没有任何 import 或者 export，但是你希望它被作为模块处理，添加这行代码  export{}
export {}
