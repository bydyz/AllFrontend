// interface ConstructorInterface {
//   // 构造签名
//   new (参数列表): 实例类型;
  
//   // 其他静态属性和方法
//   静态属性名: 类型;
// }






// 只有构造签名的接口
interface AnimalConstructor {
  new (name: string, age: number): Animal;
}

//！   这个玩意  也可 作为 实例类型 使用
interface Animal {
  name: string;
  age: number;
  speak(): void;
}

// 实现构造签名的类
class Dog implements Animal {
  constructor(public name: string, public age: number) {}
  
  speak(): void {
    console.log(`${this.name} says: Woof!`);
  }
}

class Cat implements Animal {
  constructor(public name: string, public age: number) {}
  
  speak(): void {
    console.log(`${this.name} says: Meow!`);
  }
}

// 使用构造签名
function createAnimal(ctor: AnimalConstructor, name: string, age: number): Animal {
  return new ctor(name, age);
}

// 创建动物实例
const dog = createAnimal(Dog, "Buddy", 3);
const cat = createAnimal(Cat, "Whiskers", 2);

dog.speak(); // "Buddy says: Woof!"
cat.speak(); // "Whiskers says: Meow!"



export {}