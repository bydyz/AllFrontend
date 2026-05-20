// 在TypeScript中，类的属性和方法支持三种修饰符： public、private、protected
//！ public  如果成员没有使用任何修饰符，则默认为 public。在类的内部和外部都可以访问。                                        意思就是只能在申明的类内部、子类内部、类及子类的实例中使用
//！ private  成员被标记为 private 时，只能在定义该成员的类内部访问，外部无法访问。                                           意思就是只能在申明的类内部使用
//！ protected  成员被标记为 protected 时，它可以在定义该成员的类的内部以及该类的派生类中访问，但在类的外部是无法访问的。       意思就是只能在申明的类以及其子类的内部使用

// Property 'name' is protected and only accessible within class 'Person' and its subclasses
class Person {
  protected name: string
  private age: number

  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }

  // 方法变成私有方法: 只有在类内部才能访问
  private eating() {
    console.log("吃东西", this.age, this.name)
  }

  callSelf() {
    this.eating()
  }
}

const p = new Person("why", 18)
console.log(p.name, p.age)
console.log(p.name)
console.log(p.age)

p.name = "kobe"
p.age = 18

p.eating()

p.callSelf()






//！ JavaScript 规范声明任何没有 export 的 JavaScript 文件都应该被认为是一个脚本，而非一个模块
//！ 如果你有一个文件，现在没有任何 import 或者 export，但是你希望它被作为模块处理，添加这行代码  export{}
export {}