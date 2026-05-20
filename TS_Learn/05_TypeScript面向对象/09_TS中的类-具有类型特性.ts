class Person {}

/**
 *! 类的作用:
 *!  1.可以创建类对应的实例对象
 *!  2.类本身可以作为这个实例的类型
 *！ 3.类也可以当中有一个构造签名的返回值
 */

const name: string = "aaa"
const p: Person = new Person()
function printPerson(p: Person) {}

// new () => void   函数构造签名
function factory(ctor: new () => void) {}
factory(Person)














class Person1 {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  sayHello() {
    console.log(`Hello, my name is ${this.name}.`);
  }
}

//！ new (name: string) => Person1     是构造签名   用来限定类
function factory1(ctor: new (name: string) => Person1, param: string) {
  // 创建类的实例
  const instance = new ctor(param);
  return instance;
}

// 使用工厂函数创建 Person 类的实例
const personInstance = factory1(Person1, "rc");

// 调用 Person 实例的方法
personInstance.sayHello(); // 输出: Hello, my name is undefined.



export {}
