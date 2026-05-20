class Person {
  name: string
  age: number
  constructor(arg1: string, arg2: number) {
    this.name = arg1
    this.age = arg2
  }
}

interface ICTORPerson {
  new (argument1: string, argument2: number): Person

  //？ 构造签名接口中，只能多添加 静态属性、静态方法 的限定
  //！ 这里表示要加  静态方法
  eat(): void
}

function factory(fn: ICTORPerson) {
  const f = new fn('rc', 25)
  return f
}

class ExtraInstanceProperties {
  // ✅ 必须的静态方法
  static eat(): void {
    console.log("Static eat")
  }
  
  // ✅ 必须的构造函数
  constructor(public name: string, public age: number) {
    // ✅ 额外的实例属性（在构造函数中初始化）
    this.id = Math.random()
    this.createdAt = new Date()
    this.isActive = true
  }
  
  // ✅ 额外的实例属性（声明）
  id: number
  createdAt: Date
  isActive: boolean
  metadata: object = { type: "person" }
  
  // ✅ 额外的实例方法
  getInfo(): string {
    return `${this.name} (ID: ${this.id})`
  }
}

// ✅ 完全可以使用
factory(ExtraInstanceProperties)

export {}