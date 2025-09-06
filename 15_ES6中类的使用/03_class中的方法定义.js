var names = ["abc", "cba", "nba"]

class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
    this._address = "广州市"
  }

  // 普通的实例方法
  // 创建出来的对象进行访问
  // var p = new Person()
  // p.eating()
  eating() {
    // ！ this.name  就是上面的 name
    console.log(this.name + " eating~")
  }

  running() {
    console.log(this.name + " running~")
  }

  // 类的访问器方法
  get address() {
    console.log("拦截访问操作")
    return this._address
  }

  set address(newAddress) {
    console.log("拦截设置操作")
    this._address = newAddress
  }

  //！ 类的静态方法(类方法)  只能用类名访问，不能用类的实例变量访问
  // Person.createPerson()
  static randomPerson() {
    var nameIndex = Math.floor(Math.random() * names.length)
    var name = names[nameIndex]
    var age = Math.floor(Math.random() * 100)
    return new Person(name, age)
  }
}

var p = new Person("why", 18)
console.log(p)
p.eating()
p.running()

console.log(p._address)
// 暴露出去的变量名，可以获取到存在的变量名
console.log(p.address)
p.address = "北京市"
console.log(p.address)

// console.log(Object.getOwnPropertyDescriptors(Person.prototype))

for (var i = 0; i < 50; i++) {
  console.log(Person.randomPerson())
}
