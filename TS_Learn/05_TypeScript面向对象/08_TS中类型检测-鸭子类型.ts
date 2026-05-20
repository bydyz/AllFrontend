//！ TypeScript对于类型检测的时候使用的鸭子类型
//！ 鸭子类型: 如果一只鸟, 走起来像鸭子, 游起来像鸭子, 看起来像鸭子, 那么你可以认为它就是一只鸭子
//！ 鸭子类型, 只关心属性和行为, 不关心你具体是不是对应的类型

class Person {
  constructor(public name: string, public age: number) {}

  running() {}
}

class Student extends Person {
  constructor(name: string, age: number, public grade: number) {
    super(name, age)
  }

  eat() {}
}

class Dog {
  constructor(public name: string, public age: number) {}

  running() {}
}

// ！！可以直接将命名的类当做类型，进行参数限制      实际传参时，要传入  类的实例对象 或 子类的实例
function printPerson(p: Person) {
  console.log(p.name, p.age)
}

// !  父类做类型限制，传入子类实例
printPerson(new Student("rc", 25, 90))

//！！ 前面使用 类 进行参数类型限制，调用时是传入 其实例化对象
printPerson(new Person("why", 18))
// printPerson("abc")

printPerson({name: "kobe", age: 30, running: function() {}})
printPerson(new Person("rc", 25))


// ！  虽然限定的是 Person 但是，传入的是 Dog实例
// ！  传参的属性限制为 类，对此我们可以传入 类的实例
const person: Person = new Dog("果汁", 5)


export {}
