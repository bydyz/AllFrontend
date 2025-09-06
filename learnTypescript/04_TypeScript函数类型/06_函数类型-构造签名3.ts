class Person {
  name: string
  age: number
  constructor(arg1: string, arg2: number) {
    this.name = arg1
    this.age = arg2
  }

  //！！！ 写在这个位置的  相当于  构造函数中要 加实例方法
  live() {
    console.log("Person can live")
  }
  eat() {
    console.log("Person can live")
  }
}


interface ICTORPerson {
  new (argument1: string, argument2: number): Person

  //！！！ 写在这个位置的  相当于  类中要 多加 静态方法
  eat(): void
}



// 似乎传入的是类   
// ！对fn进行限制用的是构造签名，使用是，当做 类 来使用，需要  new XXX(...arguments)
function factory(fn: ICTORPerson) {
  const f = new fn('rc', 25)
  return f
}



class Student {
  name: string
  age: number
  constructor(arg1: string, arg2: number) {
    this.name = arg1
    this.age = arg2
  }
  live() {
    console.log("Student can live")
  }
  learn() {
    console.log("Student can learn")
  }
  eat() {
    console.log("Student can learn")
  }
  //！！！ 写在这个位置的  相当于  类中加了 加静态方法  只加了实例方法不行
  // static eat() {
  //   console.log("Student can eat")
  // }
}

console.dir(factory(Student))





export {}