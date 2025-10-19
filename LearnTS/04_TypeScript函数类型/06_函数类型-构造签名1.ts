type ICTORPerson = new (argument1: string, argument2: number) => Person

function factory(fn: ICTORPerson) {
  const f = new fn('rc', 25)
  return f
}

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




//！ 总而言之，只要具备 Person 的信息，就可以满足要求，多一点属性也可
// class Person {
//   name: string
//   age: number
//   constructor(arg1: string, arg2: number) {
//     this.name = arg1
//     this.age = arg2
//   }
// }



export {}