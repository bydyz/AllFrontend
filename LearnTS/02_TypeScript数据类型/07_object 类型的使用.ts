//！ 规定好了 对象  key的name  和  value的类型
const info: {
  name: string
  age: number
} = {
  name: "why",
  age: 18
}





// 2.对象类型和函数类型结合使用
type PointType = {
  x: number
  y: number
  z?: number
}
function printCoordinate(point: PointType) {
  console.log("x坐标:", point.x)
  console.log("y坐标:", point.y)
}

// printCoordinate(123)
printCoordinate({ x: 20, y: 30 })








//！此处是 类型推断
let info1 = {
  name: "why",
  age: 18,
  height: 1.88
}

info1.name = 'rc'

console.log(info1.name)
console.log(info1.age)


// 在 TypeScript 中，object 类型是一个非常宽泛的类型，表示任何非原始类型之外的类型。它包括数组、函数、对象等。

// 在 TypeScript 和 JavaScript 中，原始类型是指那些基本的数据类型，它们包括：

// number: 数字类型，用于表示整数和浮点数。
// string: 字符串类型，用于表示文本。
// boolean: 布尔类型，表示 true 或 false。
// null: 表示空值。
// undefined: 表示未定义的值。
// symbol: 符号类型，引入于 ECMAScript 6。
// 除了上述的原始类型之外，其他所有的类型都被称为非原始类型。非原始类型包括对象、数组、函数、日期等等。它们是通过组合和构建原始类型而来的，具有更复杂的结构和行为。


// 以下是一些非原始类型的示例：
// const myObject: object = { key: 'value' };

// const myArray: number[] = [1, 2, 3];

// function myFunction(): void {
//   // Some code
// }

// const myDate: Date = new Date();



//！ object对象类型可以用于描述一个对象，但是从其中不能获取数据，亦不可设置数据       会提示不存在   执行会报Property 'name' does not exist on type 'object'
let info2: object = {
  name: "why",
  age: 18,
  height: 1.88
}

info2.name = 'rc'
console.log(info2.name)







let info3: object = {
  name: "why",
  age: 18,
  height: 1.88
}

for (let key in info3) {
  if (info2.hasOwnProperty(key)) {
      console.log(key);
  }
}

// 打印
// name
// age
// height







// ES5中，如果我们是不可以在对象中添加相同的属性名称      通常我们的做法是定义两个不同的属性名字：比如name1和name2      们也可以通过symbol来定义相同的名称，因为Symbol函数返回的是不同的值
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
