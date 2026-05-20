class Person {
  constructor(public name: string, public age: number) {}
  
  greet(): void {
    console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
  }
}


//！   需要 具有 class 所定义的所有属性和方法，并且类型一致，就可以通过类型检查，即使它不是用 new 创建的实例。
const person1: Person = { name: "Bob", age: 25, greet: () => {} }




export {}