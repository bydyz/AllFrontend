//！ 一些私有属性、保护属性我们是不能直接访问的，或者某些属性我们想要监听它的获取(getter)和设置(setter)的过程，这个时候我们可以使用存取器

//！ 对任何变量，均可以使用 存取器

//！ 在 TypeScript 中，getter 和 setter 不仅仅对私有属性（private）有作用，它们也可以用于保护属性（protected）和公有属性（public）。

class Person {
  //！ 私有属性: 属性前面会使用_      后面需要有 set name  get name
  private _name: string
  private _age: number
  protected _height : number
  //！ _height : number

  constructor(name: string, age: number, height: number) {
    this._name = name
    this._age = age
    this._height = height
  }

  running() {
    console.log("running:", this._name)
  }

  // setter/getter: 对属性的访问进行拦截操作
  set name(newValue: string) {
    console.log('name set')
    this._name = newValue
  }

  get name() {
    console.log('name get')
    return this._name
  }


  set age(newValue: number) {
    console.log('age set')
    if (newValue >= 0 && newValue < 200) {
      this._age = newValue
    }
  }

  get age() {
    console.log('age get')
    return this._age
  }


  set height(newValue: number) {
    console.log('height set')
    if (newValue >= 0 && newValue < 200) {
      this._age = newValue
    }
  }

  get height() {
    console.log('height get')
    return this._age
  }
}

const p = new Person("why", 100, 1.7)
p.name = "kobe"                     // 调用 set name()
console.log(p.name)              // 调用 set name()

p.age = -10                      // 调用 set age()
console.log(p.age)               // 调用 get age()

p.height = 1.75                     // 调用 set height()
console.log(p.height)               // 调用 get height()

export {}
