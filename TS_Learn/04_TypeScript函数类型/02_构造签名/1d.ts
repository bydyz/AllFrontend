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

class ExtraStaticProperties {
  // ✅ 必须的静态方法
  static eat(): void {
    console.log("Static eat")
  }
  
  // ✅ 必须的构造函数
  constructor(public name: string, public age: number) {
    ExtraStaticProperties.instanceCount++
  }
  
  // ✅ 额外的静态属性
  static instanceCount: number = 0
  static defaultName: string = "Anonymous"
  static maxInstances: number = 1000
  static config = {
    version: "1.0.0",
    enabled: true,
    limits: { maxAge: 150, minAge: 0 }
  }
  
  // ✅ 额外的静态方法
  static getStats() {
    return {
      instances: this.instanceCount,
      canCreateMore: this.instanceCount < this.maxInstances
    }
  }
}

// ✅ 完全可以使用
factory(ExtraStaticProperties)


export {}