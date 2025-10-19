const names: string[] = ["abc", "cba", "nba"]

//! 匿名函数是否需要添加类型注解呢? 最好不要添加类型注解，会自动推导
names.forEach(function(item, index, arr) {
  console.log(item, index, arr)
})












// 匿名函数与函数声明会有一些不同：
//   当一个函数出现在TypeScript可以确定该函数会被如何调用的地方时；
//   该函数的参数会自动指定类型
const names1 = ['abc', 'cba', 'nba']
names1.forEach(item => {
  console.log(item.toUpperCase())
})

const names2 = ['abc', 'cba', 'nba', 6]
names2.forEach(item => {
  console.log(item)
  console.log(item.length)
})
// 此处，我们并没有指定item的类型，但是item是一个string类型：
//   这是因为TypeScript会根据forEach函数的类型以及数组的类型推断出item的类型；
//   这个过程称之为上下文类型（contextual typing），因为函数执行的上下文可以帮助确定参数和返回值的类型




//！ JavaScript 规范声明任何没有 export 的 JavaScript 文件都应该被认为是一个脚本，而非一个模块
//！ 如果你有一个文件，现在没有任何 import 或者 export，但是你希望它被作为模块处理，添加这行代码  export{}
export {}
