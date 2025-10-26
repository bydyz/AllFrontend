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

class AllExtraMembers {
  // ✅ 必须的静态方法
  static eat(): void {
    console.log("All extra members eating")
  }
  
  // ✅ 必须的构造函数
  constructor(public name: string, public age: number) {
    AllExtraMembers.totalCreated++
    this.id = AllExtraMembers.generateId()
    this.status = "active"
  }
  
  // ========== 额外的静态成员 ==========
  
  // ✅ 额外的静态属性
  static totalCreated: number = 0
  static version: string = "2.0.0"
  static settings = {
    autoValidate: true,
    logCreation: false,
    maxAge: 120
  }
  
  // ✅ 额外的静态方法
  static generateId(): string {
    return `person_${Date.now()}_${Math.random()}`
  }
  
  static getCreationStats() {
    return {
      total: this.totalCreated,
      timestamp: new Date().toISOString()
    }
  }
  
  // ========== 额外的实例成员 ==========
  
  // ✅ 额外的实例属性
  id: string
  status: string
  tags: string[] = ["user", "member"]
  preferences = { theme: "dark", language: "en" }
  
  // ✅ 额外的实例方法
  activate(): void {
    this.status = "active"
  }
  
  deactivate(): void {
    this.status = "inactive"
  }
  
  addTag(tag: string): void {
    this.tags.push(tag)
  }
  
  getFullInfo(): object {
    return {
      id: this.id,
      name: this.name,
      age: this.age,
      status: this.status,
      tags: this.tags
    }
  }
}


// ✅ 完全可以使用
const allExtraInstance = factory(AllExtraMembers)
// const allExtraInstance = factory(AllExtraMembers) as AllExtraMembers

console.log(allExtraInstance.getFullInfo())
console.log(AllExtraMembers.getCreationStats())


// ✅ 完全可以使用
factory(AllExtraMembers)


export {}