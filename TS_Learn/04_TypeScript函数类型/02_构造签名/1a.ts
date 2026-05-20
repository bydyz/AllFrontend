class Person {
  name: string
  age: number
  constructor(arg1: string, arg2: number) {
    this.name = arg1
    this.age = arg2
  }
}

//！ 此处 new 后面需要填写的是  传进类中的 参数  有限制的是值，对名称无限制        此处的Person是要确实存在的

// ！！   似乎 创建构造签名 需要一个实实在在的类  或者 类的接口或者类型别名

// ！！！     此处的Person虽然是个类名，但是此处的作用等同于 类的实例接口

type ICTORPerson = new (argument1: string, argument2: number) => Person




// 似乎传入的是类   
// ！对fn进行限制用的是构造签名，使用是，当做 类 来使用，需要  new XXX(...arguments)
function factory(fn: ICTORPerson) {
  const f = new fn('rc', 25)
  return f
}


//！ 直接使用 Person 完全兼容
console.dir(factory(Person))






class Student {
  name: string
  age: number
  constructor(arg1: string, arg2: number) {
    this.name = arg1
    this.age = arg2
  }
  learn() {
    console.log("can learn")
  }
}

//！ 多一个实例方法，完全可以兼容
console.dir(factory(Student))






class Teacher {
  height: number
  age: number
  name: string
  constructor(arg1: String, arg2: number) {

    //！ 属性可以多但不能少
    this.height = 170
    this.age = arg2
    this.name = 'rc'
  }
  teach() {
    console.log("can teach")
  }
}

//！ 多一个实例方法，完全可以兼容
console.dir(factory(Teacher))






//！ ICTORPerson 需要的是 有两个参数的构造函数 ，下面的类有三个，故不行
class TestOne {
  height: number
  age: number
  name: string
  constructor(arg1: String, arg2: number, arg3: boolean) {
    this.height = 170
    this.age = arg2
    this.name = 'rc'
  }
}

factory(TestOne)






//！ ICTORPerson 需要  Person  一样的  name、age 属性，此处无，故不可
class TestTwo {
  constructor(arg1: String, arg2: number) {
    console.log(666)
  }
}

factory(TestTwo)






//！ ICTORPerson 需要 的两个参数 属性依次是 string number 此处不可
class TestThree {
  name: number
  age: number
  constructor(arg1: number, arg2: number) {
    this.name = arg1
    this.age = arg2
  }
}

factory(TestThree)

export {}