// !!  感觉上面的方式很奇怪

// 定义接口表示实例对象的结构
interface PersonInstance {
  name: string;
  age: number;
  greet(): string;
}

// 定义一个接口包含构造签名
// !    最终是利用  这个构造签名  来限定类，要求，属性和方法，只多不少
interface Person {
  new (name: string, age: number): PersonInstance;
}

//！ 均是构造签名
// new () => void
// new (name: string, age: number): PersonInstance;











class PersonClass {
  height: number
  constructor(public name: string, public age: number) {
    this.height = 1.7
  }

  greet(): string {
    return `Hello, my name is ${this.name} and I am ${this.age} years old.`;
  }

  eat() : void {
    console.log(666)
  }
}

//！ 实现 Person 接口的构造函数
const PersonConstructor: Person = PersonClass;

// !!!   通过以上，才可以准确地定义一个类      有相互依赖的关系


















// 使用构造函数创建对象实例
// !    除了用类的实例对象外，还可以直接用类
const personInstance: PersonInstance = new PersonConstructor("John", 25);

const personInstance1: PersonInstance = {
  name: 'rc',
  age: 26,
  greet: () => { return '666'}
}

// 调用对象实例的方法
console.log(personInstance.greet());  // 输出 "Hello, my name is John and I am 25 years old."







export {}