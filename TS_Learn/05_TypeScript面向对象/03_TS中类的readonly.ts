// 如果有一个属性我们不希望外界可以任意的修改，只希望确定值后直接使用，那么可以使用readonly


class Person {
  readonly name: string
  age: number

  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }
}

//!   这个步骤 是上面提到的 确定值
const p = new Person("why", 18)

console.log(p.name, p.age)

//!   p.name = "kobe" 只读属性不能进行写入操作
p.age = 20






//！ JavaScript 规范声明任何没有 export 的 JavaScript 文件都应该被认为是一个脚本，而非一个模块
//！ 如果你有一个文件，现在没有任何 import 或者 export，但是你希望它被作为模块处理，添加这行代码  export{}
export {}
