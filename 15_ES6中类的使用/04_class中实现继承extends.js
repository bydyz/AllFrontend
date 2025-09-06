class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
    //！ constructor里面也可调用下面的方法
  }

  //！ 类中普通的方法不可通过  类名直接调用，需要用类的实例变量调用
  running() {
    console.log(this.name + " running~")
  }
  eating() {
    console.log(this.name + " eating~")
  }

  personMethod() {
    console.log("处理逻辑1")
    console.log("处理逻辑2")
    console.log("处理逻辑3")
  }

  static staticMethod() {
    console.log("PersonStaticMethod")
  }
}

// Student称之为子类(派生类)
class Student extends Person {
  // JS引擎在解析子类的时候就有要求, 如果我们有实现继承
  // 那么子类的构造方法中, 在使用this之前
  constructor(name, age, sno) {
    // ！ super会调用父类的构造器
    super(name, age)
    this.sno = sno
  }

  studying() {
    console.log(this.name + " studying~")
  }

  // 类对父类的方法的重写
  running() {
    console.log("student " + this.name + " running")
  }

  // 重写personMethod方法
  personMethod() {
    //！ 调用父类中的处理逻辑
    super.personMethod()

    console.log("处理逻辑4")
    console.log("处理逻辑5")
    console.log("处理逻辑6")
  }

  // 重写静态方法
  static staticMethod() {
    //！ 调用父类中的静态方法
    super.staticMethod()
    console.log("StudentStaticMethod")
  }
}

var stu = new Student("why", 18, 111)
console.log(stu)

//！ 类中普通的方法不可通过  类名直接调用，需要用类的实例变量调用
// console.log(Person.running())

// console.log(Object.getOwnPropertyDescriptors(stu.__proto__))
// console.log(Object.getOwnPropertyDescriptors(stu.__proto__.__proto__))

stu.eating()
stu.running()

stu.personMethod()

Student.staticMethod()

// console.log(Object.getOwnPropertyDescriptors(Person))

