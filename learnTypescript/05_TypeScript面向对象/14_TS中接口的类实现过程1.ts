// IPerson 接口定义了多个 greet 方法的签名
//！ 这种写法叫做 函数/方法的重载签名
interface IPerson {
  greet(): string;
  greet(language: string): string;
}

// Person 类实现 IPerson 接口
class Person implements IPerson {
  constructor(public name: string) {}


  //！ 做法有误
  // // 实现第一个 greet 方法签名
  // greet(): string {
  //   return `Hello, my name is ${this.name}.`;
  // }

  // // 实现第二个 greet 方法签名
  // greet(language: string): string {
  //   if (language === "es") {
  //     return `Hola, mi nombre es ${this.name}.`;
  //   } else if (language === "fr") {
  //     return `Bonjour, je m'appelle ${this.name}.`;
  //   }
  //   return this.greet();
  // }





  //！ 正确做法如下
  //！ 解决方案：
    //！ 方案一：可以通过提供一个单一的实现来处理所有重载情况
    //！ 方案二：使用 TypeScript 的函数重载特性，在类中先列出所有重载签名，然后提供一个兼容所有签名的实现。

  //！ 方案一
  greet(language?: string): string {
    if (language === "es") {
      return `Hola, mi nombre es ${this.name}.`;
    } else if (language === "fr") {
      return `Bonjour, je m'appelle ${this.name}.`;
    }
    return `Hello, my name is ${this.name}.`;
  }



  //！ 方案二
  // // 重载签名 1
  // greet(): string;

  // // 重载签名 2
  // greet(language: string): string;

  // // 实现签名（必须兼容前面的所有重载）
  // greet(language?: string): string {
  //   if (language === "es") {
  //     return `Hola, mi nombre es ${this.name}.`;
  //   } else if (language === "fr") {
  //     return `Bonjour, je m'appelle ${this.name}.`;
  //   }
  //   return `Hello, my name is ${this.name}.`;
  // }
}

// 使用 Person 类创建对象
const person = new Person("Alice");

console.log(person.greet()); // 输出: Hello, my name is Alice.
console.log(person.greet("es")); // 输出: Hola, mi nombre es Alice.
console.log(person.greet("fr")); // 输出: Bonjour, je m'appelle Alice.


export {}