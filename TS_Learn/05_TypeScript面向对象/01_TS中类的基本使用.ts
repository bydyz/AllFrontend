//！ ◼ 类可以有自己的构造函数constructor，当我们通过new关键字创建一个实例时，构造函数会被调用；
//！   构造函数不需要返回任何值，默认返回当前创建出来的实例；
//！ ◼ 类中可以有自己的函数，定义的函数称之为方法




class Person {
  //！ 成员属性: 声明成员属性     感觉这里是否给成员属性限定类型，都可以，只是可能不安全吧

  //！ 如果类型没有声明，那么它们默认是any的
  //！ 可以给属性设置初始化值
  
  //? 在tsconfig.json中, 默认的 strictPropertyInitialization 模式下面我们的属性是必须初始化的，如果没有初始化，那么编译时就会报错；
  //! ✓ 如果我们在 strictPropertyInitialization 模式下确实不希望给属性初始化，可以使用 name!: string语法

  // name!: string


  name: string
  age: number

  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }

  eating() {
    console.log(this.name + " eating")
  }

  running() {
    console.log(this.name + " running")
  }
}

// 实例对象: instance
const p1 = new Person("why", 18)
const p2 = new Person("kobe", 30)

console.log(p1.name, p2.age)







//！ JavaScript 规范声明任何没有 export 的 JavaScript 文件都应该被认为是一个脚本，而非一个模块
//！ 如果你有一个文件，现在没有任何 import 或者 export，但是你希望它被作为模块处理，添加这行代码  export{}
export {}

