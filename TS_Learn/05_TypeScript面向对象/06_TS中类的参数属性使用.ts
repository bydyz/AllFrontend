//！ 可以通过在构造函数参数前添加一个可见性修饰符 public private protected 或者 readonly 来创建参数属性，最后这些类属性字段也会得到这些修饰符

//！ TypeScript 提供了特殊的语法，可以把一个构造函数参数转成一个同名同值的类属性。
//！   这些就被称为参数属性

class Person {
  //！ 此处在constructor的参数中给传入的属性 添加 修饰符，相当于  在class内部用修饰符创建参数，且在constructor中给参数赋值
  //！ 语法糖
  constructor(public name: string, private _age: number, readonly height: number) {
  }

  running() {
    console.log(this._age, "eating")
  }
}

const p = new Person("why", 18, 1.88)
console.log(p.name, p.height)

// p.height = 1.98

export {}
